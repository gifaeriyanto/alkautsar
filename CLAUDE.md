# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for the "Alkautsar" system - a Next.js + Supabase application for managing Islamic organizations. The system consists of three main applications: superadmin, admin, and member portals.

## Architecture

**Monorepo Structure:**
- `apps/` - Three Next.js applications (superadmin, admin, member)
- `packages/` - Shared packages including Supabase client, UI components, theme, and configurations

**Technology Stack:**
- Next.js 14 with App Router
- Supabase for backend/database
- Chakra UI for components
- TypeScript
- Yarn workspaces with Turborepo

**Key Shared Packages:**
- `@client/supabase` - Supabase client and database types
- `@client/ui-components` - Shared UI components
- `@client/resend` - Email service integration
- `theme` - Design system/theme configuration

## Common Commands

### Development
```bash
# Start all apps in development mode
yarn dev

# Start specific app
cd apps/superadmin && yarn dev  # Port 3995
cd apps/admin && yarn dev
cd apps/member && yarn dev

# Build all apps
yarn build

# Lint all code
yarn lint

# Format code
yarn format
```

### Supabase Operations
```bash
# First time setup
yarn supabase:login
yarn supabase:link

# Local development
yarn supabase:start          # Start local Supabase
yarn supabase:stop           # Stop local Supabase

# Database operations
yarn supabase:gen:types      # Generate TypeScript types
yarn supabase:db:pull        # Pull remote schema
yarn supabase:db:push        # Push migrations to remote
yarn supabase:db:local:up    # Apply migrations locally
yarn supabase:db:local:reset # Reset local database

# Create new migration
yarn supabase:db:local:new <migration_name>
```

## Environment Setup

Each app requires environment variables. Use Vercel CLI to pull env vars:

```bash
# For each app
cd apps/superadmin && vercel link && vercel env pull
cd apps/admin && vercel link && vercel env pull
cd apps/member && vercel link && vercel env pull
```

Required for `packages/supabase/.env`:
```
PROJECT_ID=<supabase_project_id>
```

## Code Organization

**Apps Structure:**
- Each app uses Next.js App Router (`src/app/`)
- Private components in `src/_components/`
- Hooks in `src/_hooks/`
- Store/state management in `src/_store/`
- Validations in `src/_validations/`

**Import Conventions:**
- Shared packages use workspace aliases (`@client/supabase`, `@client/ui-components`)
- Internal imports use relative paths
- Theme imported as `theme`

## Development Workflow

1. **Pre-commit hooks** run linting, formatting, and type checking via lint-staged
2. **Build checks** (`build:check`) run TypeScript compilation without output
3. **Supabase types** are auto-generated and required for builds in CI

## Testing & Quality

- Run `yarn lint` for ESLint checks
- Run `yarn turbo run build:check` for TypeScript validation
- Format code with `yarn format` (Prettier)
- All checks run automatically on commit via Husky

## Database Management

The project uses Supabase with local development support. Always generate types after schema changes:

```bash
yarn supabase:gen:types
```

For production deployments, migrations are applied via GitHub Actions.

## CRUD Implementation Patterns

This codebase follows a consistent CRUD pattern using standardized hooks and components for database operations.

### Core CRUD Components

**useCRUD Hook** (`@client/supabase/hooks/useCRUD.ts`):
- Provides standardized CRUD operations for any Supabase table
- Returns: `{ list, getOneById, createData, deleteById, softDeleteById, updateById, upsertData }`
- Usage: `const crud = useCRUD('table_name')`

**useList Hook** (`@client/supabase/hooks/useList.ts`):
- Handles paginated data fetching with filtering, sorting, and search
- Returns: `{ data, error, isLoading, totalData, totalPages, currentPage, setPage, refetch }`
- Supports pagination params, filters, and soft delete filtering
- Usage: `useList('table_name', { filters, sort, select })`

**ActionForm Component** (`@client/ui-components/form/CRUDTable/actionForm.tsx`):
- Generic form component for create/edit operations
- Handles form submission, validation, error handling, and success messages
- Supports custom data mapping and default value transformation
- Auto-fetches existing data for edit mode
- Usage: `<ActionForm type="create|edit" table="table_name" formFields={fields} />`

**CRUDTable Component** (`@client/ui-components/form/CRUDTable/list.tsx`):
- Complete CRUD table with list, edit, delete actions
- Supports pagination, search, filtering, and custom field rendering
- Handles both soft and hard delete operations
- Provides standard + table view variants
- Usage: `<CRUDTable table="table_name" fields={fieldConfig} baseUrl="/path" />`

### Standard CRUD Pattern

**List Page Example** (`apps/admin/src/app/bansos/page.tsx`):
```tsx
const { renderSearch, sort, filter } = useSearch({
  searchNameKey: 'full_name',
  defaultSortKey: 'created_at',
})

<CRUDTable
  table="bansos_members"
  fields={[
    { name: 'full_name', type: 'text', width: 200 },
    { name: 'whatsapp_number', type: 'text', hideOnMobile: true },
  ]}
  baseUrl="/bansos"
  filters={filter}
  sort={sort}
  renderSearch={renderSearch}
/>
```

**Create Page Example** (`apps/admin/src/app/bansos/create/page.tsx`):
```tsx
<ActionForm
  formFields={bansosMembersFormFields}
  table="bansos_members"
  type="create"
  redirectTo="/bansos"
/>
```

**Edit Page Example**: Replace `type="create"` with `type="edit"` and add `dataId` prop

### Form Field Configuration

Form fields are defined as arrays of `FieldData` objects with type-safe field types:
- `text`, `textarea`, `number`, `date`, `time`, `phone`
- `select`, `checkbox`, `radio`
- `upload`, `multipleUpload`
- `asyncList` (for foreign key relationships)
- `organization_id` (custom field for org context)

**Field Definition Example**:
```tsx
const formFields: FieldData[] = [
  {
    name: 'full_name',
    label: 'Full Name',
    type: 'text',
    rules: { required: 'Required field' }
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [{ label: 'Active', value: 'active' }]
  }
]
```

### Key Benefits

- **Type Safety**: All operations are typed against the Supabase database schema
- **Consistency**: Same patterns across all CRUD operations
- **DRY**: Minimal boilerplate for standard CRUD pages
- **Flexibility**: Support for custom actions, validation, and field rendering
- **Performance**: Optimized with pagination, search, and filtering built-in
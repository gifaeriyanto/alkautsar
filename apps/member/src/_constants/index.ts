// Hardcoded organization ID for shalat board (no login required)
// To use a specific organization ID, create a .env.local file in apps/member/ with:
// NEXT_PUBLIC_ORGANIZATION_ID=your-organization-id-here
export const ORGANIZATION_ID =
  process.env.NEXT_PUBLIC_ORGANIZATION_ID || 'default-org-id'

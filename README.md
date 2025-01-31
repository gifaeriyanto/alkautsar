<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Next.js Supabase Starter</h3>
  </a>
</p>

<p align="center">Simple Next.js boilerplate that uses <a href="https://supabase.com/">Supabase</a> as the backend.</p>

<br/>

## Demo

### super-admin

https://nextjs-supabase-starter-superadmin.vercel.app/

### admin

https://nextjs-supabase-starter-admin.vercel.app/

## Local Development

### Node Version Check

Ensure that your Node.js version is greater than 18.17.0. You can check your Node.js version using:

```
node -v
```

If the version is not greater than 18.17.0, consider upgrading your Node.js version.

### Installing Dependencies

Navigate to the cloned project directory and install the project dependencies using Yarn.

```
cd [new repository]
yarn install
```

### Preparing Env Variables

This project uses the following environment variables:

```
- DEFAULT_LANG: The default language for your application. Example: "en".
- NEXT_PUBLIC_SUPABASE_ANON_KEY: The public anonymous key for your Supabase project.
- NEXT_PUBLIC_SUPABASE_URL: The URL of your Supabase project.
- PROJECT_ID: The ID of your supabase project.
- RESEND_API_KEY: The API key for the Resend service.
- SUPABASE_ACCESS_TOKEN: The access token for your Supabase project.
- SUPABASE_SERVICE_ROLE_KEY: The service role key for your Supabase project.
```

Please replace the placeholders with your actual values when setting up the project.

#### How to get these env variables

**supabase**

```
- SUPABASE_ACCESS_TOKEN: The access token for your Supabase project.
- SUPABASE_SERVICE_ROLE_KEY: The service role key for your Supabase project.
- PROJECT_ID: The ID of your project.
- NEXT_PUBLIC_SUPABASE_ANON_KEY: The public anonymous key for your Supabase project.
- NEXT_PUBLIC_SUPABASE_URL: The URL of your Supabase project.

To obtain these Supabase environment variables, follow these steps:

1. Sign up for a free account at [Supabase](https://supabase.io).
2. After logging in, create a new project.
3. Once the project is created, you will be redirected to the project dashboard.
4. From the dashboard, click on the "Settings" tab, then click on "API" in the sidebar.
5. On the API page, you will find the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under "API Details".
6. The `SUPABASE_SERVICE_ROLE_KEY` can be found under "Service Role Key".
7. The `PROJECT_ID` is the ID part in your `NEXT_PUBLIC_SUPABASE_URL`.
8. The `SUPABASE_ACCESS_TOKEN` is not directly provided by Supabase. It's usually generated when a user signs in. You can use the `supabase.auth.signIn()` method to generate this token.
```

**resend**

```
- RESEND_API_KEY: The API key for the Resend service.

To obtain the `RESEND_API_KEY`, follow these steps:

1. Sign up for a free account at [Resend.io](https://resend.io).
2. After logging in, navigate to the API Keys section in the dashboard.
3. Click on the "Create API Key" button.
4. Give your API key a name and select the permissions you want to grant to it.
5. Click on the "Create" button. Your new API key will be displayed.
6. Copy the API key and paste it in the `.env.local` file as the value for `RESEND_API_KEY`.

Example: "re_WLMGSYww_7NHZSLt1xdtbpXERGfm72Df6".
```

**vercel**

```
To set up these environment variables on Vercel, follow these steps:

1. Navigate to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on your project name.
3. Click on the "Settings" tab.
4. Click on the "Environment Variables" section.
5. Click on "Add" next to "Production", "Preview", or "Development" depending on where you want to add the environment variable.
6. Enter the name of the environment variable in the "Name" field and its value in the "Value" field.
7. Click on "Add" to save the environment variable.
```

Please ensure you have Vercel CLI installed.

Then run these commands to pull the env variables from Vercel:
**superadmin**

```
cd apps/superadmin
vercel link
vercel env pull
```

**admin**

```
cd apps/admin
vercel link
vercel env pull
```

**packages/supabase**

Create env file in `packages/supabase`, replace <project_id> with actual project ID (ask other devs if you don't know):

`.env`

```
PROJECT_ID=<project_id>
```

### Run the App

Finally you can run the application locally with this following command:

```
yarn supabase:login // first time only
yarn dev
```

## Supabase Local Development

Please ensure you have installed Docker before attempting these steps and also all of these ENV variables are configured:

export SUPABASE_PROJECT_REF=<project_id>
export SUPABASE_DB_PASS=<database_password>

### Step 1: Start Supabase Locally

To start Supabase locally, run the following command in your terminal.

```bash
yarn supabase:start
```

This command will initialize a local Supabase instance. Please note that you need to have docker installed.

### Step 2: Login to Supabase.com

To log in to your Supabase account on supabase.com, use the following command:

```bash
yarn supabase:login
```

You'll be prompted to enter your Supabase credentials.

### Step 3: Link to Supabase Project

To link your local development environment to a specific Supabase project, use the following command. Replace <project_id> with actual project ID (ask other devs if you don't know):

```bash
yarn supabase:link
```

### Step 4: Generate Remote Schema Locally

To generate the remote schema of your Supabase project locally, use the following command:

```bash
yarn supabase:db:pull
```

### Step 5: Apply Database Migration to Local Supabase PostgreSQL

To apply database migration to your local Supabase PostgreSQL database, use the following command:

```bash
yarn supabase:db:local:up
```

This command will apply any pending database migrations to your local development environment.

### Step 6 (Optional): Writing Database Migration & Apply to Remote Supabase

To create a new migration, you can run:

```bash
yarn supabase:db:local:new <migration name>
```

Applying database migration to local Supabase:

```bash
yarn supabase:db:local:reset
```

If you want to apply the migration to the remote Supabase (supabase.com), run this command:

```bash
yarn supabase:db:push
```

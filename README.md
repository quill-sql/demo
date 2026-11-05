# Quill sample app

A minimal Vite + React + Express app that renders a Quill dashboard. The frontend is just a `QuillProvider` and a dashboard page; tenant scoping happens in the server only.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the sample database (needs a local Postgres and the `psql`/`createdb` client tools):

   ```bash
   npm run db:seed
   ```

   This creates the `quill_sample` database if it is missing and loads `db/seed.sql`: three organizations (`org_acme`, `org_globex`, `org_initech`) and 90 orders with dates relative to today. It is safe to rerun. Set `DATABASE_URL` in `.env` first if your Postgres is not on `localhost:5432`.

3. Copy `.env.example` to `.env` and fill in your Quill keys (`QUILL_PRIVATE_KEY`, `QUILL_PUBLIC_KEY`, `VITE_QUILL_PUBLIC_KEY`).

4. Start the server and client:

   ```bash
   npm run dev
   ```

   The server listens on `3456` and Vite on `5174`, proxying `/quill` to the server.

## Data model

| Table | Columns |
| --- | --- |
| `organizations` | `id`, `name`, `plan`, `created_at` |
| `orders` | `id`, `organization_id` (tenant key), `customer_name`, `category`, `status`, `quantity`, `amount`, `created_at` |

The `orders` virtual table in Quill selects every column of `public.orders`, with `organization_id` as the tenant field.

#!/bin/sh
# Creates the sample database (if missing) and loads db/seed.sql into it.
# Uses DATABASE_URL from the environment or .env; defaults to a local Postgres.
set -e
cd "$(dirname "$0")/.."

if [ -z "$DATABASE_URL" ] && [ -f .env ]; then
  DATABASE_URL=$(grep -E '^DATABASE_URL=' .env | head -1 | cut -d= -f2- | tr -d '"'"'")
fi
DATABASE_URL=${DATABASE_URL:-postgresql://postgres@localhost:5432/quill_sample}

for tool in psql createdb; do
  command -v "$tool" >/dev/null 2>&1 || { echo "$tool not found: install the Postgres client tools first." >&2; exit 1; }
done

db_name=${DATABASE_URL##*/}
db_name=${db_name%%\?*}
admin_url="${DATABASE_URL%/*}/postgres"

if ! psql "$DATABASE_URL" -qAtc 'select 1' >/dev/null 2>&1; then
  echo "Creating database $db_name"
  createdb -d "$admin_url" "$db_name" 2>/dev/null || psql "$admin_url" -qc "CREATE DATABASE \"$db_name\""
fi

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f db/seed.sql
psql "$DATABASE_URL" -Atc "select count(*) || ' orders across ' || (select count(*) from organizations) || ' organizations loaded into $db_name' from orders"

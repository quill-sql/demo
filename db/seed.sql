-- Sample data for the Quill demo: three tenant organizations and 90 orders.
-- Load with: npm run db:seed
-- Rerunnable: drops and recreates both tables. Dates are relative to now(),
-- so the "Revenue Over Time" chart always covers the last three months.

SET client_min_messages = warning;

BEGIN;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  plan       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id              serial PRIMARY KEY,
  organization_id text NOT NULL REFERENCES organizations(id),
  customer_name   text NOT NULL,
  category        text NOT NULL,
  status          text NOT NULL,
  quantity        integer NOT NULL,
  amount          numeric(10, 2) NOT NULL,
  created_at      timestamptz NOT NULL
);

INSERT INTO organizations (id, name, plan, created_at) VALUES
  ('org_acme',    'Acme Corp',  'enterprise', now() - interval '180 days'),
  ('org_globex',  'Globex Inc', 'growth',     now() - interval '120 days'),
  ('org_initech', 'Initech',    'starter',    now() - interval '90 days');

-- Deterministic rows (no random()), so every clone gets the same dashboard.
WITH lookup AS (
  SELECT
    ARRAY['org_acme', 'org_globex', 'org_initech']                                   AS orgs,
    ARRAY['Contoso Ltd', 'Cyberdyne Systems', 'Hooli', 'Massive Dynamic',
          'Northwind Traders', 'Pied Piper', 'Soylent Corp', 'Stark Industries',
          'Umbrella Co', 'Wayne Enterprises']                                        AS customers,
    ARRAY['Software', 'Hardware', 'Cloud', 'Services', 'Support']                    AS categories,
    ARRAY[49.00, 129.00, 89.00, 150.00, 35.00]                                       AS unit_prices
)
INSERT INTO orders (organization_id, customer_name, category, status, quantity, amount, created_at)
SELECT
  orgs[(i % 3) + 1],
  customers[((i * 7) % 10) + 1],
  categories[(i % 5) + 1],
  CASE
    WHEN i % 9 = 4 THEN 'refunded'
    WHEN i % 4 = 1 THEN 'processing'
    ELSE 'completed'
  END,
  (i % 6) + 1,
  round(((i % 6) + 1) * unit_prices[(i % 5) + 1] * (1 + ((i * 13) % 20) / 100.0), 2),
  now() - (i * interval '23 hours') - (((i * 37) % 11) * interval '1 hour')
FROM lookup, generate_series(0, 89) AS i;

COMMIT;

-- Sample data for the Quill demo: 3 organizations (tenants) and 90 orders.
-- Load with: npm run db:seed   (runs psql "$DATABASE_URL" -f db/seed.sql)
-- Rerunnable: drops and recreates both tables.

ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_organization_id_fkey;
ALTER TABLE IF EXISTS ONLY public.organizations DROP CONSTRAINT IF EXISTS organizations_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.organizations;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
CREATE TABLE public.orders (
    id integer NOT NULL,
    organization_id text NOT NULL,
    customer_name text NOT NULL,
    category text NOT NULL,
    status text NOT NULL,
    quantity integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    created_at timestamp with time zone NOT NULL
);
CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
CREATE TABLE public.organizations (
    id text NOT NULL,
    name text NOT NULL,
    plan text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
INSERT INTO public.orders (id, organization_id, customer_name, category, status, quantity, amount, created_at) VALUES
	(1, 'org_globex', 'Contoso Ltd', 'Software', 'completed', 2, 101.99, '2026-11-02 12:23:21.780348-05'),
	(2, 'org_initech', 'Stark Industries', 'Services', 'completed', 3, 158.98, '2026-11-01 11:23:21.780348-05'),
	(3, 'org_acme', 'Wayne Enterprises', 'Cloud', 'processing', 4, 215.97, '2026-10-31 10:23:21.780348-04'),
	(4, 'org_globex', 'Umbrella Co', 'Support', 'refunded', 5, 193.00, '2026-10-30 09:23:21.780348-04'),
	(5, 'org_initech', 'Cyberdyne Systems', 'Hardware', 'completed', 6, 249.99, '2026-10-29 08:23:21.780348-04'),
	(6, 'org_acme', 'Soylent Corp', 'Software', 'completed', 7, 306.98, '2026-10-28 07:23:21.780348-04'),
	(7, 'org_globex', 'Hooli', 'Services', 'completed', 8, 363.97, '2026-10-27 06:23:21.780348-04'),
	(8, 'org_initech', 'Pied Piper', 'Cloud', 'processing', 1, 341.00, '2026-10-26 05:23:21.780348-04'),
	(9, 'org_acme', 'Massive Dynamic', 'Support', 'refunded', 2, 397.99, '2026-10-25 04:23:21.780348-04'),
	(10, 'org_globex', 'Northwind Traders', 'Hardware', 'completed', 3, 454.98, '2026-10-24 03:23:21.780348-04'),
	(11, 'org_initech', 'Contoso Ltd', 'Software', 'completed', 4, 511.97, '2026-10-23 02:23:21.780348-04'),
	(12, 'org_acme', 'Stark Industries', 'Services', 'completed', 5, 489.00, '2026-10-22 13:23:21.780348-04'),
	(13, 'org_globex', 'Wayne Enterprises', 'Cloud', 'processing', 6, 545.99, '2026-10-21 12:23:21.780348-04'),
	(14, 'org_initech', 'Umbrella Co', 'Support', 'refunded', 7, 602.98, '2026-10-20 11:23:21.780348-04'),
	(15, 'org_acme', 'Cyberdyne Systems', 'Hardware', 'completed', 8, 659.97, '2026-10-19 10:23:21.780348-04'),
	(16, 'org_globex', 'Soylent Corp', 'Software', 'completed', 1, 637.00, '2026-10-18 09:23:21.780348-04'),
	(17, 'org_initech', 'Hooli', 'Services', 'completed', 2, 693.99, '2026-10-17 08:23:21.780348-04'),
	(18, 'org_acme', 'Pied Piper', 'Cloud', 'processing', 3, 750.98, '2026-10-16 07:23:21.780348-04'),
	(19, 'org_globex', 'Massive Dynamic', 'Support', 'refunded', 4, 807.97, '2026-10-15 06:23:21.780348-04'),
	(20, 'org_initech', 'Northwind Traders', 'Hardware', 'completed', 5, 785.00, '2026-10-14 05:23:21.780348-04'),
	(21, 'org_acme', 'Contoso Ltd', 'Software', 'completed', 6, 841.99, '2026-10-13 04:23:21.780348-04'),
	(22, 'org_globex', 'Stark Industries', 'Services', 'completed', 7, 898.98, '2026-10-12 03:23:21.780348-04'),
	(23, 'org_initech', 'Wayne Enterprises', 'Cloud', 'processing', 8, 955.97, '2026-10-11 02:23:21.780348-04'),
	(24, 'org_acme', 'Umbrella Co', 'Support', 'refunded', 1, 933.00, '2026-10-10 13:23:21.780348-04'),
	(25, 'org_globex', 'Cyberdyne Systems', 'Hardware', 'completed', 2, 989.99, '2026-10-09 12:23:21.780348-04'),
	(26, 'org_initech', 'Soylent Corp', 'Software', 'completed', 3, 96.98, '2026-10-08 11:23:21.780348-04'),
	(27, 'org_acme', 'Hooli', 'Services', 'completed', 4, 153.97, '2026-10-07 10:23:21.780348-04'),
	(28, 'org_globex', 'Pied Piper', 'Cloud', 'processing', 5, 131.00, '2026-10-06 09:23:21.780348-04'),
	(29, 'org_initech', 'Massive Dynamic', 'Support', 'refunded', 6, 187.99, '2026-10-05 08:23:21.780348-04'),
	(30, 'org_acme', 'Northwind Traders', 'Hardware', 'completed', 7, 244.98, '2026-10-04 07:23:21.780348-04'),
	(31, 'org_globex', 'Contoso Ltd', 'Software', 'completed', 8, 301.97, '2026-10-03 06:23:21.780348-04'),
	(32, 'org_initech', 'Stark Industries', 'Services', 'completed', 1, 279.00, '2026-10-02 05:23:21.780348-04'),
	(33, 'org_acme', 'Wayne Enterprises', 'Cloud', 'processing', 2, 335.99, '2026-10-01 04:23:21.780348-04'),
	(34, 'org_globex', 'Umbrella Co', 'Support', 'refunded', 3, 392.98, '2026-09-30 03:23:21.780348-04'),
	(35, 'org_initech', 'Cyberdyne Systems', 'Hardware', 'completed', 4, 449.97, '2026-09-29 02:23:21.780348-04'),
	(36, 'org_acme', 'Soylent Corp', 'Software', 'completed', 5, 427.00, '2026-09-28 13:23:21.780348-04'),
	(37, 'org_globex', 'Hooli', 'Services', 'completed', 6, 483.99, '2026-09-27 12:23:21.780348-04'),
	(38, 'org_initech', 'Pied Piper', 'Cloud', 'processing', 7, 540.98, '2026-09-26 11:23:21.780348-04'),
	(39, 'org_acme', 'Massive Dynamic', 'Support', 'refunded', 8, 597.97, '2026-09-25 10:23:21.780348-04'),
	(40, 'org_globex', 'Northwind Traders', 'Hardware', 'completed', 1, 575.00, '2026-09-24 09:23:21.780348-04'),
	(41, 'org_initech', 'Contoso Ltd', 'Software', 'completed', 2, 631.99, '2026-09-23 08:23:21.780348-04'),
	(42, 'org_acme', 'Stark Industries', 'Services', 'completed', 3, 688.98, '2026-09-22 07:23:21.780348-04'),
	(43, 'org_globex', 'Wayne Enterprises', 'Cloud', 'processing', 4, 745.97, '2026-09-21 06:23:21.780348-04'),
	(44, 'org_initech', 'Umbrella Co', 'Support', 'refunded', 5, 723.00, '2026-09-20 05:23:21.780348-04'),
	(45, 'org_acme', 'Cyberdyne Systems', 'Hardware', 'completed', 6, 779.99, '2026-09-19 04:23:21.780348-04'),
	(46, 'org_globex', 'Soylent Corp', 'Software', 'completed', 7, 836.98, '2026-09-18 03:23:21.780348-04'),
	(47, 'org_initech', 'Hooli', 'Services', 'completed', 8, 893.97, '2026-09-17 02:23:21.780348-04'),
	(48, 'org_acme', 'Pied Piper', 'Cloud', 'processing', 1, 871.00, '2026-09-16 13:23:21.780348-04'),
	(49, 'org_globex', 'Massive Dynamic', 'Support', 'refunded', 2, 927.99, '2026-09-15 12:23:21.780348-04'),
	(50, 'org_initech', 'Northwind Traders', 'Hardware', 'completed', 3, 984.98, '2026-09-14 11:23:21.780348-04'),
	(51, 'org_acme', 'Contoso Ltd', 'Software', 'completed', 4, 1041.97, '2026-09-13 10:23:21.780348-04'),
	(52, 'org_globex', 'Stark Industries', 'Services', 'completed', 5, 69.00, '2026-09-12 09:23:21.780348-04'),
	(53, 'org_initech', 'Wayne Enterprises', 'Cloud', 'processing', 6, 125.99, '2026-09-11 08:23:21.780348-04'),
	(54, 'org_acme', 'Umbrella Co', 'Support', 'refunded', 7, 182.98, '2026-09-10 07:23:21.780348-04'),
	(55, 'org_globex', 'Cyberdyne Systems', 'Hardware', 'completed', 8, 239.97, '2026-09-09 06:23:21.780348-04'),
	(56, 'org_initech', 'Soylent Corp', 'Software', 'completed', 1, 217.00, '2026-09-08 05:23:21.780348-04'),
	(57, 'org_acme', 'Hooli', 'Services', 'completed', 2, 273.99, '2026-09-07 04:23:21.780348-04'),
	(58, 'org_globex', 'Pied Piper', 'Cloud', 'processing', 3, 330.98, '2026-09-06 03:23:21.780348-04'),
	(59, 'org_initech', 'Massive Dynamic', 'Support', 'refunded', 4, 387.97, '2026-09-05 02:23:21.780348-04'),
	(60, 'org_acme', 'Northwind Traders', 'Hardware', 'completed', 5, 365.00, '2026-11-03 13:23:21.780348-05'),
	(61, 'org_globex', 'Contoso Ltd', 'Software', 'completed', 6, 421.99, '2026-11-02 12:23:21.780348-05'),
	(62, 'org_initech', 'Stark Industries', 'Services', 'completed', 7, 478.98, '2026-11-01 11:23:21.780348-05'),
	(63, 'org_acme', 'Wayne Enterprises', 'Cloud', 'processing', 8, 535.97, '2026-10-31 10:23:21.780348-04'),
	(64, 'org_globex', 'Umbrella Co', 'Support', 'refunded', 1, 513.00, '2026-10-30 09:23:21.780348-04'),
	(65, 'org_initech', 'Cyberdyne Systems', 'Hardware', 'completed', 2, 569.99, '2026-10-29 08:23:21.780348-04'),
	(66, 'org_acme', 'Soylent Corp', 'Software', 'completed', 3, 626.98, '2026-10-28 07:23:21.780348-04'),
	(67, 'org_globex', 'Hooli', 'Services', 'completed', 4, 683.97, '2026-10-27 06:23:21.780348-04'),
	(68, 'org_initech', 'Pied Piper', 'Cloud', 'processing', 5, 661.00, '2026-10-26 05:23:21.780348-04'),
	(69, 'org_acme', 'Massive Dynamic', 'Support', 'refunded', 6, 717.99, '2026-10-25 04:23:21.780348-04'),
	(70, 'org_globex', 'Northwind Traders', 'Hardware', 'completed', 7, 774.98, '2026-10-24 03:23:21.780348-04'),
	(71, 'org_initech', 'Contoso Ltd', 'Software', 'completed', 8, 831.97, '2026-10-23 02:23:21.780348-04'),
	(72, 'org_acme', 'Stark Industries', 'Services', 'completed', 1, 809.00, '2026-10-22 13:23:21.780348-04'),
	(73, 'org_globex', 'Wayne Enterprises', 'Cloud', 'processing', 2, 865.99, '2026-10-21 12:23:21.780348-04'),
	(74, 'org_initech', 'Umbrella Co', 'Support', 'refunded', 3, 922.98, '2026-10-20 11:23:21.780348-04'),
	(75, 'org_acme', 'Cyberdyne Systems', 'Hardware', 'completed', 4, 979.97, '2026-10-19 10:23:21.780348-04'),
	(76, 'org_globex', 'Soylent Corp', 'Software', 'completed', 5, 957.00, '2026-10-18 09:23:21.780348-04'),
	(77, 'org_initech', 'Hooli', 'Services', 'completed', 6, 1013.99, '2026-10-17 08:23:21.780348-04'),
	(78, 'org_acme', 'Pied Piper', 'Cloud', 'processing', 7, 120.98, '2026-10-16 07:23:21.780348-04'),
	(79, 'org_globex', 'Massive Dynamic', 'Support', 'refunded', 8, 177.97, '2026-10-15 06:23:21.780348-04'),
	(80, 'org_initech', 'Northwind Traders', 'Hardware', 'completed', 1, 155.00, '2026-10-14 05:23:21.780348-04'),
	(81, 'org_acme', 'Contoso Ltd', 'Software', 'completed', 2, 211.99, '2026-10-13 04:23:21.780348-04'),
	(82, 'org_globex', 'Stark Industries', 'Services', 'completed', 3, 268.98, '2026-10-12 03:23:21.780348-04'),
	(83, 'org_initech', 'Wayne Enterprises', 'Cloud', 'processing', 4, 325.97, '2026-10-11 02:23:21.780348-04'),
	(84, 'org_acme', 'Umbrella Co', 'Support', 'refunded', 5, 303.00, '2026-10-10 13:23:21.780348-04'),
	(85, 'org_globex', 'Cyberdyne Systems', 'Hardware', 'completed', 6, 359.99, '2026-10-09 12:23:21.780348-04'),
	(86, 'org_initech', 'Soylent Corp', 'Software', 'completed', 7, 416.98, '2026-10-08 11:23:21.780348-04'),
	(87, 'org_acme', 'Hooli', 'Services', 'completed', 8, 473.97, '2026-10-07 10:23:21.780348-04'),
	(88, 'org_globex', 'Pied Piper', 'Cloud', 'processing', 1, 451.00, '2026-10-06 09:23:21.780348-04'),
	(89, 'org_initech', 'Massive Dynamic', 'Support', 'refunded', 2, 507.99, '2026-10-05 08:23:21.780348-04'),
	(90, 'org_acme', 'Northwind Traders', 'Hardware', 'completed', 3, 564.98, '2026-10-04 07:23:21.780348-04');
INSERT INTO public.organizations (id, name, plan, created_at) VALUES
	('org_acme', 'Acme Corp', 'enterprise', '2026-05-07 13:23:21.779935-04'),
	('org_globex', 'Globex Inc', 'growth', '2026-07-06 13:23:21.779935-04'),
	('org_initech', 'Initech', 'starter', '2026-08-05 13:23:21.779935-04');
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);
SELECT pg_catalog.setval('public.orders_id_seq', (SELECT max(id) FROM public.orders), true);

-- Barbershop template schema (multi-shop capable)
create extension if not exists "uuid-ossp";

create table if not exists shops (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  phone text,
  email text,
  address text,
  city text,
  state text,
  postal_code text,
  timezone text not null default 'America/Chicago',
  created_at timestamptz not null default now()
);

create table if not exists barbers (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references shops(id) on delete cascade,
  slug text not null,
  name text not null,
  title text,
  bio text,
  image_url text,
  active boolean not null default true,
  unique(shop_id, slug)
);

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references shops(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  duration_mins integer not null check (duration_mins > 0),
  price_cents integer not null check (price_cents >= 0),
  active boolean not null default true,
  unique(shop_id, slug)
);

create table if not exists barber_availability (
  id uuid primary key default uuid_generate_v4(),
  barber_id uuid not null references barbers(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  unique(barber_id, day_of_week, start_time, end_time)
);

create table if not exists blocked_times (
  id uuid primary key default uuid_generate_v4(),
  barber_id uuid not null references barbers(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  reason text,
  check (end_at > start_at)
);

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references shops(id) on delete cascade,
  full_name text not null,
  email text,
  phone text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references shops(id) on delete cascade,
  barber_id uuid not null references barbers(id) on delete restrict,
  service_id uuid not null references services(id) on delete restrict,
  customer_id uuid references customers(id) on delete set null,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  notes text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled', 'rescheduled', 'completed', 'no_show')),
  cancelled_at timestamptz,
  cancelled_reason text,
  rescheduled_from_appointment_id uuid references appointments(id),
  created_at timestamptz not null default now(),
  check (end_at > start_at)
);

create index if not exists idx_appointments_shop_time on appointments(shop_id, start_at);
create index if not exists idx_appointments_barber_time on appointments(barber_id, start_at);
create index if not exists idx_blocked_times_barber_time on blocked_times(barber_id, start_at);

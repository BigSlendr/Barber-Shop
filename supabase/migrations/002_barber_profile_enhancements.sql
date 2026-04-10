-- Migration 002: Barber profile enhancements
-- Adds instagram, tiktok, phone, and portfolio support to the barbers table.
-- Run after 001_initial_schema.sql

-- Add social/contact fields to barbers
alter table barbers
  add column if not exists instagram_url text,
  add column if not exists tiktok_url text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists years_experience integer check (years_experience >= 0),
  add column if not exists specialties text[] default '{}';

-- Portfolio images table (one row per image per barber)
create table if not exists barber_portfolio_images (
  id uuid primary key default uuid_generate_v4(),
  barber_id uuid not null references barbers(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  caption text,
  created_at timestamptz not null default now()
);

create index if not exists idx_barber_portfolio_barber on barber_portfolio_images(barber_id, sort_order);

-- Add notification log table for auditing SMS/email sends
create table if not exists notification_log (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid references appointments(id) on delete set null,
  channel text not null check (channel in ('sms', 'email_customer', 'email_barber')),
  recipient text not null,
  status text not null check (status in ('sent', 'failed', 'skipped')),
  error_message text,
  sent_at timestamptz not null default now()
);

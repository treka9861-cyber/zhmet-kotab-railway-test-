-- ============================================================
-- 💳 MIGRATION: Add transaction_id to orders table
-- Run this in the Supabase SQL Editor to support
-- InstaPay and Vodafone Cash payment verification.
-- ============================================================

ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS transaction_id TEXT DEFAULT NULL;

COMMENT ON COLUMN public.orders.transaction_id IS 
  'Reference ID submitted by the user for manual payment methods (InstaPay, Vodafone Cash, Bank Transfer)';

-- ============================================================
-- 🔔 REALTIME: Enable real-time notifications on orders table
-- Required for the admin notification system to work.
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

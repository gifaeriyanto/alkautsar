-- Drop bansos_members table and related objects

-- Drop policies first
DROP POLICY IF EXISTS "Allow all for admin" ON "public"."bansos_members";
DROP POLICY IF EXISTS "Allow read for all" ON "public"."bansos_members";

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_update_bansos_members ON bansos_members;

-- Drop the table
DROP TABLE IF EXISTS bansos_members;
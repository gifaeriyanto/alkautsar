-- Update financial_reports RLS policies
-- Drop the existing "Allow read for all" policy and recreate it for anon role

DROP POLICY IF EXISTS "Allow read for all" ON "public"."financial_reports";

CREATE POLICY "Allow read for all"
ON "public"."financial_reports"
AS PERMISSIVE
FOR SELECT
TO anon
USING (true);
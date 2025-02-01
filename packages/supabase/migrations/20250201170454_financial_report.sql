-- Create or replace table for wallets
CREATE TABLE IF NOT EXISTS wallets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
);

-- Create or replace table for financial_reports
CREATE TABLE IF NOT EXISTS financial_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    description TEXT,
    notes TEXT,
    photos TEXT[], -- Array to store multiple photo file URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
);

-- Function to automatically update 'updated_at' on row update
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for wallets table
CREATE TRIGGER trigger_update_wallets
BEFORE UPDATE ON wallets
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger for financial_reports table
CREATE TRIGGER trigger_update_financial_reports
BEFORE UPDATE ON financial_reports
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- RLS for wallets table
ALTER TABLE "public"."wallets" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for admin"
ON "public"."wallets"
AS PERMISSIVE
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Allow read for all"
ON "public"."wallets"
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- RLS for financial_reports table
ALTER TABLE "public"."financial_reports" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for admin"
ON "public"."financial_reports"
AS PERMISSIVE
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Allow read for all"
ON "public"."financial_reports"
AS PERMISSIVE
FOR SELECT
TO public
USING (true);
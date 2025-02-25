-- Create or replace table for bansos_members
CREATE TABLE IF NOT EXISTS bansos_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    whatsapp_number VARCHAR(20) NOT NULL UNIQUE,
    birth_place_date VARCHAR(255) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')) NOT NULL,
    marital_status VARCHAR(10) CHECK (marital_status IN ('single', 'married', 'divorced')) NOT NULL,
    address TEXT NOT NULL,
    education VARCHAR(20) CHECK (education IN ('none', 'sd', 'smp', 'sma', 'college')) NOT NULL,
    job VARCHAR(255),
    income_per_month INTEGER NOT NULL,
    dependents INTEGER NOT NULL,
    house_status VARCHAR(20) CHECK (house_status IN ('owned', 'rented', 'staying_with_family')) NOT NULL,
    social_assistance TEXT[],
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

-- Trigger for bansos_members table
CREATE TRIGGER trigger_update_bansos_members
BEFORE UPDATE ON bansos_members
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable Row Level Security for bansos_members table
ALTER TABLE "public"."bansos_members" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all actions for admin users
CREATE POLICY "Allow all for admin"
ON "public"."bansos_members"
AS PERMISSIVE
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Policy: Allow read access for all users
CREATE POLICY "Allow read for all"
ON "public"."bansos_members"
AS PERMISSIVE
FOR SELECT
TO public
USING (true);
-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE SET NULL,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS events_organization_id_idx ON public.events(organization_id);
CREATE INDEX IF NOT EXISTS events_wallet_id_idx ON public.events(wallet_id);
CREATE INDEX IF NOT EXISTS events_start_date_idx ON public.events(start_date);
CREATE INDEX IF NOT EXISTS events_deleted_at_idx ON public.events(deleted_at) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies following the same pattern as financial_reports
CREATE POLICY "Allow all for admin"
ON "public"."events"
AS PERMISSIVE
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Allow read for all"
ON "public"."events"
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- Trigger for events table using existing function
CREATE TRIGGER trigger_update_events
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
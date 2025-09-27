-- Create a view for wallets that have no relation to events
CREATE OR REPLACE VIEW public.wallets_without_events AS
SELECT
    w.id,
    w.name,
    w.organization_id,
    w.created_at,
    w.updated_at,
    w.deleted_at
FROM public.wallets w
LEFT JOIN public.events e ON w.id = e.wallet_id AND e.deleted_at IS NULL
WHERE e.wallet_id IS NULL
  AND w.deleted_at IS NULL;

-- Add comment to the view
COMMENT ON VIEW public.wallets_without_events IS 'View showing wallets that are not associated with any events';

-- Enable RLS on the view (inherits from base tables)
-- Views inherit RLS from their underlying tables, so no separate policies needed
ALTER VIEW public.wallets_without_events SET (security_invoker = true);
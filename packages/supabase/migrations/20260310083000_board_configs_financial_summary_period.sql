-- Add configurable financial summary period for shalat board
ALTER TABLE public.board_configs
ADD COLUMN IF NOT EXISTS financial_summary_period VARCHAR(50) NOT NULL DEFAULT 'weekly_friday_to_friday';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'board_configs_financial_summary_period_check'
  ) THEN
    ALTER TABLE public.board_configs
    ADD CONSTRAINT board_configs_financial_summary_period_check
    CHECK (financial_summary_period IN ('weekly_friday_to_friday', 'daily_today'));
  END IF;
END $$;

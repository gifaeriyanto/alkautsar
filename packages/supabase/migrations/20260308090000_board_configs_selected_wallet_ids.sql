-- Store selected wallets for shalat board financial summary
ALTER TABLE public.board_configs
ADD COLUMN IF NOT EXISTS selected_wallet_ids UUID[] NOT NULL DEFAULT '{}'::UUID[];

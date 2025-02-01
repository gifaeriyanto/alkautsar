CREATE OR REPLACE FUNCTION get_wallet_summary(
    wallet_id UUID,
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    total_income BIGINT,
    total_expense BIGINT,
    balance BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Calculate total income within the given date range
        COALESCE(SUM(CASE WHEN amount > 0 AND date BETWEEN start_date AND end_date THEN amount ELSE 0 END), 0) AS total_income,
        -- Calculate total expense within the given date range
        COALESCE(SUM(CASE WHEN amount < 0 AND date BETWEEN start_date AND end_date THEN amount ELSE 0 END), 0) AS total_expense,
        -- Calculate total balance without applying the date filter (includes all transactions)
        COALESCE(SUM(amount), 0) AS balance
    FROM financial_reports
    WHERE deleted_at IS NULL
    AND financial_reports.wallet_id = get_wallet_summary.wallet_id;
END;
$$ LANGUAGE plpgsql;
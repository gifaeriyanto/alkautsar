-- Add anon read access to board_configs for shalat board (no login required)
-- This allows the member app to fetch board configuration without authentication

CREATE POLICY "Allow anon read access to board configs" ON board_configs
  FOR SELECT 
  TO anon
  USING (true);

-- Optional: Also allow anon read access to board_slides if needed for future use
CREATE POLICY "Allow anon read access to board slides" ON board_slides
  FOR SELECT 
  TO anon
  USING (true);

-- Start transaction
BEGIN;

-- Add new columns without default values
ALTER TABLE bansos_members 
ADD COLUMN birth_place VARCHAR(50),
ADD COLUMN birth_date DATE;

-- Migrate data from birth_place_date to new columns
UPDATE bansos_members
SET 
    birth_place = NULLIF(SPLIT_PART(birth_place_date, ', ', 1), ''),
    birth_date = NULLIF(TO_DATE(NULLIF(SPLIT_PART(birth_place_date, ', ', 2), ''), 'DD-MM-YYYY'), '0001-01-01');

-- Drop old column
ALTER TABLE bansos_members DROP COLUMN birth_place_date;

-- Commit transaction
COMMIT;
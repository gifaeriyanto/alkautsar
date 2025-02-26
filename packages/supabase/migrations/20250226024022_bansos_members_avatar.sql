-- Start transaction
BEGIN;

-- Add new column for avatar
ALTER TABLE bansos_members 
ADD COLUMN avatar TEXT;

-- Commit transaction
COMMIT;
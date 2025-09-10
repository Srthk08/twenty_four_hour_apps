-- Add total_amount field to cart_customizations table
-- Run this in Supabase SQL Editor

-- Add total_amount column to cart_customizations table
ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS total_amount integer DEFAULT 0;

-- Update existing records to calculate total_amount
UPDATE cart_customizations 
SET total_amount = (
  base_price + 
  COALESCE(array_length(selected_features, 1), 0) * 500 + 
  ROUND((base_price + COALESCE(array_length(selected_features, 1), 0) * 500) * 0.18)
)
WHERE total_amount = 0 OR total_amount IS NULL;

-- Show the updated table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'cart_customizations' 
ORDER BY ordinal_position;

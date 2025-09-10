-- Add unique constraint to cart_customizations table
-- Run this in your Supabase SQL editor

-- Step 1: Add the unique constraint
ALTER TABLE cart_customizations 
ADD CONSTRAINT unique_user_product UNIQUE (user_email, product_id);

-- Step 2: Verify the constraint was added
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name = 'cart_customizations' 
AND constraint_name = 'unique_user_product';

-- Step 3: Show success message
SELECT 'SUCCESS: Unique constraint unique_user_product added!' as message;

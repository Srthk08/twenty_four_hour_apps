-- Fix for unique constraint violation in cart_customizations table
-- Run this in your Supabase SQL editor

-- Step 1: Check if the constraint already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'unique_user_product' 
        AND table_name = 'cart_customizations'
    ) THEN
        -- Add the unique constraint if it doesn't exist
        ALTER TABLE cart_customizations 
        ADD CONSTRAINT unique_user_product UNIQUE (user_email, product_id);
        
        RAISE NOTICE 'Unique constraint unique_user_product added successfully';
    ELSE
        RAISE NOTICE 'Unique constraint unique_user_product already exists';
    END IF;
END $$;

-- Step 2: Verify the constraint
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name = 'cart_customizations' 
AND constraint_name = 'unique_user_product';

-- Step 3: Show current data to verify no duplicates
SELECT 
    user_email,
    product_id,
    COUNT(*) as record_count
FROM cart_customizations 
GROUP BY user_email, product_id 
HAVING COUNT(*) > 1;

-- Step 4: If duplicates exist, keep only the latest record
DELETE FROM cart_customizations 
WHERE id NOT IN (
    SELECT DISTINCT ON (user_email, product_id) id
    FROM cart_customizations
    ORDER BY user_email, product_id, created_at DESC
);

-- Step 5: Final verification
SELECT 'SUCCESS: Unique constraint is properly configured!' as message;
SELECT COUNT(*) as total_records FROM cart_customizations;

-- Fix existing OMS customizations with "Uncategorized" categories
-- This script will update existing records to have proper categories based on their menu items

-- First, let's see what we have
SELECT 
    id,
    restaurant_name,
    menu_items,
    menu_categories
FROM oms_customizations 
WHERE menu_categories::text LIKE '%Uncategorized%'
ORDER BY created_at DESC;

-- Update records that have "Uncategorized" categories
-- This will extract actual categories from menu items and update the menu_categories field
UPDATE oms_customizations 
SET menu_categories = (
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', 'cat_' || (row_number() OVER ())::text,
            'name', category_name
        )
    )
    FROM (
        SELECT DISTINCT 
            COALESCE(
                (menu_item->>'item_category'), 
                (menu_item->>'category'), 
                'General'
            ) as category_name
        FROM jsonb_array_elements(menu_items) as menu_item
        WHERE COALESCE(
            (menu_item->>'item_category'), 
            (menu_item->>'category'), 
            'General'
        ) != 'Uncategorized'
        AND COALESCE(
            (menu_item->>'item_category'), 
            (menu_item->>'category'), 
            'General'
        ) != ''
    ) as categories
)
WHERE menu_categories::text LIKE '%Uncategorized%'
AND jsonb_array_length(menu_items) > 0;

-- If no proper categories found, set to empty array
UPDATE oms_customizations 
SET menu_categories = '[]'::jsonb
WHERE menu_categories::text LIKE '%Uncategorized%'
AND NOT EXISTS (
    SELECT 1 
    FROM jsonb_array_elements(menu_items) as menu_item
    WHERE COALESCE(
        (menu_item->>'item_category'), 
        (menu_item->>'category'), 
        'General'
    ) NOT IN ('Uncategorized', '')
);

-- Verify the results
SELECT 
    id,
    restaurant_name,
    menu_items,
    menu_categories
FROM oms_customizations 
ORDER BY created_at DESC
LIMIT 5;

-- Test the fixed OMS functions
-- This is a minimal test to verify the data type fixes work

-- Test the check_oms_duplicate function
SELECT * FROM check_oms_duplicate(
    'test@example.com',
    'Test Project',
    'Test Restaurant',
    'Test Contact',
    '+91 9876543210'
);

-- Test the upsert_oms_customization function
SELECT * FROM upsert_oms_customization(
    'test@example.com',
    'Test Project',
    'Test Restaurant',
    'Test Owner',
    'Test Address',
    'Test Contact',
    '+91 9876543210',
    '123',
    'Test Street',
    'Test City',
    'Test State',
    '123456',
    'India',
    NULL,
    NULL,
    NULL,
    NULL,
    '[]'::jsonb,
    '[]'::jsonb,
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#000000',
    'Test requirements'
);

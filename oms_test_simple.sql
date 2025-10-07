-- Simple test to verify the OMS functions work without data type errors

-- Test 1: Check duplicate function
SELECT * FROM check_oms_duplicate(
    'test@example.com',
    'Test Project',
    'Test Restaurant',
    'Test Contact',
    '+91 9876543210'
);

-- Test 2: Insert new data
SELECT * FROM upsert_oms_customization(
    'test@example.com',
    'My Restaurant App',
    'Delicious Bites',
    'John Doe',
    '123 Main Street, Mumbai, Maharashtra 400001, India',
    'John Doe',
    '+91 9876543210',
    '123',
    'Main Street',
    'Mumbai',
    'Maharashtra',
    '400001',
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

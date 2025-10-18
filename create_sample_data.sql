-- Create product_customizations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.product_customizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    product_name text NOT NULL,
    project_name text,
    customer_name text,
    company_name text,
    email text NOT NULL,
    phone text,
    requirements text,
    status text DEFAULT 'pending'::text NOT NULL,
    price numeric,
    notes text,
    CONSTRAINT product_customizations_pkey PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.product_customizations ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust user_id as needed)
CREATE POLICY IF NOT EXISTS "Allow menu_operators to view all product_customizations" 
ON public.product_customizations FOR SELECT 
USING (EXISTS ( 
    SELECT 1 FROM public.profiles 
    WHERE (profiles.user_id = auth.uid()) 
    AND (profiles.role = 'menu_operator'::text)
));

CREATE POLICY IF NOT EXISTS "Allow menu_operators to insert product_customizations" 
ON public.product_customizations FOR INSERT 
WITH CHECK (EXISTS ( 
    SELECT 1 FROM public.profiles 
    WHERE (profiles.user_id = auth.uid()) 
    AND (profiles.role = 'menu_operator'::text)
));

CREATE POLICY IF NOT EXISTS "Allow menu_operators to update product_customizations" 
ON public.product_customizations FOR UPDATE 
USING (EXISTS ( 
    SELECT 1 FROM public.profiles 
    WHERE (profiles.user_id = auth.uid()) 
    AND (profiles.role = 'menu_operator'::text)
));

-- Insert sample data
INSERT INTO public.product_customizations (
    product_name, 
    project_name, 
    customer_name, 
    company_name, 
    email, 
    phone, 
    requirements, 
    status, 
    price, 
    notes
) VALUES
(
    'Restaurant Menu System', 
    'Bella Vista Digital Menu', 
    'Maria Rodriguez', 
    'Bella Vista Restaurant', 
    'maria@bellavista.com', 
    '+1 (555) 123-4567', 
    'QR code ordering system with real-time updates', 
    'pending', 
    25000.00, 
    'Initial setup, awaiting content.'
),
(
    'Android TV App', 
    'Golden Dragon Streaming App', 
    'David Chen', 
    'Golden Dragon Media', 
    'david@goldendragon.com', 
    '+1 (555) 987-6543', 
    'Multi-language support and content management', 
    'in_progress', 
    55000.00, 
    'Backend integration in progress.'
),
(
    'Restaurant Website', 
    'Café Del Sol Website', 
    'Sophie Martin', 
    'Café Del Sol', 
    'sophie@cafedelsol.com', 
    '+1 (555) 456-7890', 
    'Online ordering integration with delivery partners', 
    'completed', 
    30000.00, 
    'Website launched, monitoring performance.'
),
(
    'Mobile App', 
    'Food Delivery App', 
    'John Smith', 
    'QuickBite Delivery', 
    'john@quickbite.com', 
    '+1 (555) 234-5678', 
    'Cross-platform mobile app with payment integration', 
    'pending', 
    45000.00, 
    'Waiting for design approval.'
),
(
    'E-commerce Platform', 
    'Online Store Setup', 
    'Sarah Johnson', 
    'Fashion Forward', 
    'sarah@fashionforward.com', 
    '+1 (555) 345-6789', 
    'Complete e-commerce solution with inventory management', 
    'in_progress', 
    35000.00, 
    'Payment gateway integration in progress.'
);

-- Create menu_photos table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.menu_photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    filename text NOT NULL,
    file_path text,
    file_size bigint,
    mime_type text,
    status text DEFAULT 'pending'::text NOT NULL,
    notes text,
    CONSTRAINT menu_photos_pkey PRIMARY KEY (id)
);

-- Enable RLS for menu_photos
ALTER TABLE public.menu_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_photos
CREATE POLICY IF NOT EXISTS "Allow menu_operators to view all menu_photos" 
ON public.menu_photos FOR SELECT 
USING (EXISTS ( 
    SELECT 1 FROM public.profiles 
    WHERE (profiles.user_id = auth.uid()) 
    AND (profiles.role = 'menu_operator'::text)
));

CREATE POLICY IF NOT EXISTS "Allow menu_operators to insert menu_photos" 
ON public.menu_photos FOR INSERT 
WITH CHECK (EXISTS ( 
    SELECT 1 FROM public.profiles 
    WHERE (profiles.user_id = auth.uid()) 
    AND (profiles.role = 'menu_operator'::text)
));

-- Insert sample menu photos
INSERT INTO public.menu_photos (
    filename, 
    file_path, 
    file_size, 
    mime_type, 
    status, 
    notes
) VALUES
(
    'bella_vista_menu_1.jpg', 
    '/uploads/menus/bella_vista_menu_1.jpg', 
    2048576, 
    'image/jpeg', 
    'processed', 
    'Main menu page for Bella Vista Restaurant'
),
(
    'golden_dragon_appetizers.jpg', 
    '/uploads/menus/golden_dragon_appetizers.jpg', 
    1536000, 
    'image/jpeg', 
    'pending', 
    'Appetizers section for Golden Dragon'
),
(
    'cafe_del_sol_drinks.png', 
    '/uploads/menus/cafe_del_sol_drinks.png', 
    3072000, 
    'image/png', 
    'processed', 
    'Beverage menu for Café Del Sol'
),
(
    'quickbite_delivery_menu.pdf', 
    '/uploads/menus/quickbite_delivery_menu.pdf', 
    512000, 
    'application/pdf', 
    'in_progress', 
    'Complete menu for QuickBite Delivery'
),
(
    'fashion_forward_catalog.jpg', 
    '/uploads/menus/fashion_forward_catalog.jpg', 
    4096000, 
    'image/jpeg', 
    'pending', 
    'Product catalog for Fashion Forward'
);

-- Create product_customizations table for menu operator dashboard
CREATE TABLE IF NOT EXISTS product_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    requirements TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    price DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_customizations_email ON product_customizations(email);
CREATE INDEX IF NOT EXISTS idx_product_customizations_status ON product_customizations(status);
CREATE INDEX IF NOT EXISTS idx_product_customizations_created_at ON product_customizations(created_at);

-- Insert some sample data
INSERT INTO product_customizations (product_name, project_name, customer_name, company_name, email, phone, requirements, status, price) VALUES
('Restaurant Menu System', 'Bella Vista Digital Menu', 'Maria Rodriguez', 'Bella Vista Restaurant', 'maria@bellavista.com', '+1 (555) 123-4567', 'QR code ordering system with real-time updates', 'pending', 25000.00),
('Android TV App', 'Golden Dragon Streaming App', 'David Chen', 'Golden Dragon Media', 'david@goldendragon.com', '+1 (555) 987-6543', 'Multi-language support and content management', 'in_progress', 55000.00),
('Restaurant Website', 'Café Del Sol Website', 'Sophie Martin', 'Café Del Sol', 'sophie@cafedelsol.com', '+1 (555) 456-7890', 'Online ordering integration with delivery partners', 'completed', 15000.00),
('Streaming Mobile App', 'Pizza Palace Mobile App', 'Tony Romano', 'Pizza Palace', 'tony@pizzapalace.com', '+1 (555) 321-9876', 'Real-time order tracking and push notifications', 'pending', 45000.00),
('Restaurant Menu System', 'Sushi Master Digital Menu', 'Yuki Tanaka', 'Sushi Master', 'yuki@sushimaster.com', '+1 (555) 654-3210', 'Customizable menu categories and seasonal updates', 'in_progress', 25000.00);

-- Enable Row Level Security (RLS)
ALTER TABLE product_customizations ENABLE ROW LEVEL SECURITY;

-- Create policy for menu operators to read all customizations
CREATE POLICY "Menu operators can read all product customizations" ON product_customizations
    FOR SELECT USING (true);

-- Create policy for menu operators to update customizations
CREATE POLICY "Menu operators can update product customizations" ON product_customizations
    FOR UPDATE USING (true);

-- Create policy for menu operators to insert customizations
CREATE POLICY "Menu operators can insert product customizations" ON product_customizations
    FOR INSERT WITH CHECK (true);

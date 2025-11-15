// Simple products data for build
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category: 'restaurant' | 'mobile' | 'tv' | 'web';
  base_price: number;
  featured_image: string;
  gallery: string[];
  features: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Mock products data - Original products from database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Restaurant Menu System',
    slug: 'restaurant-menu-system',
    description: 'Digital menu system with QR code integration, online ordering, and real-time updates. Perfect for restaurants looking to modernize their customer experience.',
    short_description: 'Digital menu system with QR code integration and online ordering',
    category: 'restaurant',
    base_price: 25000,
    featured_image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
    gallery: [],
    features: ['QR Code Menu', 'Online Ordering', 'Real-time Updates', 'Payment Integration', 'Analytics Dashboard'],
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Android TV App',
    slug: 'android-tv-app',
    description: 'Custom Android TV applications with beautiful UI, content management, and remote control support. Perfect for streaming services and media companies.',
    short_description: 'Custom Android TV applications with content management',
    category: 'tv',
    base_price: 55000,
    featured_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center',
    gallery: [],
    features: ['Custom Design', 'Content Management', 'Remote Control Support', 'User Authentication', 'Analytics'],
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Streaming Mobile App',
    slug: 'streaming-mobile-app',
    description: 'Professional streaming applications for iOS and Android with advanced features like live streaming, video on demand, and monetization options.',
    short_description: 'Professional streaming apps for iOS and Android',
    category: 'mobile',
    base_price: 55000,
    featured_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center',
    gallery: [],
    features: ['Live Streaming', 'Video on Demand', 'User Authentication', 'Payment Integration', 'Push Notifications'],
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Restaurant Website',
    slug: 'restaurant-website',
    description: 'Beautiful, responsive restaurant websites with online reservation system, menu showcase, and social media integration. SEO optimized for local search.',
    short_description: 'Professional restaurant websites with reservations',
    category: 'web',
    base_price: 25000,
    featured_image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
    gallery: [],
    features: ['Responsive Design', 'Online Reservations', 'Menu Showcase', 'SEO Optimization', 'Social Media Integration'],
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Order Menu System',
    slug: 'order-menu-system',
    description: 'Complete order management system with digital menu integration, real-time order tracking, and payment processing. Perfect for restaurants looking to streamline their ordering process.',
    short_description: 'Complete order management system with digital menu integration',
    category: 'web',
    base_price: 999,
    featured_image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
    gallery: [],
    features: ['Order Management', 'Digital Menu Integration', 'Real-time Tracking', 'Payment Processing', 'Analytics Dashboard'],
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const getProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  return mockProducts.find(product => product.slug === slug) || null;
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getProductPlans = async (productId: string) => {
  // For Order Menu System (id '5'), return a single common plan priced at 999
  if (productId === '5') {
    return [
      {
        id: 'oms-999',
        product_id: productId,
        name: 'Common Plan',
        description: 'Standard Order Menu System plan',
        price: 999,
        features: ['All essential OMS features'],
        delivery_days: 1,
        is_popular: true,
        sort_order: 1,
        created_at: new Date().toISOString()
      }
    ];
  }

  // Default plans for other products
  return [
    {
      id: '1',
      product_id: productId,
      name: 'Basic Plan',
      description: 'Essential features for small businesses',
      price: 15000,
      features: ['Basic Features', 'Email Support'],
      delivery_days: 1,
      is_popular: false,
      sort_order: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      product_id: productId,
      name: 'Pro Plan',
      description: 'Advanced features for growing businesses',
      price: 25000,
      features: ['All Basic Features', 'Advanced Features', 'Priority Support'],
      delivery_days: 1,
      is_popular: true,
      sort_order: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      product_id: productId,
      name: 'Enterprise Plan',
      description: 'Complete solution for large enterprises',
      price: 50000,
      features: ['All Pro Features', 'Custom Development', '24/7 Support', 'Dedicated Manager'],
      delivery_days: 2,
      is_popular: false,
      sort_order: 3,
      created_at: new Date().toISOString()
    }
  ];
};
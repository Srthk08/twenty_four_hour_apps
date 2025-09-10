// Admin Data Store - Centralized data management for admin panel
// Now fully integrated with Supabase for real-time data management

import { supabase } from './supabase';

// Re-export interfaces for backward compatibility
export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  company_name?: string;
  role: 'customer' | 'admin' | 'developer' | 'support';
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  username?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  timezone?: string;
  language?: string;
  last_login_at?: string;
  login_count?: number;
  created_at: string;
  updated_at: string;
  admin_level?: string;
  admin_permissions?: any;
}

export interface AdminOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  service_name: string;
  status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  admin_reply?: string;
}

export interface AdminRevenue {
  id: string;
  order_id: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface OrderTimeline {
  id: string;
  status: string;
  message: string;
  timestamp: string;
  updatedBy: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  pendingOrders: number;
  cartOrders: number;
  completedOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  openTickets: number;
  highPriorityTickets: number;
  pendingPayments: number;
}

// Enhanced Admin Data Store Class - Now using Supabase
export class AdminDataStore {
  private static instance: AdminDataStore;

  private constructor() {
    // Initialize admin data store
  }

  public static getInstance(): AdminDataStore {
    if (!AdminDataStore.instance) {
      AdminDataStore.instance = new AdminDataStore();
    }
    return AdminDataStore.instance;
  }

  // User Management - Now using Supabase
  async getUsers(): Promise<AdminUser[]> {
    try {
      const { data, error } = await supabase
        .from('profiles_complete')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUsers:', error);
      return [];
    }
  }

  async getUserById(id: string): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('profiles_complete')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching user by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserById:', error);
      return null;
    }
  }

  async addUser(user: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          company_name: user.company_name,
          role: user.role,
          status: user.status,
          username: user.username,
          avatar_url: user.avatar_url,
          bio: user.bio,
          website: user.website,
          location: user.location,
          timezone: user.timezone,
          language: user.language
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in addUser:', error);
      return null;
    }
  }

  async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateUser:', error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting user:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      return false;
    }
  }

  // Order Management - Now using Supabase
  async getOrders(): Promise<AdminOrder[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles!inner(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return [];
      }

      // Transform data to match AdminOrder interface
      return (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        customer_name: order.user_profiles?.full_name || 'Unknown',
        customer_email: order.user_profiles?.email || 'Unknown',
        service_name: order.service_name || 'Unknown Service',
        status: order.status,
        total_amount: order.total_amount,
        created_at: order.created_at,
        updated_at: order.updated_at
      }));
    } catch (error) {
      console.error('Error in getOrders:', error);
      return [];
    }
  }

  async getOrderById(id: string): Promise<AdminOrder | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user_profiles!inner(full_name, email)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching order by ID:', error);
        return null;
      }

      return {
        id: data.id,
        order_number: data.order_number,
        customer_name: data.user_profiles?.full_name || 'Unknown',
        customer_email: data.user_profiles?.email || 'Unknown',
        service_name: data.service_name || 'Unknown Service',
        status: data.status,
        total_amount: data.total_amount,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error('Error in getOrderById:', error);
      return null;
    }
  }

  async addOrder(order: Omit<AdminOrder, 'id' | 'created_at' | 'updated_at'>): Promise<AdminOrder | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_number: order.order_number,
          customer_name: order.customer_name,
          customer_email: order.customer_email,
          service_name: order.service_name,
          status: order.status,
          total_amount: order.total_amount
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding order:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in addOrder:', error);
      return null;
    }
  }

  async updateOrder(id: string, updates: Partial<AdminOrder>): Promise<AdminOrder | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating order:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateOrder:', error);
      return null;
    }
  }

  // Revenue Management - Now using Supabase
  async getRevenue(): Promise<AdminRevenue[]> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching revenue:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRevenue:', error);
      return [];
    }
  }

  async addRevenue(revenue: Omit<AdminRevenue, 'id' | 'created_at'>): Promise<AdminRevenue | null> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          order_id: revenue.order_id,
          amount: revenue.amount,
          payment_method: revenue.payment_method,
          status: revenue.status
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding revenue:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in addRevenue:', error);
      return null;
    }
  }

  async getRevenueByDateRange(startDate: Date, endDate: Date): Promise<AdminRevenue[]> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching revenue by date range:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRevenueByDateRange:', error);
      return [];
    }
  }

  // Support Ticket Management - Now using Supabase
  async getSupportTickets(): Promise<SupportTicket[]> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching support tickets:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getSupportTickets:', error);
      return [];
    }
  }

  async getTicketById(id: string): Promise<SupportTicket | null> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching ticket by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getTicketById:', error);
      return null;
    }
  }

  async addTicket(ticket: Omit<SupportTicket, 'id' | 'created_at' | 'updated_at'>): Promise<SupportTicket | null> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: ticket.user_id,
          subject: ticket.subject,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding ticket:', error);
    return null;
  }

      return data;
    } catch (error) {
      console.error('Error in addTicket:', error);
      return null;
    }
  }

  async updateTicket(id: string, updates: Partial<SupportTicket> & { adminReply?: any }): Promise<SupportTicket | null> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating ticket:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateTicket:', error);
      return null;
    }
  }

  // Statistics - Now using Supabase
  async getStats(): Promise<AdminStats> {
    try {
      // Get dashboard data from view
      const { data: dashboardData, error: dashboardError } = await supabase
        .from('admin_dashboard_data')
        .select('*')
        .single();

      if (dashboardError) {
        console.error('Error fetching dashboard data:', dashboardError);
        return this.getDefaultStats();
      }

      // Get additional stats
      const [orders, revenue, tickets] = await Promise.all([
        this.getOrders(),
        this.getRevenue(),
        this.getSupportTickets()
      ]);

      const totalRevenue = revenue.reduce((sum, item) => sum + (item.amount || 0), 0);
      const monthlyRevenue = revenue
        .filter(item => new Date(item.created_at) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        .reduce((sum, item) => sum + (item.amount || 0), 0);
      const weeklyRevenue = revenue
        .filter(item => new Date(item.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .reduce((sum, item) => sum + (item.amount || 0), 0);

      return {
        totalUsers: dashboardData?.total_users || 0,
        activeUsers: dashboardData?.active_users || 0,
        totalOrders: orders.length,
        pendingOrders: orders.filter(order => order.status === 'pending').length,
        cartOrders: orders.filter(order => order.status === 'cart').length,
        completedOrders: orders.filter(order => order.status === 'completed').length,
        totalRevenue,
        monthlyRevenue,
        weeklyRevenue,
        openTickets: tickets.filter(ticket => ticket.status === 'open').length,
        highPriorityTickets: tickets.filter(ticket => ticket.priority === 'high').length,
        pendingPayments: revenue.filter(item => item.status === 'pending').length
      };
    } catch (error) {
      console.error('Error in getStats:', error);
      return this.getDefaultStats();
    }
  }

  private getDefaultStats(): AdminStats {
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalOrders: 0,
      pendingOrders: 0,
      cartOrders: 0,
      completedOrders: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      weeklyRevenue: 0,
      openTickets: 0,
      highPriorityTickets: 0,
      pendingPayments: 0
    };
  }

  // Search and Filter - Now using Supabase
  async searchUsers(query: string): Promise<AdminUser[]> {
    try {
      const { data, error } = await supabase
        .from('profiles_complete')
        .select('*')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%,company_name.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchUsers:', error);
      return [];
    }
  }

  async searchOrders(query: string): Promise<AdminOrder[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user_profiles!inner(full_name, email)
        `)
        .or(`order_number.ilike.%${query}%,user_profiles.full_name.ilike.%${query}%,user_profiles.email.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching orders:', error);
        return [];
      }

      return (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        customer_name: order.user_profiles?.full_name || 'Unknown',
        customer_email: order.user_profiles?.email || 'Unknown',
        service_name: order.service_name || 'Unknown Service',
        status: order.status,
        total_amount: order.total_amount,
        created_at: order.created_at,
        updated_at: order.updated_at
      }));
    } catch (error) {
      console.error('Error in searchOrders:', error);
      return [];
    }
  }

  async filterOrdersByStatus(status: string): Promise<AdminOrder[]> {
    try {
      if (!status) return await this.getOrders();

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user_profiles!inner(full_name, email)
        `)
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering orders by status:', error);
        return [];
      }

      return (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        customer_name: order.user_profiles?.full_name || 'Unknown',
        customer_email: order.user_profiles?.email || 'Unknown',
        service_name: order.service_name || 'Unknown Service',
        status: order.status,
        total_amount: order.total_amount,
        created_at: order.created_at,
        updated_at: order.updated_at
      }));
    } catch (error) {
      console.error('Error in filterOrdersByStatus:', error);
      return [];
    }
  }

  async filterOrdersByDateRange(dateRange: string): Promise<AdminOrder[]> {
    try {
    const now = new Date();
    let startDate: Date;

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
          return await this.getOrders();
      }

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user_profiles!inner(full_name, email)
        `)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering orders by date range:', error);
        return [];
      }

      return (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        customer_name: order.user_profiles?.full_name || 'Unknown',
        customer_email: order.user_profiles?.email || 'Unknown',
        service_name: order.service_name || 'Unknown Service',
        status: order.status,
        total_amount: order.total_amount,
        created_at: order.created_at,
        updated_at: order.updated_at
      }));
    } catch (error) {
      console.error('Error in filterOrdersByDateRange:', error);
      return [];
    }
  }

  // Export functionality
  exportOrdersToCSV(): string {
    // This would need to be implemented based on your CSV export requirements
    return 'CSV export functionality to be implemented';
  }

  // Clear all data (admin only)
  async clearAllData(): Promise<boolean> {
    try {
      // This is a dangerous operation - should only be available to super admins
      const { error } = await supabase.rpc('clear_all_data');
      
      if (error) {
        console.error('Error clearing all data:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in clearAllData:', error);
      return false;
    }
  }

  // Admin-specific functions
  async getAdminUsers(): Promise<any[]> {
    try {
      const { data, error } = await supabase.rpc('get_admin_users');
      
      if (error) {
        console.error('Error fetching admin users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAdminUsers:', error);
      return [];
    }
  }

  async logAdminAction(action: string, targetType?: string, targetId?: string, details?: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('admin_audit_log')
        .insert({
          action,
          target_type: targetType,
          target_id: targetId,
          details: details || {},
          ip_address: '127.0.0.1', // Will be updated with real IP in production
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Error logging admin action:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in logAdminAction:', error);
      return false;
    }
  }
}

// Export singleton instance
export const adminDataStore = AdminDataStore.getInstance();

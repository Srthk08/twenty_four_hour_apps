// Service for Order Menu System database operations
import { supabase } from './supabase';
import type { 
  OrderMenuSystemCustomization, 
  OrderMenuItem, 
  OrderMenuSystemFormData,
  OrderMenuSystemInsert,
  OrderMenuItemInsert
} from './order-menu-types';

export class OrderMenuSystemService {
  
  /**
   * Save Order Menu System customization data
   */
  static async saveCustomization(
    userEmail: string, 
    userId: string | null, 
    formData: OrderMenuSystemFormData
  ): Promise<OrderMenuSystemCustomization | null> {
    try {
      // Prepare customization data
      const customizationData: OrderMenuSystemInsert = {
        user_email: userEmail,
        user_id: userId || undefined,
        restaurant_name: formData.restaurant_name,
        owner_name: formData.owner_name,
        restaurant_address: formData.restaurant_address,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        primary_color: formData.primary_color || '#3B82F6',
        secondary_color: formData.secondary_color || '#000000',
        accent_color: formData.accent_color || '#F59E0B',
        text_color: formData.text_color || '#1F2937',
        additional_requirements: formData.additional_requirements,
        cart_status: 'active'
      };

      // Handle logo upload if present
      if (formData.restaurant_logo) {
        const logoFile = formData.restaurant_logo;
        const logoUrl = await this.uploadLogo(logoFile, userEmail);
        
        if (logoUrl) {
          customizationData.restaurant_logo_url = logoUrl;
          customizationData.restaurant_logo_filename = logoFile.name;
          customizationData.restaurant_logo_size = logoFile.size;
          customizationData.restaurant_logo_type = logoFile.type;
          customizationData.restaurant_logo_hash = `hash_${logoFile.name}_${logoFile.size}_${Date.now()}`;
        }
      }

      // Insert customization data
      const { data: customization, error: customizationError } = await supabase
        .from('order_menu_system_customizations')
        .insert(customizationData)
        .select()
        .single();

      if (customizationError) {
        console.error('Error saving Order Menu System customization:', customizationError);
        return null;
      }

      // Save menu items
      if (formData.menu_items && formData.menu_items.length > 0) {
        const menuItemsData: OrderMenuItemInsert[] = formData.menu_items.map(item => ({
          customization_id: customization.id,
          item_name: item.item_name,
          price: item.price,
          quantity_available: item.quantity_available
        }));

        const { error: menuItemsError } = await supabase
          .from('order_menu_items')
          .insert(menuItemsData);

        if (menuItemsError) {
          console.error('Error saving menu items:', menuItemsError);
          // Don't return null here, customization was saved successfully
        }
      }

      return customization;
    } catch (error) {
      console.error('Error in saveCustomization:', error);
      return null;
    }
  }

  /**
   * Get Order Menu System customization by user email
   */
  static async getCustomizationByUser(userEmail: string): Promise<OrderMenuSystemCustomization | null> {
    try {
      const { data, error } = await supabase
        .from('order_menu_system_customizations')
        .select('*')
        .eq('user_email', userEmail)
        .eq('cart_status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching Order Menu System customization:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCustomizationByUser:', error);
      return null;
    }
  }

  /**
   * Get menu items for a customization
   */
  static async getMenuItems(customizationId: string): Promise<OrderMenuItem[]> {
    try {
      const { data, error } = await supabase
        .from('order_menu_items')
        .select('*')
        .eq('customization_id', customizationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching menu items:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getMenuItems:', error);
      return [];
    }
  }

  /**
   * Update Order Menu System customization
   */
  static async updateCustomization(
    customizationId: string, 
    formData: Partial<OrderMenuSystemFormData>
  ): Promise<boolean> {
    try {
      const updateData: Partial<OrderMenuSystemInsert> = {};

      if (formData.restaurant_name) updateData.restaurant_name = formData.restaurant_name;
      if (formData.owner_name) updateData.owner_name = formData.owner_name;
      if (formData.restaurant_address) updateData.restaurant_address = formData.restaurant_address;
      if (formData.contact_email) updateData.contact_email = formData.contact_email;
      if (formData.contact_phone) updateData.contact_phone = formData.contact_phone;
      if (formData.primary_color) updateData.primary_color = formData.primary_color;
      if (formData.secondary_color) updateData.secondary_color = formData.secondary_color;
      if (formData.accent_color) updateData.accent_color = formData.accent_color;
      if (formData.text_color) updateData.text_color = formData.text_color;
      if (formData.additional_requirements) updateData.additional_requirements = formData.additional_requirements;

      // Handle logo update if present
      if (formData.restaurant_logo) {
        const logoFile = formData.restaurant_logo;
        const logoUrl = await this.uploadLogo(logoFile, '');
        
        if (logoUrl) {
          updateData.restaurant_logo_url = logoUrl;
          updateData.restaurant_logo_filename = logoFile.name;
          updateData.restaurant_logo_size = logoFile.size;
          updateData.restaurant_logo_type = logoFile.type;
          updateData.restaurant_logo_hash = `hash_${logoFile.name}_${logoFile.size}_${Date.now()}`;
        }
      }

      const { error } = await supabase
        .from('order_menu_system_customizations')
        .update(updateData)
        .eq('id', customizationId);

      if (error) {
        console.error('Error updating Order Menu System customization:', error);
        return false;
      }

      // Update menu items if provided
      if (formData.menu_items) {
        // Delete existing menu items
        await supabase
          .from('order_menu_items')
          .delete()
          .eq('customization_id', customizationId);

        // Insert new menu items
        if (formData.menu_items.length > 0) {
          const menuItemsData: OrderMenuItemInsert[] = formData.menu_items.map(item => ({
            customization_id: customizationId,
            item_name: item.item_name,
            price: item.price,
            quantity_available: item.quantity_available
          }));

          const { error: menuItemsError } = await supabase
            .from('order_menu_items')
            .insert(menuItemsData);

          if (menuItemsError) {
            console.error('Error updating menu items:', menuItemsError);
            return false;
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Error in updateCustomization:', error);
      return false;
    }
  }

  /**
   * Delete Order Menu System customization
   */
  static async deleteCustomization(customizationId: string): Promise<boolean> {
    try {
      // Delete menu items first (due to foreign key constraint)
      await supabase
        .from('order_menu_items')
        .delete()
        .eq('customization_id', customizationId);

      // Delete customization
      const { error } = await supabase
        .from('order_menu_system_customizations')
        .delete()
        .eq('id', customizationId);

      if (error) {
        console.error('Error deleting Order Menu System customization:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteCustomization:', error);
      return false;
    }
  }

  /**
   * Upload restaurant logo
   */
  private static async uploadLogo(file: File, userEmail: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `order-menu-logo-${Date.now()}.${fileExt}`;
      const filePath = `order-menu-logos/${userEmail}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-assets')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading logo:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('restaurant-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadLogo:', error);
      return null;
    }
  }

  /**
   * Get complete Order Menu System data with menu items
   */
  static async getCompleteCustomization(userEmail: string): Promise<{
    customization: OrderMenuSystemCustomization | null;
    menuItems: OrderMenuItem[];
  }> {
    try {
      const customization = await this.getCustomizationByUser(userEmail);
      
      if (!customization) {
        return { customization: null, menuItems: [] };
      }

      const menuItems = await this.getMenuItems(customization.id!);

      return { customization, menuItems };
    } catch (error) {
      console.error('Error in getCompleteCustomization:', error);
      return { customization: null, menuItems: [] };
    }
  }
}

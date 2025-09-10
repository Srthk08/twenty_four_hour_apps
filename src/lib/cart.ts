import { writable } from 'svelte/store';
import type { CartItem } from './supabase';

// Cart store for client-side state management
export const cartStore = writable<CartItem[]>([]);
export const cartCount = writable(0);
export const cartTotal = writable(0);

// Update cart totals
export const updateCartTotals = (items: CartItem[]) => {
  cartCount.set(items.reduce((sum, item) => sum + item.quantity, 0));
  cartTotal.set(items.reduce((sum, item) => sum + (item.plan?.price || 0) * item.quantity, 0));
};

// Cart utilities
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const calculateDeliveryTime = (items: CartItem[]): number => {
  return Math.max(...items.map(item => item.plan?.delivery_days || 1));
};
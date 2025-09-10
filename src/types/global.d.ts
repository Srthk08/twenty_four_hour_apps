// Global type declarations for the application

declare global {
  interface Window {
    supabase: any;
    globalAuthManager: any;
    simpleAuthManager: any;
    adminTimezone: string;
    utils: any;
    handleAdminSignOut: () => void;
    changeItemsPerPage: (value: string) => void;
    prevPage: () => void;
    nextPage: () => void;
    goToPage: (page: number) => void;
    viewTicketDetails: (ticketId: string) => void;
    viewUserDetails: (userId: string) => void;
    viewContactDetails: (contactId: string) => void;
    viewCartDetails: (cartId: string) => void;
    redirectToCart: (productId: string, price: number) => void;
  }

  interface HTMLElement {
    value: string;
    checked: boolean;
    disabled: boolean;
    required: boolean;
    files: FileList | null;
    reset(): void;
    querySelectorAll(selectors: string): NodeListOf<Element>;
    dataset: DOMStringMap;
  }

  interface HTMLInputElement extends HTMLElement {
    value: string;
    checked: boolean;
    disabled: boolean;
    required: boolean;
    files: FileList | null;
  }

  interface HTMLSelectElement extends HTMLElement {
    value: string;
  }

  interface HTMLButtonElement extends HTMLElement {
    disabled: boolean;
  }

  interface HTMLFormElement extends HTMLElement {
    reset(): void;
  }

  interface Event {
    detail?: any;
    dataTransfer?: DataTransfer;
    target?: EventTarget | null;
  }

  interface EventTarget {
    files?: FileList | null;
    value?: string;
  }

  interface DataTransfer {
    files: FileList;
  }

  interface File {
    name: string;
  }

  interface Node {
    querySelector(selectors: string): Element | null;
    querySelectorAll(selectors: string): NodeListOf<Element>;
    classList: DOMTokenList;
    id: string;
  }

  interface Element extends Node {
    textContent: string | null;
    classList: DOMTokenList;
    id: string;
    style: CSSStyleDeclaration;
  }

  interface CSSStyleDeclaration {
    backgroundColor: string;
  }

  // Cart and Orders related types
  interface Cart {
    items: any[];
    debouncedSaveToSupabase: any;
  }

  interface Orders {
    orders: any[];
  }

  // AuthGuard type
  interface AuthGuard {
    getCurrentUser(): any;
  }

  // Form data type
  interface FormData {
    [key: string]: any;
  }
}

export {};

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, request }) => {
  try {
    // Get the request body to check logout type
    const body = await request.json();
    const logoutType = body?.type || 'supabase'; // Default to Supabase now
    
    if (logoutType === 'supabase') {
      // Handle Supabase logout
      try {
        // Clear Supabase cookies if they exist
        cookies.delete('sb-access-token', { path: '/' });
        cookies.delete('sb-refresh-token', { path: '/' });
        cookies.delete('supabase-auth-token', { path: '/' });
        
        // Clear any other Supabase-related cookies
        // Note: Astro doesn't support cookies.getAll(), so we manually clear known cookies
      } catch (error) {
        console.warn('Supabase logout cleanup failed:', error);
      }
    } else {
      // Handle simple-auth logout (legacy)
      // Clear any simple-auth related cookies
      cookies.delete('simple-auth-token', { path: '/' });
      cookies.delete('simple-auth-user', { path: '/' });
    }

    // Always return success for logout
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully',
      redirectUrl: '/login'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if there's an error, return success to ensure logout proceeds
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully',
      redirectUrl: '/login'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Also handle GET requests for compatibility
export const GET: APIRoute = async ({ cookies }) => {
  try {
    // Clear all auth-related cookies
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });
    cookies.delete('supabase-auth-token', { path: '/' });
    cookies.delete('simple-auth-token', { path: '/' });
    cookies.delete('simple-auth-user', { path: '/' });

    // Clear any other Supabase-related cookies
    // Note: Astro doesn't support cookies.getAll(), so we manually clear known cookies

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully',
      redirectUrl: '/login'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully',
      redirectUrl: '/login'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
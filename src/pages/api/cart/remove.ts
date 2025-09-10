import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { itemId, userSession } = body;

    // Check if user session is provided (from our global auth manager)
    if (!userSession || !userSession.user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!itemId) {
      return new Response(JSON.stringify({ error: 'Missing item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, we'll handle cart removal on the client side
    // This is a temporary solution until we integrate with Supabase properly
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Item removed from cart successfully',
      itemId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Cart remove error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
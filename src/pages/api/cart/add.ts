import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { productId, planId, quantity = 1, customRequirements = {}, userSession } = body;

    // Check if user session is provided (from our global auth manager)
    if (!userSession || !userSession.user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!productId || !planId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, we'll store cart data in localStorage on the client side
    // This is a temporary solution until we integrate with Supabase properly
    const cartItem = {
      id: Date.now().toString(),
      productId,
      planId,
      quantity,
      customRequirements,
      userId: userSession.user.id,
      addedAt: new Date().toISOString()
    };

    // Return success with cart item data
    return new Response(JSON.stringify({ 
      success: true, 
      data: cartItem,
      message: 'Item added to cart successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Cart add error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
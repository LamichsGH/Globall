import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount } = await req.json();
    
    // Validate amount (minimum 30p, maximum £10000)
    const donationAmount = Number(amount);
    if (!donationAmount || donationAmount < 0.30 || donationAmount > 10000) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid amount between 30p and £10,000" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log("Creating donation checkout for amount:", donationAmount);

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const origin = req.headers.get("origin") || "https://a2a6fc1c-fbe4-4bb3-baed-689501ca927c.lovableproject.com";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "GLO-BALL Donation",
              description: "Support children through football",
            },
            unit_amount: Math.round(donationAmount * 100), // Convert £ to pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/donate?success=true`,
      cancel_url: `${origin}/donate?canceled=true`,
    });

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating donation checkout:", errorMessage);
    return new Response(JSON.stringify({ error: "Failed to process donation. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { type NextRequest, NextResponse } from "next/server"
import { stripe, formatAmountForStripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    console.log("Checkout API called")

    const { items, customerInfo } = await request.json()

    console.log("Items:", items)
    console.log("Customer Info:", customerInfo)

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    if (!customerInfo || !customerInfo.email) {
      return NextResponse.json({ error: "Customer information is required" }, { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
          description: item.category_name || "Australian Coin",
          images: item.primary_image_url ? [item.primary_image_url] : [],
        },
        unit_amount: formatAmountForStripe(item.price),
      },
      quantity: item.quantity,
    }))

    console.log("Line items:", lineItems)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerInfo.email,
      metadata: {
        customer_info: JSON.stringify(customerInfo),
      },
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancelled`,
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      billing_address_collection: "required",
    })

    console.log("Stripe session created:", session.id)

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 },
    )
  }
}

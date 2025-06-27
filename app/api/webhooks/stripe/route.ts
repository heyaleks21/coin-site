import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      console.error("No Stripe signature found")
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET not configured")
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
    }

    let event: any

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Webhook event received:", event.type)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      console.log("Processing completed checkout session:", session.id)

      try {
        // Parse customer info from metadata
        const customerInfo = JSON.parse(session.metadata?.customer_info || "{}")

        // Create order in database
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            stripe_session_id: session.id,
            customer_email: session.customer_email || customerInfo.email,
            customer_name: customerInfo.name,
            customer_phone: customerInfo.phone,
            total_amount: session.amount_total / 100, // Convert from cents
            status: "paid",
            shipping_address: session.shipping_details?.address
              ? JSON.stringify(session.shipping_details.address)
              : null,
            billing_address: session.customer_details?.address
              ? JSON.stringify(session.customer_details.address)
              : null,
          })
          .select()
          .single()

        if (orderError) {
          console.error("Error creating order:", orderError)
          return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
        }

        console.log("Order created successfully:", order.id)

        // Here you could also:
        // 1. Send confirmation email
        // 2. Update inventory
        // 3. Trigger fulfillment process

        return NextResponse.json({ received: true })
      } catch (error) {
        console.error("Error processing webhook:", error)
        return NextResponse.json({ error: "Processing failed" }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}

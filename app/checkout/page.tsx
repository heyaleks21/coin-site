"use client"

import type React from "react"
import { useState } from "react"
import { Edit, Check } from "lucide-react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/CartContext"
import Navigation from "@/components/Navigation"
import { useToast } from "@/hooks/use-toast"

type CheckoutStep = "cart" | "contact" | "payment"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [completedSteps, setCompletedSteps] = useState<CheckoutStep[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleStepComplete = (step: CheckoutStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }

    // Move to next step
    if (step === "cart") {
      setCurrentStep("contact")
    } else if (step === "contact") {
      setCurrentStep("payment")
    }
  }

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          customerInfo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to process checkout",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const isStepCompleted = (step: CheckoutStep) => completedSteps.includes(step)
  const isStepCurrent = (step: CheckoutStep) => currentStep === step

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some coins to your cart to get started!</p>
            <Link href="/catalog">
              <Button className="bg-amber-600 hover:bg-amber-700">Browse Catalog</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isStepCompleted("cart")
                        ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                        : isStepCurrent("cart")
                          ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isStepCompleted("cart") ? <Check className="w-5 h-5" /> : <span className="font-semibold">1</span>}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isStepCurrent("cart") || isStepCompleted("cart") ? "text-amber-600" : "text-gray-500"
                    }`}
                  >
                    Review cart
                  </span>
                </div>

                {/* Connector Line 1 */}
                <div className={`flex-1 h-0.5 mx-4 ${isStepCompleted("cart") ? "bg-amber-600" : "bg-gray-300"}`} />

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isStepCompleted("contact")
                        ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                        : isStepCurrent("contact")
                          ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isStepCompleted("contact") ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">2</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isStepCurrent("contact") || isStepCompleted("contact") ? "text-amber-600" : "text-gray-500"
                    }`}
                  >
                    Contact details
                  </span>
                </div>

                {/* Connector Line 2 */}
                <div className={`flex-1 h-0.5 mx-4 ${isStepCompleted("contact") ? "bg-amber-600" : "bg-gray-300"}`} />

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isStepCurrent("payment")
                        ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <span className="font-semibold">3</span>
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isStepCurrent("payment") ? "text-amber-600" : "text-gray-500"
                    }`}
                  >
                    Payment
                  </span>
                </div>
              </div>
            </div>

            {/* Step 1: Review Cart */}
            <Card className="shadow-sm">
              <div
                className={`p-4 border-l-4 cursor-pointer transition-all duration-200 ${
                  isStepCurrent("cart")
                    ? "border-l-amber-500 bg-amber-50"
                    : isStepCompleted("cart")
                      ? "border-l-teal-600 bg-teal-50"
                      : "border-l-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentStep("cart")}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">1. Review cart</h2>
                  <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </div>
              </div>

              {isStepCurrent("cart") && (
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {state.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-start gap-4 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        {/* Product Image - Fixed container */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-white rounded-lg border flex items-center justify-center p-2">
                            <img
                              src={item.primary_image_url || "/placeholder.svg?height=60&width=60"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          {item.category_name && <p className="text-sm text-gray-600">{item.category_name}</p>}
                          <p className="text-lg font-semibold text-amber-600">${item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity Controls and Remove Button - Mobile Layout */}
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                          {/* Quantity Controls - Compact */}
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              +
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 whitespace-nowrap"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4">
                      <Button
                        onClick={() => handleStepComplete("cart")}
                        className="w-full bg-amber-600 hover:bg-amber-700"
                      >
                        Continue to Contact Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 2: Contact Details */}
            <Card className="shadow-sm">
              <div
                className={`p-4 border-l-4 cursor-pointer transition-all duration-200 ${
                  isStepCurrent("contact")
                    ? "border-l-amber-500 bg-amber-50"
                    : isStepCompleted("contact")
                      ? "border-l-teal-600 bg-teal-50"
                      : "border-l-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentStep("contact")}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">2. Contact details</h2>
                  <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </div>
              </div>

              {isStepCurrent("contact") && (
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={customerInfo.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={customerInfo.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Address *
                      </Label>
                      <Input
                        id="address"
                        required
                        value={customerInfo.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                          City *
                        </Label>
                        <Input
                          id="city"
                          required
                          value={customerInfo.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                          State *
                        </Label>
                        <Input
                          id="state"
                          required
                          value={customerInfo.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="postcode" className="text-sm font-medium text-gray-700">
                        Postcode *
                      </Label>
                      <Input
                        id="postcode"
                        required
                        value={customerInfo.postcode}
                        onChange={(e) => handleInputChange("postcode", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={() => handleStepComplete("contact")}
                        className="w-full bg-amber-600 hover:bg-amber-700"
                        disabled={
                          !customerInfo.firstName ||
                          !customerInfo.lastName ||
                          !customerInfo.email ||
                          !customerInfo.address ||
                          !customerInfo.city ||
                          !customerInfo.state ||
                          !customerInfo.postcode
                        }
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 3: Payment */}
            <Card className="shadow-sm">
              <div
                className={`p-4 border-l-4 ${
                  isStepCurrent("payment") ? "border-l-amber-500 bg-amber-50" : "border-l-gray-300"
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-800">3. Payment</h2>
              </div>

              {isStepCurrent("payment") && (
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Secure Payment with Stripe</h3>
                      <p className="text-gray-600 mb-4">
                        You'll be redirected to Stripe's secure checkout to complete your payment.
                      </p>
                    </div>
                    <Button
                      onClick={handleStripeCheckout}
                      className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-3"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Pay with Stripe"}
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Powered by Stripe • Secure • SSL Encrypted</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Cart Items ({state.itemCount})</h3>
                    <Button variant="outline" size="sm" onClick={() => setCurrentStep("cart")}>
                      Edit cart
                    </Button>
                  </div>

                  <div className="max-h-80 overflow-y-auto mb-6">
                    <div className="space-y-4">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1 flex-shrink-0">
                            <img
                              src={item.primary_image_url || "/placeholder.svg?height=50&width=50"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-sm flex-shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Order summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>
                          Subtotal ({state.itemCount} item{state.itemCount !== 1 ? "s" : ""})
                        </span>
                        <span>${state.total.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>
                            Total ({state.itemCount} item{state.itemCount !== 1 ? "s" : ""})
                          </span>
                          <span className="text-amber-600">${state.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

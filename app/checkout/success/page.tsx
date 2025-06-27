"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import Navigation from "@/components/Navigation"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const handleContinueShopping = () => {
    window.location.href = "/catalog"
  }

  const handleContactSupport = () => {
    window.location.href = "/contact"
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                  <p className="text-gray-600">Thank you for your order. We've received your payment.</p>
                </div>

                {sessionId && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Order Reference:</p>
                    <p className="font-mono text-sm break-all bg-white px-3 py-2 rounded border">{sessionId}</p>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-amber-600">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">What happens next?</span>
                  </div>
                  <div className="text-left space-y-3 max-w-md mx-auto">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        1
                      </div>
                      <p className="text-gray-700">We'll process your order and prepare your coins for shipping</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        2
                      </div>
                      <p className="text-gray-700">You'll receive a confirmation email with tracking information</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        3
                      </div>
                      <p className="text-gray-700">Your coins will be carefully packaged and shipped to you</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleContinueShopping}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Continue Shopping
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleContactSupport}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    Contact Support
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import Link from "next/link"
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600">Your payment was cancelled. No charges have been made to your account.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 font-medium mb-2">What happened?</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• You cancelled the payment process</li>
                  <li>• Your items are still in your cart</li>
                  <li>• You can try again anytime</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link href="/checkout">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Checkout
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/catalog">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

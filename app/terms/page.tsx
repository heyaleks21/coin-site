import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/components/Navigation"
import { FileText, Scale, CreditCard, Truck, Shield, AlertTriangle, Phone, Mail, MapPin } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-6">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 mb-4">Clear terms for a transparent relationship</p>
            <Badge variant="secondary" className="text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Important Notice */}
          <Alert className="mb-8 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Important:</strong> By using our website and services, you agree to these terms. Please read them
              carefully before making any purchases.
            </AlertDescription>
          </Alert>

          {/* Main Content */}
          <div className="grid gap-8">
            {/* Acceptance of Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  By accessing and using the Aussie Coins website, you accept and agree to be bound by the terms and
                  provision of this agreement. These terms apply to all visitors, users, and customers.
                </p>
              </CardContent>
            </Card>

            {/* Use License */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  2. Use License
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Permission is granted to temporarily download one copy of the materials on Aussie Coins' website for
                  personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                  title.
                </p>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3">Under this license you may NOT:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-sm text-red-700">Modify or copy the materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-sm text-red-700">Use for commercial purposes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-sm text-red-700">Reverse engineer software</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-sm text-red-700">Remove copyright notices</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  3. Product Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We strive to provide accurate descriptions and images of our coins. However, we do not warrant that
                  product descriptions or other content is accurate, complete, reliable, current, or error-free.
                </p>
              </CardContent>
            </Card>

            {/* Pricing and Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  4. Pricing and Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-sm">
                        All prices are in Australian Dollars (AUD) and include GST where applicable
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-sm">We reserve the right to change prices without notice</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-sm">Payment is required at the time of purchase</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-sm">We accept major credit cards, PayPal, PayID, and Bank Transfer</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Acceptance & Shipping */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">5. Order Acceptance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Your receipt of an order confirmation does not signify our acceptance of your order, nor does it
                    constitute confirmation of our offer to sell. We reserve the right to accept or decline your order
                    for any reason at any time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="h-4 w-4 text-blue-600" />
                    6. Shipping & Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• We ship within Australia only</li>
                    <li>• Delivery times are estimates and not guaranteed</li>
                    <li>• Risk of loss passes to you upon delivery to carrier</li>
                    <li>• We are not responsible for carrier delays</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Authentication and Grading */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  7. Authentication and Grading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our authentication and grading services are provided based on our professional expertise and industry
                  standards. While we strive for accuracy, grading can be subjective and we cannot guarantee that other
                  grading services will reach the same conclusions.
                </p>
              </CardContent>
            </Card>

            {/* Legal Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">8. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    In no event shall Aussie Coins or its suppliers be liable for any damages (including, without
                    limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                    use or inability to use the materials on our website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">9. Accuracy of Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    The materials appearing on Aussie Coins' website could include technical, typographical, or
                    photographic errors. We do not warrant that any of the materials on its website are accurate,
                    complete, or current.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">10. Modifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Aussie Coins may revise these terms of service at any time without notice. By using this website,
                    you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">11. Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    These terms and conditions are governed by and construed in accordance with the laws of South
                    Australia, Australia, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                    state.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Questions About Our Terms?</CardTitle>
              <p className="text-center text-amber-100">We're here to clarify anything you need to know.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Phone</p>
                  <p className="text-amber-100">1300 COINS (26467)</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Email</p>
                  <p className="text-amber-100">info@aussiecoins.com.au</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Location</p>
                  <p className="text-amber-100">Adelaide, South Australia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/components/Navigation"
import { RotateCcw, AlertCircle, CheckCircle, XCircle, Clock, Package, Phone, Mail, MapPin } from "lucide-react"

export default function ReturnsPolicyPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
              <RotateCcw className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds Policy</h1>
            <p className="text-xl text-gray-600 mb-4">Fair returns for peace of mind</p>
            <Badge variant="secondary" className="text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Important Notice */}
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Important Notice:</strong> Due to the nature of collectible coins and their value, all sales are
              carefully considered. Please read our returns policy carefully before making a purchase.
            </AlertDescription>
          </Alert>

          {/* Quick Reference */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center border-green-200">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">14 Days</h3>
                <p className="text-gray-600 text-sm">Return period from delivery</p>
              </CardContent>
            </Card>
            <Card className="text-center border-blue-200">
              <CardContent className="pt-6">
                <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Original Condition</h3>
                <p className="text-gray-600 text-sm">Items must be unopened & complete</p>
              </CardContent>
            </Card>
            <Card className="text-center border-purple-200">
              <CardContent className="pt-6">
                <RotateCcw className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Easy Process</h3>
                <p className="text-gray-600 text-sm">Contact us first for RMA number</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-8">
            {/* Return Period */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  1. Return Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  You have <strong className="text-green-600">14 days</strong> from the date of delivery to return items
                  for a refund, provided they meet our return conditions outlined below.
                </p>
              </CardContent>
            </Card>

            {/* Improved Eligible vs Non-Eligible Returns */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-green-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    2. We Accept Returns For
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">Items that arrive damaged or defective</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">Items significantly different from description</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">Wrong items sent due to our error</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">Items in original condition with all packaging</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="bg-red-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    3. We Cannot Accept Returns For
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">Items damaged by mishandling after delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">Items without original packaging or certificates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">Custom or personalized items</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">Items returned after 14 days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">Change of mind (unless item is faulty)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Return Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  4. Return Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Contact Us</h4>
                    <p className="text-sm text-gray-600">
                      Get your Return Merchandise Authorization (RMA) number before sending anything back.
                    </p>
                    <div className="mt-3 space-y-1 text-xs text-gray-500">
                      <p>📧 info@aussiecoins.com.au</p>
                      <p>📞 1300 COINS (26467)</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Package Securely</h4>
                    <p className="text-sm text-gray-600">
                      Use original packaging, include all certificates, and mark the RMA number clearly.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Ship with Tracking</h4>
                    <p className="text-sm text-gray-600">
                      Use trackable, insured shipping. We recommend registered post or courier service.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Processing */}
            <Card className="border-l-4 border-l-purple-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  5. Refund Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm">Inspection: 3-5 business days</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm">Refund processing: 5-10 business days</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm">Refund to original payment method</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Important Notes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        <span className="text-sm">Original shipping costs are non-refundable</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        <span className="text-sm">Customer pays return shipping (unless faulty)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Cases */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">6. Damaged or Defective Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-3">If you receive a damaged or defective item:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Contact us immediately upon receipt</li>
                    <li>• Provide photos of the damage or defect</li>
                    <li>• We arrange return shipping at no cost</li>
                    <li>• Full refund or replacement provided</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">7. Authentication Disputes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-3">If you believe an item's authenticity is incorrect:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Contact us within 14 days of delivery</li>
                    <li>• Provide documentation from recognized grading service</li>
                    <li>• We may request independent verification</li>
                    <li>• Resolution based on findings</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Consumer Rights */}
            <Card className="bg-blue-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="h-5 w-5" />
                  8. Your Consumer Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800">
                  Under Australian Consumer Law, you have rights that cannot be excluded. Our returns policy is in
                  addition to these rights, not instead of them.
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Need Help with a Return?</CardTitle>
              <p className="text-center text-green-100">Our team is ready to assist you with any return questions.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Phone</p>
                  <p className="text-green-100">1300 COINS (26467)</p>
                  <p className="text-xs text-green-200 mt-1">Mon-Fri, 9AM-5PM ACST</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Email</p>
                  <p className="text-green-100">info@aussiecoins.com.au</p>
                  <p className="text-xs text-green-200 mt-1">24-48 hour response</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Location</p>
                  <p className="text-green-100">Adelaide, South Australia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

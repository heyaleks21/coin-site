import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"
import { Shield, Eye, Lock, Users, FileText, Phone, Mail, MapPin } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 mb-4">Your privacy is our priority</p>
            <Badge variant="secondary" className="text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8 border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Quick Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                At Aussie Coins, we collect only the information necessary to provide you with excellent service. We
                never sell your personal data, and we use industry-standard security measures to protect your
                information.
              </p>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid gap-8">
            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  1. Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700">
                  At Aussie Coins, we collect information you provide directly to us, such as when you create an
                  account, make a purchase, subscribe to our newsletter, or contact us for support.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3">Personal Information</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Name and contact information</li>
                      <li>• Email address, phone number</li>
                      <li>• Postal address for shipping</li>
                      <li>• Payment information</li>
                      <li>• Account credentials</li>
                      <li>• Purchase history and preferences</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Automatically Collected</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Device information (IP address)</li>
                      <li>• Browser type and operating system</li>
                      <li>• Usage data and click patterns</li>
                      <li>• Pages visited and time spent</li>
                      <li>• Cookies and tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  2. How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Process and fulfill your orders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Provide customer support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Send order updates</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Improve our services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Send marketing communications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Comply with legal obligations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-600" />
                  3. Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                  <p className="text-red-800 font-semibold">
                    We do not sell, trade, or rent your personal information to third parties.
                  </p>
                </div>
                <p className="text-gray-700 mb-4">We may share your information with:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <span className="font-medium">Payment processors</span>
                      <span className="text-gray-600"> (Stripe, PayPal) to process transactions</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <span className="font-medium">Shipping companies</span>
                      <span className="text-gray-600"> to deliver your orders</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <span className="font-medium">Service providers</span>
                      <span className="text-gray-600"> who assist with our operations</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <span className="font-medium">Law enforcement</span>
                      <span className="text-gray-600"> when required by law</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security & Your Rights */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">4. Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                    is 100% secure.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">5. Your Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-3">
                    Under Australian Privacy Principles, you have the right to:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Access your personal information</li>
                    <li>• Correct inaccurate information</li>
                    <li>• Request deletion of your information</li>
                    <li>• Opt-out of marketing communications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Additional Sections */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">6. Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    You can control cookie settings through your browser preferences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">7. Third-Party Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Our website may contain links to third-party websites. We are not responsible for the privacy
                    practices of these external sites.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">8. Policy Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting
                    the new policy on this page with an updated date.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Questions About Your Privacy?</CardTitle>
              <p className="text-center text-blue-100">We're here to help. Contact us anytime.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Phone</p>
                  <p className="text-blue-100">1300 COINS (26467)</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Email</p>
                  <p className="text-blue-100">info@aussiecoins.com.au</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Location</p>
                  <p className="text-blue-100">Adelaide, South Australia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

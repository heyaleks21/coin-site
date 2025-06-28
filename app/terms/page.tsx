import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/Navigation"

export default function TermsOfServicePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
              <p className="text-center text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Aussie Coins website, you accept and agree to be bound by the terms and
                provision of this agreement. These terms apply to all visitors, users, and customers.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Aussie Coins' website for
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title.
              </p>

              <h3>Under this license you may not:</h3>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2>3. Product Information</h2>
              <p>
                We strive to provide accurate descriptions and images of our coins. However, we do not warrant that
                product descriptions or other content is accurate, complete, reliable, current, or error-free.
              </p>

              <h2>4. Pricing and Payment</h2>
              <ul>
                <li>All prices are in Australian Dollars (AUD) and include GST where applicable</li>
                <li>We reserve the right to change prices without notice</li>
                <li>Payment is required at the time of purchase</li>
                <li>We accept Visa, Mastercard, American Express, Apple Pay, PayPal, PayID, and Bank Transfer</li>
              </ul>

              <h2>5. Order Acceptance</h2>
              <p>
                Your receipt of an order confirmation does not signify our acceptance of your order, nor does it
                constitute confirmation of our offer to sell. We reserve the right to accept or decline your order for
                any reason at any time.
              </p>

              <h2>6. Shipping and Delivery</h2>
              <ul>
                <li>We ship within Australia only</li>
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Risk of loss and title for items pass to you upon delivery to the carrier</li>
                <li>We are not responsible for delays caused by shipping carriers</li>
              </ul>

              <h2>7. Authentication and Grading</h2>
              <p>
                Our authentication and grading services are provided based on our professional expertise and industry
                standards. While we strive for accuracy, grading can be subjective and we cannot guarantee that other
                grading services will reach the same conclusions.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall Aussie Coins or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on our website.
              </p>

              <h2>9. Accuracy of Materials</h2>
              <p>
                The materials appearing on Aussie Coins' website could include technical, typographical, or photographic
                errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
              </p>

              <h2>10. Modifications</h2>
              <p>
                Aussie Coins may revise these terms of service at any time without notice. By using this website, you
                are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of South Australia,
                Australia, and you irrevocably submit to the exclusive jurisdiction of the courts in that state.
              </p>

              <h2>12. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p>
                  <strong>Aussie Coins</strong>
                </p>
                <p>Adelaide, South Australia</p>
                <p>Phone: 1300 COINS (26467)</p>
                <p>Email: info@aussiecoins.com.au</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

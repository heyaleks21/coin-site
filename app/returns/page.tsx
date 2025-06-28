import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function ReturnsPolicyPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Returns & Refunds Policy</CardTitle>
              <p className="text-center text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-blue-800 font-semibold mb-2">Important Notice</h3>
                    <p className="text-blue-700 text-sm">
                      Due to the nature of collectible coins and their value, all sales are carefully considered. Please
                      read our returns policy carefully before making a purchase.
                    </p>
                  </div>
                </div>
              </div>

              <h2>1. Return Period</h2>
              <p>
                You have <strong>14 days</strong> from the date of delivery to return items for a refund, provided they
                meet our return conditions outlined below.
              </p>

              <h2>2. Eligible Returns</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-green-800 font-semibold mb-2">We Accept Returns For:</h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>Items that arrive damaged or defective</li>
                      <li>Items that are significantly different from their description</li>
                      <li>Wrong items sent due to our error</li>
                      <li>Items in original condition with all packaging and certificates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2>3. Non-Returnable Items</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-800 font-semibold mb-2">We Cannot Accept Returns For:</h3>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>Items damaged by mishandling after delivery</li>
                      <li>Items without original packaging or certificates of authenticity</li>
                      <li>Custom or personalized items</li>
                      <li>Items returned after 14 days</li>
                      <li>Change of mind (unless item is faulty or misrepresented)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2>4. Return Process</h2>
              <h3>Step 1: Contact Us</h3>
              <p>
                Before returning any item, you must contact us first to obtain a Return Merchandise Authorization (RMA)
                number:
              </p>
              <ul>
                <li>Email: info@aussiecoins.com.au</li>
                <li>Phone: 1300 COINS (26467)</li>
                <li>Include your order number and reason for return</li>
              </ul>

              <h3>Step 2: Package Your Return</h3>
              <ul>
                <li>Use the original packaging when possible</li>
                <li>Include all certificates of authenticity and documentation</li>
                <li>Pack securely to prevent damage during transit</li>
                <li>Include the RMA number clearly marked on the package</li>
              </ul>

              <h3>Step 3: Ship Your Return</h3>
              <ul>
                <li>Use a trackable shipping method with insurance</li>
                <li>Customer is responsible for return shipping costs (unless item is faulty)</li>
                <li>We recommend using registered post or courier service</li>
              </ul>

              <h2>5. Refund Processing</h2>
              <p>Once we receive and inspect your returned item:</p>
              <ul>
                <li>Inspection will be completed within 3-5 business days</li>
                <li>Approved refunds will be processed within 5-10 business days</li>
                <li>Refunds will be issued to the original payment method</li>
                <li>Original shipping costs are non-refundable (unless item is faulty)</li>
              </ul>

              <h2>6. Exchanges</h2>
              <p>
                We do not offer direct exchanges. If you need a different item, please return the original item for a
                refund and place a new order.
              </p>

              <h2>7. Damaged or Defective Items</h2>
              <p>If you receive a damaged or defective item:</p>
              <ul>
                <li>Contact us immediately upon receipt</li>
                <li>Provide photos of the damage or defect</li>
                <li>We will arrange return shipping at no cost to you</li>
                <li>Full refund or replacement will be provided</li>
              </ul>

              <h2>8. Authentication Disputes</h2>
              <p>If you believe an item's authenticity or grading is incorrect:</p>
              <ul>
                <li>Contact us within 14 days of delivery</li>
                <li>Provide documentation from a recognized grading service</li>
                <li>We will review the case and may request independent verification</li>
                <li>Resolution will be provided based on findings</li>
              </ul>

              <h2>9. Consumer Rights</h2>
              <p>
                Under Australian Consumer Law, you have rights that cannot be excluded. Our returns policy is in
                addition to these rights, not instead of them.
              </p>

              <h2>10. Contact Us</h2>
              <p>For any questions about returns or refunds, please contact us:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p>
                  <strong>Aussie Coins</strong>
                </p>
                <p>Adelaide, South Australia</p>
                <p>Phone: 1300 COINS (26467)</p>
                <p>Email: info@aussiecoins.com.au</p>
                <p>Business Hours: Monday - Friday, 9:00 AM - 5:00 PM ACST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

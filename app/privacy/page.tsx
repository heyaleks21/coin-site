import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/Navigation"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
              <p className="text-center text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                At Aussie Coins, we collect information you provide directly to us, such as when you create an account,
                make a purchase, subscribe to our newsletter, or contact us for support.
              </p>

              <h3>Personal Information</h3>
              <ul>
                <li>Name and contact information (email address, phone number, postal address)</li>
                <li>Payment information (credit card details, PayPal, PayID information)</li>
                <li>Account credentials (username, password)</li>
                <li>Purchase history and preferences</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent on site, click patterns)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send you updates about your orders and account</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                with:
              </p>
              <ul>
                <li>Payment processors (Stripe, PayPal) to process transactions</li>
                <li>Shipping companies to deliver your orders</li>
                <li>Service providers who assist with our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure.
              </p>

              <h2>5. Your Rights</h2>
              <p>Under Australian Privacy Principles, you have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
              </ul>

              <h2>6. Cookies</h2>
              <p>
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You
                can control cookie settings through your browser preferences.
              </p>

              <h2>7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                of these external sites.
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page with an updated date.
              </p>

              <h2>9. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at:</p>
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

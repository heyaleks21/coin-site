import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Shield, Truck, Award } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">Aussie Coins</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Australia's premier destination for rare and collectible coins. Over 30 years of numismatic expertise
                and passion for Australian coinage.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Adelaide, South Australia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>1300 COINS (26467)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>info@aussiecoins.com.au</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Coin Catalog
                </Link>
              </li>
              <li>
                <Link href="/appraisal" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Coin Appraisal
                </Link>
              </li>
              <li>
                <Link href="/sell-to-us" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Sell to Us
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Expert Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Our Services</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Professional Grading</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Authentication</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Secure Shipping</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Flexible Payment</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2 text-amber-400">Live Streaming</h5>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://tiktok.com/@aussiecoins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                  >
                    Coin Roll Noodling
                  </a>
                </li>
                <li>
                  <Link
                    href="/catalog?category=lucky-dips"
                    className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                  >
                    Lucky Dips
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Stay Connected</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 text-sm mb-3">
                  Subscribe to our newsletter for coin collecting tips and exclusive offers.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                  <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              <div>
                <p className="text-gray-300 text-sm mb-3">Follow us on social media</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/aussiecoins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/aussiecoins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://tiktok.com/@aussiecoins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-xs font-bold">TT</span>
                  </a>
                  <a
                    href="https://twitter.com/aussiecoins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">© 2024 Aussie Coins. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-amber-400 transition-colors">
                Returns Policy
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">Secure payments powered by Stripe</div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <CreditCard className="w-4 h-4" />
                <span>Visa • Mastercard • American Express • PayPal • Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

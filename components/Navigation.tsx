"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getCategories, type Category } from "@/lib/supabase-admin"
import { useCart } from "@/contexts/CartContext"

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isCatalogExpanded, setIsCatalogExpanded] = React.useState(false)
  const [isServicesExpanded, setIsServicesExpanded] = React.useState(false)
  const [categories, setCategories] = React.useState<Category[]>([])
  const { state } = useCart()

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsCatalogExpanded(false)
    setIsServicesExpanded(false)
  }, [pathname])

  // Load categories
  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }
    loadCategories()
  }, [])

  const isServicePage = ["/appraisal", "/authentication", "/consultation"].includes(pathname)

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">AC</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Aussie Coins</h1>
              <p className="text-xs text-amber-600 font-medium hidden sm:block">Premium Australian Numismatics</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "font-medium transition-colors",
                pathname === "/" ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-700 hover:text-amber-600",
              )}
            >
              Home
            </Link>

            {/* Catalog with Categories Dropdown */}
            <div className="relative group">
              <Link
                href="/catalog"
                className={cn(
                  "font-medium transition-colors flex items-center",
                  pathname === "/catalog"
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-700 hover:text-amber-600",
                )}
              >
                Catalog
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/catalog"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors font-medium"
                  >
                    View All Products
                  </Link>
                  <div className="border-t my-2"></div>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalog?category=${category.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={cn(
                  "text-gray-700 hover:text-amber-600 transition-colors font-medium flex items-center",
                  isServicePage ? "text-amber-600 border-b-2 border-amber-600" : "",
                )}
              >
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/appraisal"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    Coin Appraisal
                  </Link>
                  <Link
                    href="/authentication"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    Authentication
                  </Link>
                  <Link
                    href="/consultation"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    Expert Consultation
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className={cn(
                "font-medium transition-colors",
                pathname === "/about"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-700 hover:text-amber-600",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "font-medium transition-colors",
                pathname === "/contact"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-700 hover:text-amber-600",
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/sell-to-us">
              <Button
                variant="outline"
                className="hidden md:flex border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200 bg-transparent"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                Sell to Us
              </Button>
            </Link>

            {/* Checkout Button */}
            <Link href="/checkout">
              <Button
                variant="outline"
                className="relative border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200 bg-transparent"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>Cart</span>
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t mt-4 pt-4 max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link
                href="/"
                className={cn(
                  "font-medium transition-colors",
                  pathname === "/" ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Collapsible Catalog Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsCatalogExpanded(!isCatalogExpanded)}
                  className={cn(
                    "font-medium transition-colors flex items-center justify-between w-full text-left",
                    pathname === "/catalog" ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                  )}
                >
                  Catalog
                  {isCatalogExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {isCatalogExpanded && (
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/catalog"
                      className="block text-gray-600 hover:text-amber-600 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Products
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/catalog?category=${category.id}`}
                        className="block text-gray-600 hover:text-amber-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Collapsible Services Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className={cn(
                    "font-medium transition-colors flex items-center justify-between w-full text-left",
                    isServicePage ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                  )}
                >
                  Services
                  {isServicesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {isServicesExpanded && (
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/appraisal"
                      className={cn(
                        "block transition-colors",
                        pathname === "/appraisal" ? "text-amber-600" : "text-gray-600 hover:text-amber-600",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Coin Appraisal
                    </Link>
                    <Link
                      href="/authentication"
                      className={cn(
                        "block transition-colors",
                        pathname === "/authentication" ? "text-amber-600" : "text-gray-600 hover:text-amber-600",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Authentication
                    </Link>
                    <Link
                      href="/consultation"
                      className={cn(
                        "block transition-colors",
                        pathname === "/consultation" ? "text-amber-600" : "text-gray-600 hover:text-amber-600",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Expert Consultation
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={cn(
                  "font-medium transition-colors",
                  pathname === "/about" ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "font-medium transition-colors",
                  pathname === "/contact" ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/sell-to-us"
                className={cn(
                  "font-medium transition-colors",
                  pathname === "/sell-to-us" ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sell to Us
              </Link>
              <Link
                href="/checkout"
                className={cn(
                  "font-medium transition-colors flex items-center",
                  pathname === "/checkout" ? "text-amber-600" : "text-gray-700 hover:text-amber-600",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({state.itemCount})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

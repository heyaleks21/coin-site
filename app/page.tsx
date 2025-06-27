"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Play, Users } from "lucide-react"
import HeroSlideshow from "@/components/HeroSlideshow"
import Navigation from "@/components/Navigation"
import { getProducts, getCategories, type Product, type Category } from "@/lib/supabase-admin"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load featured products
        const products = await getProducts()
        let featured = products.filter((product) => product.is_featured && product.is_active)
        if (featured.length === 0) {
          featured = products.filter((product) => product.is_active).slice(0, 4)
        } else {
          featured = featured.slice(0, 4)
        }
        setFeaturedProducts(featured)
      } catch (error) {
        console.error("Error loading featured products:", error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }

      try {
        // Load categories
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading categories:", error)
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }
    loadData()
  }, [])

  // Find category IDs
  // Assuming the category names in your database are "Coin Roll Noodling" and "Lucky Dip"
  const coinRollNoodlingCategory = categories.find((cat) => cat.name === "Coin Roll Noodling")
  const luckyDipCategory = categories.find((cat) => cat.name === "Lucky Dip") // Changed from "Lucky Dips"

  const coinRollNoodlingCategoryId = coinRollNoodlingCategory ? coinRollNoodlingCategory.id.toString() : ""
  const luckyDipCategoryId = luckyDipCategory ? luckyDipCategory.id.toString() : ""

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Compact Live Stream Section */}
      <section className="py-6 px-4 bg-gradient-to-r from-slate-800 to-purple-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
            {/* Live Stream Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-sm">LIVE</span>
                <Users className="w-4 h-4 text-white" />
                <span className="text-white text-sm">1,247</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                <Link
                  href="https://www.tiktok.com/@aussiecoins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Live TikTok Stream
                </Link>
              </h2>
              <p className="text-gray-300 text-sm mb-4">Watch live coin discoveries</p>
              <Link href="https://www.tiktok.com/@aussiecoins" target="_blank" rel="noopener noreferrer">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Now
                </Button>
              </Link>
            </div>

            {/* Coin Roll Noodling */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/coin-roll.svg"
                    alt="Coin Roll"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-white">Coin Roll Noodling</h3>
                    <p className="text-xs text-gray-300">From $5</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 text-sm"
                  onClick={() => {
                    if (coinRollNoodlingCategoryId) {
                      sessionStorage.setItem("preSelectedCategory", coinRollNoodlingCategoryId)
                    }
                    window.location.href = "/catalog"
                  }}
                >
                  Sponsor Roll
                </Button>
              </CardContent>
            </Card>

            {/* Lucky Dips */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/red-poppy.jpg"
                    alt="Lucky Dip"
                    width={40}
                    height={40}
                    className="object-contain rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-white">Lucky Dips</h3>
                    <p className="text-xs text-gray-300">From $10</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 text-sm"
                  onClick={() => {
                    if (luckyDipCategoryId) {
                      sessionStorage.setItem("preSelectedCategory", luckyDipCategoryId)
                    }
                    window.location.href = "/catalog"
                  }}
                >
                  Get Lucky Dip
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Coins */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products & Services</h2>
            <p className="text-xl text-gray-600">Handpicked treasures from our collection</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="flex justify-center">
              <div
                className={`${
                  featuredProducts.length === 1
                    ? "flex justify-center max-w-sm"
                    : featuredProducts.length === 2
                      ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl"
                      : featuredProducts.length === 3
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl [&>*:nth-child(3)]:md:col-start-1 [&>*:nth-child(3)]:md:col-end-3 [&>*:nth-child(3)]:md:justify-self-center [&>*:nth-child(3)]:lg:col-start-auto [&>*:nth-child(3)]:lg:col-end-auto [&>*:nth-child(3)]:lg:justify-self-auto"
                        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl"
                }`}
              >
                {featuredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg w-full max-w-sm justify-self-center"
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg bg-white">
                        <div className="w-full h-64 flex items-center justify-center p-4">
                          <Image
                            src={product.primary_image_url || "/placeholder.svg?height=300&width=300"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=300&width=300&text=No+Image"
                            }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-lg mb-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="mb-4">
                        {product.year && `${product.year} • `}
                        {product.condition && `${product.condition} • `}
                        {product.categories?.name || "Collectible"}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-600">${product.price.toLocaleString()}</span>
                        <Link href={`/product/${product.id}`}>
                          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Award className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No featured products yet</h3>
              <p className="text-gray-600 mb-4">Add some products in the admin dashboard and mark them as featured</p>
              <Link href="/admin">
                <Button className="bg-amber-600 hover:bg-amber-700">Go to Admin Dashboard</Button>
              </Link>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TikTok CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-purple-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-bold">LIVE NOW</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Watch Live Coin Roll Noodling</h2>
          <p className="text-gray-300 mb-8 text-lg">Join thousands watching live coin discoveries on TikTok</p>
          <Link href="https://www.tiktok.com/@aussiecoins" target="_blank" rel="noopener noreferrer">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5" />
              Watch Live on TikTok
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

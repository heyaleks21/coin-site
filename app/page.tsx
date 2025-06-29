"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Play, Users } from "lucide-react"
import HeroSlideshow from "@/components/HeroSlideshow"
import Navigation from "@/components/Navigation"
import { getProducts, getCategories, type Product, type Category } from "@/lib/supabase-admin"

export default function HomePage() {
  const router = useRouter()
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
  const luckyDipCategory = categories.find((cat) => cat.name === "Lucky Dip")

  const coinRollNoodlingCategoryId = coinRollNoodlingCategory ? coinRollNoodlingCategory.id.toString() : ""
  const luckyDipCategoryId = luckyDipCategory ? luckyDipCategory.id.toString() : ""

  const handleSponsorRollClick = () => {
    if (coinRollNoodlingCategoryId) {
      sessionStorage.setItem("preSelectedCategory", coinRollNoodlingCategoryId)
    }
    router.push("/catalog")
  }

  const handleLuckyDipClick = () => {
    if (luckyDipCategoryId) {
      sessionStorage.setItem("preSelectedCategory", luckyDipCategoryId)
    }
    router.push("/catalog")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Enhanced Services & Giveaways Section */}
      <section className="py-8 px-4 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900">
        <div className="container mx-auto">
          {/* Live Stream Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-sm">LIVE</span>
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-sm">1,247</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              <Link
                href="https://www.tiktok.com/@aussiecoins"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Live TikTok Stream
              </Link>
            </h2>
            <p className="text-gray-300 mb-4">Watch live coin discoveries & participate in giveaways</p>
            <Link href="https://www.tiktok.com/@aussiecoins" target="_blank" rel="noopener noreferrer">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto">
                <Play className="w-5 h-5" />
                Watch Live Now
              </Button>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Coin Roll Noodling */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Image
                      src="/images/coin-roll.svg"
                      alt="Coin Roll"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Coin Roll Noodling</h3>
                    <p className="text-xs text-gray-300">Starting from $5</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">Sponsor a coin roll and watch it get opened live on stream</p>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 font-semibold"
                  onClick={handleSponsorRollClick}
                >
                  Sponsor Roll
                </Button>
              </CardContent>
            </Card>

            {/* Lucky Dips */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Image
                      src="/images/red-poppy.jpg"
                      alt="Lucky Dip"
                      width={24}
                      height={24}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Lucky Dips</h3>
                    <p className="text-xs text-gray-300">Starting from $10</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Mystery coin packages with guaranteed value and potential treasures
                </p>
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 font-semibold"
                  onClick={handleLuckyDipClick}
                >
                  Get Lucky Dip
                </Button>
              </CardContent>
            </Card>

            {/* Coin Giveaway Tickets */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Giveaway Tickets</h3>
                    <p className="text-xs text-gray-300">$2 per ticket</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">Enter weekly coin giveaways with rare and valuable prizes</p>
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 font-semibold"
                  onClick={() => router.push("/giveaways")}
                >
                  Buy Tickets
                </Button>
              </CardContent>
            </Card>

            {/* VIP Subscription */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-purple-400/30 text-white hover:from-purple-500/25 hover:to-pink-500/25 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  VIP
                </span>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">VIP Club</h3>
                    <p className="text-xs text-gray-300">$19.99/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Monthly lucky dip + exclusive giveaway entries + early access
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 font-semibold"
                  onClick={() => router.push("/vip-club")}
                >
                  Join VIP Club
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <p className="text-gray-300 text-sm mb-4">
              🎁 New giveaways every week • 📦 Monthly VIP packages • 🏆 Exclusive member benefits
            </p>
            <div className="flex justify-center items-center">
              <Button
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                onClick={() => router.push("/catalog")}
              >
                View All Products
              </Button>
            </div>
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

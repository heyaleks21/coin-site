"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ShoppingCart } from "lucide-react"
import Navigation from "@/components/Navigation"
import { getProducts, getCategories, type Product, type Category } from "@/lib/supabase-admin"
import { useCart } from "@/contexts/CartContext"
import { useSearchParams } from "next/navigation"

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const { addToCart } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])

        // Filter only active products
        const activeProducts = productsData.filter((product) => product.is_active)
        setProducts(activeProducts)
        setCategories(categoriesData)

        // Check for URL parameter or sessionStorage for pre-selected category
        const urlCategory = searchParams.get("category")
        const sessionCategory = typeof window !== "undefined" ? sessionStorage.getItem("preSelectedCategory") : null

        if (urlCategory) {
          setSelectedCategory(urlCategory)
        } else if (sessionCategory) {
          setSelectedCategory(sessionCategory)
          // Clean up sessionStorage after use
          sessionStorage.removeItem("preSelectedCategory")
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [searchParams])

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.year?.toString().includes(searchTerm)

      const matchesCategory = selectedCategory === "all" || product.category_id?.toString() === selectedCategory

      const matchesPriceRange = (() => {
        if (priceRange === "all") return true
        const price = product.price
        switch (priceRange) {
          case "0-50":
            return price <= 50
          case "51-100":
            return price > 50 && price <= 100
          case "101-500":
            return price > 100 && price <= 500
          case "501-1000":
            return price > 500 && price <= 1000
          case "1000+":
            return price > 1000
          default:
            return true
        }
      })()

      return matchesSearch && matchesCategory && matchesPriceRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "year-new":
          return (b.year || 0) - (a.year || 0)
        case "year-old":
          return (a.year || 0) - (b.year || 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.primary_image_url || "/placeholder.svg?height=100&width=100",
      quantity: 1,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Catalog</h1>
          <p className="text-xl text-gray-600">Discover our collection of rare and collectible coins</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-50">$0 - $50</SelectItem>
                <SelectItem value="51-100">$51 - $100</SelectItem>
                <SelectItem value="101-500">$101 - $500</SelectItem>
                <SelectItem value="501-1000">$501 - $1,000</SelectItem>
                <SelectItem value="1000+">$1,000+</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="year-new">Year (Newest First)</SelectItem>
                <SelectItem value="year-old">Year (Oldest First)</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setPriceRange("all")
                setSortBy("name")
              }}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="ml-2">
                {categories.find((cat) => cat.id.toString() === selectedCategory)?.name}
              </Badge>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
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
                    {product.is_featured && (
                      <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">Featured</Badge>
                    )}
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
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-600">${product.price.toLocaleString()}</span>
                    {product.stock_quantity !== undefined && product.stock_quantity <= 5 && (
                      <Badge variant="destructive">Only {product.stock_quantity} left</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/product/${product.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-amber-600 hover:bg-amber-700 flex items-center gap-1"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setPriceRange("all")
                setSortBy("name")
              }}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

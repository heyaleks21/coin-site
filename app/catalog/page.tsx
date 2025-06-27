"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, ShoppingCart, Plus, Minus, Check, ArrowRight, Grid3X3, List } from "lucide-react"
import { getProducts, getCategories, type Product, type Category } from "@/lib/supabase-admin"
import { useCart } from "@/contexts/CartContext"
import Navigation from "@/components/Navigation"

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Cart dialog state
  const [cartDialogOpen, setCartDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
      setProducts(productsData.filter((product) => product.is_active))
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setCartDialogOpen(true)
  }

  const handleAddToCart = () => {
    if (!selectedProduct) return

    // Add items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        primary_image_url: selectedProduct.primary_image_url,
        category_name: selectedProduct.categories?.name,
      })
    }

    setCartDialogOpen(false)
    setShowConfirmation(true)

    // Hide confirmation after 5 seconds (increased from 3)
    setTimeout(() => {
      setShowConfirmation(false)
    }, 5000)
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || product.category_id?.toString() === selectedCategory
      const matchesPrice = (() => {
        if (priceRange === "all") return true
        if (priceRange === "under-100") return product.price < 100
        if (priceRange === "100-500") return product.price >= 100 && product.price <= 500
        if (priceRange === "500-1000") return product.price >= 500 && product.price <= 1000
        if (priceRange === "over-1000") return product.price > 1000
        return true
      })()
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      return 0
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Coin Catalog</h1>
              <p className="text-gray-600 mt-1">Discover our premium collection of Australian coins</p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Always visible */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
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
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-100">Under $100</SelectItem>
                      <SelectItem value="100-500">$100 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="over-1000">Over $1,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button */}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setPriceRange("all")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setPriceRange("all")
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    // Grid View
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
                      <div className="relative overflow-hidden rounded-t-lg bg-white">
                        <div className="w-full h-64 flex items-center justify-center p-4">
                          <Image
                            src={product.primary_image_url || "/placeholder.svg?height=300&width=300&text=No+Image"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=300&width=300&text=No+Image"
                            }}
                          />
                        </div>
                        {product.stock_quantity === 0 && (
                          <Badge variant="secondary" className="absolute top-2 right-2">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.categories?.name || "Uncategorized"}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        {product.description && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-amber-600">${product.price.toLocaleString()}</span>
                            {product.year && <p className="text-sm text-gray-500">Year: {product.year}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/product/${product.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleAddToCartClick(product)}
                            className="flex-1 bg-amber-600 hover:bg-amber-700"
                            disabled={product.stock_quantity === 0}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // List View
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg border">
                              <Image
                                src={product.primary_image_url || "/placeholder.svg?height=100&width=100&text=No+Image"}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=100&width=100&text=No+Image"
                                }}
                              />
                            </div>
                            {product.stock_quantity === 0 && (
                              <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div className="flex-1">
                                <div className="mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {product.categories?.name || "Uncategorized"}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                {product.description && (
                                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                                )}
                                {product.year && <p className="text-sm text-gray-500">Year: {product.year}</p>}
                              </div>
                              <div className="flex flex-col md:items-end gap-2">
                                <span className="text-2xl font-bold text-amber-600">
                                  ${product.price.toLocaleString()}
                                </span>
                                <div className="flex gap-2">
                                  <Link href={`/product/${product.id}`}>
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                  </Link>
                                  <Button
                                    onClick={() => handleAddToCartClick(product)}
                                    size="sm"
                                    className="bg-amber-600 hover:bg-amber-700"
                                    disabled={product.stock_quantity === 0}
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={cartDialogOpen} onOpenChange={setCartDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogDescription>Choose the quantity you'd like to add to your cart.</DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={selectedProduct.primary_image_url || "/placeholder.svg?height=80&width=80&text=No+Image"}
                  alt={selectedProduct.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600">${selectedProduct.price.toLocaleString()}</p>
                  {selectedProduct.categories?.name && (
                    <Badge variant="outline" className="text-xs mt-1">
                      {selectedProduct.categories.name}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                    max={selectedProduct.stock_quantity || 999}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(selectedProduct.stock_quantity || 999, quantity + 1))}
                    disabled={quantity >= (selectedProduct.stock_quantity || 999)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Total: ${(selectedProduct.price * quantity).toLocaleString()}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCartDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart} className="bg-amber-600 hover:bg-amber-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Success Confirmation with Go to Cart button */}
      {showConfirmation && (
        <div className="fixed bottom-4 right-4 bg-amber-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4 z-50 max-w-sm">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">Added to cart successfully!</span>
          </div>
          <Link href="/checkout">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-gray-100 flex-shrink-0"
              onClick={() => setShowConfirmation(false)}
            >
              Go to Cart
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

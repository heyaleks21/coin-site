"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ShoppingCart, Plus, Minus, Check, ArrowRight, Shield, Truck } from "lucide-react"
import { getProducts, type Product } from "@/lib/supabase-admin"
import { useCart } from "@/contexts/CartContext"
import Navigation from "@/components/Navigation"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  // Cart dialog state
  const [cartDialogOpen, setCartDialogOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const products = await getProducts()
      const foundProduct = products.find((p) => p.id === Number.parseInt(productId))

      if (foundProduct) {
        setProduct(foundProduct)

        // Get related products from same category
        const related = products
          .filter((p) => p.id !== foundProduct.id && p.category_id === foundProduct.category_id && p.is_active)
          .slice(0, 4)
        setRelatedProducts(related)
      }
    } catch (error) {
      console.error("Error loading product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCartClick = () => {
    setQuantity(1)
    setCartDialogOpen(true)
  }

  const handleAddToCart = () => {
    if (!product) return

    // Add items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        primary_image_url: product.primary_image_url,
        category_name: product.categories?.name,
      })
    }

    setCartDialogOpen(false)
    setShowConfirmation(true)

    // Hide confirmation after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 5000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/catalog">
              <Button className="bg-amber-600 hover:bg-amber-700">Browse Catalog</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Prepare images array (primary + additional)
  const allImages = [product.primary_image_url, ...(product.additional_images || [])].filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-amber-600">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* 1. Category Badge */}
          <div>
            <Badge variant="outline" className="mb-2">
              {product.categories?.name || "Uncategorized"}
            </Badge>
          </div>

          {/* 2. Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>

          {/* 3. Cost */}
          <div>
            <div className="text-4xl font-bold text-amber-600">${product.price.toLocaleString()}</div>
          </div>

          {/* 4. Product Images */}
          <div className="space-y-4">
            <div className="h-80 relative overflow-hidden rounded-lg bg-white shadow-lg flex items-center justify-center p-4">
              <Image
                src={allImages[selectedImage] || "/placeholder.svg?height=600&width=600&text=No+Image"}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=600&width=600&text=No+Image"
                }}
              />
              {product.stock_quantity === 0 && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all flex items-center justify-center bg-white p-1 ${
                      selectedImage === index ? "border-amber-600" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=80&width=80"}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Add to Cart Box */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <Button
                onClick={handleAddToCartClick}
                className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-3"
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 pt-4 border-t">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Authenticated</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Fast Shipping</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. Description */}
          {product.description && (
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          )}

          {/* 7. Product Specifications */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Product Specifications</h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {product.year && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Year:</span>
                    <span className="text-gray-900">{product.year}</span>
                  </div>
                )}
                {product.condition && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Condition:</span>
                    <span className="text-gray-900">{product.condition}</span>
                  </div>
                )}
                {product.rarity && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Rarity:</span>
                    <span className="text-gray-900">{product.rarity}</span>
                  </div>
                )}
                {product.metal && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Metal:</span>
                    <span className="text-gray-900">{product.metal}</span>
                  </div>
                )}
                {product.denomination && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Denomination:</span>
                    <span className="text-gray-900">{product.denomination}</span>
                  </div>
                )}
                {product.mint_mark && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Mint Mark:</span>
                    <span className="text-gray-900">{product.mint_mark}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Weight:</span>
                    <span className="text-gray-900">{product.weight}g</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Country:</span>
                  <span className="text-gray-900">{product.country}</span>
                </div>

                {/* Set Information */}
                {product.set_type && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Set Type:</span>
                    <span className="text-gray-900">{product.set_type}</span>
                  </div>
                )}
                {product.set_size && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Set Size:</span>
                    <span className="text-gray-900">{product.set_size} items</span>
                  </div>
                )}

                {/* Stock Information */}
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Stock:</span>
                  <span
                    className={`font-medium ${
                      product.stock_quantity === 0
                        ? "text-red-600"
                        : product.stock_quantity < 5
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {product.stock_quantity === 0
                      ? "Out of stock"
                      : product.stock_quantity < 5
                        ? `${product.stock_quantity} left (Low stock)`
                        : `${product.stock_quantity} in stock`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Images and Specifications */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="h-80 relative overflow-hidden rounded-lg bg-white shadow-lg flex items-center justify-center p-4">
                <Image
                  src={allImages[selectedImage] || "/placeholder.svg?height=600&width=600&text=No+Image"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=600&width=600&text=No+Image"
                  }}
                />
                {product.stock_quantity === 0 && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all flex items-center justify-center bg-white p-1 ${
                        selectedImage === index ? "border-amber-600" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg?height=80&width=80"}
                        alt={`${product.name} view ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Specifications */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Product Specifications</h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {product.year && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Year:</span>
                      <span className="text-gray-900">{product.year}</span>
                    </div>
                  )}
                  {product.condition && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Condition:</span>
                      <span className="text-gray-900">{product.condition}</span>
                    </div>
                  )}
                  {product.rarity && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Rarity:</span>
                      <span className="text-gray-900">{product.rarity}</span>
                    </div>
                  )}
                  {product.metal && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Metal:</span>
                      <span className="text-gray-900">{product.metal}</span>
                    </div>
                  )}
                  {product.denomination && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Denomination:</span>
                      <span className="text-gray-900">{product.denomination}</span>
                    </div>
                  )}
                  {product.mint_mark && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Mint Mark:</span>
                      <span className="text-gray-900">{product.mint_mark}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Weight:</span>
                      <span className="text-gray-900">{product.weight}g</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Country:</span>
                    <span className="text-gray-900">{product.country}</span>
                  </div>

                  {/* Set Information */}
                  {product.set_type && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Set Type:</span>
                      <span className="text-gray-900">{product.set_type}</span>
                    </div>
                  )}
                  {product.set_size && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Set Size:</span>
                      <span className="text-gray-900">{product.set_size} items</span>
                    </div>
                  )}

                  {/* Stock Information */}
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-700">Stock:</span>
                    <span
                      className={`font-medium ${
                        product.stock_quantity === 0
                          ? "text-red-600"
                          : product.stock_quantity < 5
                            ? "text-amber-600"
                            : "text-green-600"
                      }`}
                    >
                      {product.stock_quantity === 0
                        ? "Out of stock"
                        : product.stock_quantity < 5
                          ? `${product.stock_quantity} left (Low stock)`
                          : `${product.stock_quantity} in stock`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.categories?.name || "Uncategorized"}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="text-4xl font-bold text-amber-600 mb-4">${product.price.toLocaleString()}</div>
            </div>

            {/* Description */}
            {product.description && (
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 space-y-4">
                <Button
                  onClick={handleAddToCartClick}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-3"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>Authenticated</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Fast Shipping</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow duration-200">
                  <div className="h-64 relative overflow-hidden rounded-t-lg flex items-center justify-center bg-white p-4">
                    <Image
                      src={relatedProduct.primary_image_url || "/placeholder.svg?height=300&width=300&text=No+Image"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600">${relatedProduct.price.toLocaleString()}</span>
                      <Link href={`/product/${relatedProduct.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={cartDialogOpen} onOpenChange={setCartDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogDescription>Choose the quantity you'd like to add to your cart.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src={product.primary_image_url || "/placeholder.svg?height=80&width=80&text=No+Image"}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">${product.price.toLocaleString()}</p>
                {product.categories?.name && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {product.categories.name}
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
                  max={product.stock_quantity || 999}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock_quantity || 999, quantity + 1))}
                  disabled={quantity >= (product.stock_quantity || 999)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">Total: ${(product.price * quantity).toLocaleString()}</p>
            </div>
          </div>

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

      {/* Success Confirmation */}
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

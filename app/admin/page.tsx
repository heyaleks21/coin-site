"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Trash2, Edit, Plus, Upload, X, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import {
  getProducts,
  getCategories,
  getHeroSlides,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  uploadProductImage,
  uploadHeroImage,
  deleteProductImage,
  type Product,
  type Category,
  type HeroSlide,
} from "@/lib/supabase-admin"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isHeroSlideDialogOpen, setIsHeroSlideDialogOpen] = useState(false)
  const [uploadingImages, setUploadingImages] = useState<{ [key: string]: boolean }>({})

  // Form states
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock_quantity: "",
    sku: "",
    weight: "",
    dimensions: "",
    year: "",
    mint_mark: "",
    condition: "",
    rarity: "",
    metal: "",
    denomination: "",
    country: "Australia",
    set_size: "",
    set_type: "",
    primary_image_url: "",
    additional_images: [] as string[],
    slug: "",
    is_featured: false,
    is_active: true,
  })

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    slug: "",
  })

  const [heroSlideForm, setHeroSlideForm] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    price: "",
    coins: "",
    years: "",
    custom_link: "",
    is_active: true,
    display_order: 1,
    slide_type: "manual" as "manual" | "product",
    product_id: null as number | null,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsData, categoriesData, heroSlidesData] = await Promise.all([
        getProducts(),
        getCategories(),
        getHeroSlides(),
      ])
      setProducts(productsData)
      setCategories(categoriesData)
      setHeroSlides(heroSlidesData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      category_id: "",
      stock_quantity: "",
      sku: "",
      weight: "",
      dimensions: "",
      year: "",
      mint_mark: "",
      condition: "",
      rarity: "",
      metal: "",
      denomination: "",
      country: "Australia",
      set_size: "",
      set_type: "",
      primary_image_url: "",
      additional_images: [],
      slug: "",
      is_featured: false,
      is_active: true,
    })
    setEditingProduct(null)
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      description: "",
      slug: "",
    })
    setEditingCategory(null)
  }

  const resetHeroSlideForm = () => {
    setHeroSlideForm({
      title: "",
      subtitle: "",
      image_url: "",
      price: "",
      coins: "",
      years: "",
      custom_link: "",
      is_active: true,
      display_order: 1,
      slide_type: "manual",
      product_id: null,
    })
    setEditingHeroSlide(null)
  }

  const handleEditProduct = (product: Product) => {
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category_id: product.category_id?.toString() || "",
      stock_quantity: product.stock_quantity.toString(),
      sku: product.sku || "",
      weight: product.weight?.toString() || "",
      dimensions: product.dimensions || "",
      year: product.year?.toString() || "",
      mint_mark: product.mint_mark || "",
      condition: product.condition || "",
      rarity: product.rarity || "",
      metal: product.metal || "",
      denomination: product.denomination || "",
      country: product.country,
      set_size: product.set_size?.toString() || "",
      set_type: product.set_type || "",
      primary_image_url: product.primary_image_url || "",
      additional_images: product.additional_images || [],
      slug: product.slug || "",
      is_featured: product.is_featured,
      is_active: product.is_active,
    })
    setEditingProduct(product)
    setIsProductDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setCategoryForm({
      name: category.name,
      description: category.description || "",
      slug: category.slug,
    })
    setEditingCategory(category)
    setIsCategoryDialogOpen(true)
  }

  const handleEditHeroSlide = (heroSlide: HeroSlide) => {
    setHeroSlideForm({
      title: heroSlide.title,
      subtitle: heroSlide.subtitle,
      image_url: heroSlide.image_url || "",
      price: heroSlide.price || "",
      coins: heroSlide.coins || "",
      years: heroSlide.years || "",
      custom_link: heroSlide.custom_link || "",
      is_active: heroSlide.is_active,
      display_order: heroSlide.display_order,
      slide_type: heroSlide.slide_type,
      product_id: heroSlide.product_id,
    })
    setEditingHeroSlide(heroSlide)
    setIsHeroSlideDialogOpen(true)
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...productForm,
        price: Number.parseFloat(productForm.price),
        category_id: productForm.category_id ? Number.parseInt(productForm.category_id) : null,
        stock_quantity: Number.parseInt(productForm.stock_quantity),
        weight: productForm.weight ? Number.parseFloat(productForm.weight) : null,
        year: productForm.year ? Number.parseInt(productForm.year) : null,
        set_size: productForm.set_size ? Number.parseInt(productForm.set_size) : null,
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
        toast({
          title: "Success",
          description: "Product updated successfully",
        })
      } else {
        await createProduct(productData)
        toast({
          title: "Success",
          description: "Product created successfully",
        })
      }

      await loadData()
      setIsProductDialogOpen(false)
      resetProductForm()
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryForm)
        toast({
          title: "Success",
          description: "Category updated successfully",
        })
      } else {
        await createCategory(categoryForm)
        toast({
          title: "Success",
          description: "Category created successfully",
        })
      }

      await loadData()
      setIsCategoryDialogOpen(false)
      resetCategoryForm()
    } catch (error) {
      console.error("Error saving category:", error)
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      })
    }
  }

  const handleHeroSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const heroSlideData = {
        ...heroSlideForm,
        display_order: Number.parseInt(heroSlideForm.display_order.toString()),
        product_id: heroSlideForm.product_id ? Number.parseInt(heroSlideForm.product_id.toString()) : null,
      }

      if (editingHeroSlide) {
        await updateHeroSlide(editingHeroSlide.id, heroSlideData)
        toast({
          title: "Success",
          description: "Hero slide updated successfully",
        })
      } else {
        await createHeroSlide(heroSlideData)
        toast({
          title: "Success",
          description: "Hero slide created successfully",
        })
      }

      await loadData()
      setIsHeroSlideDialogOpen(false)
      resetHeroSlideForm()
    } catch (error) {
      console.error("Error saving hero slide:", error)
      toast({
        title: "Error",
        description: "Failed to save hero slide",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id)
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      await loadData()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      await loadData()
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  const handleDeleteHeroSlide = async (id: number) => {
    try {
      await deleteHeroSlide(id)
      toast({
        title: "Success",
        description: "Hero slide deleted successfully",
      })
      await loadData()
    } catch (error) {
      console.error("Error deleting hero slide:", error)
      toast({
        title: "Error",
        description: "Failed to delete hero slide",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = async (file: File, type: "product" | "hero", imageType?: "primary" | "additional") => {
    try {
      const uploadKey = `${type}-${Date.now()}`
      setUploadingImages((prev) => ({ ...prev, [uploadKey]: true }))

      let imageUrl: string
      if (type === "product") {
        imageUrl = await uploadProductImage(file)
      } else {
        imageUrl = await uploadHeroImage(file)
      }

      if (type === "product") {
        if (imageType === "primary") {
          setProductForm((prev) => ({ ...prev, primary_image_url: imageUrl }))
        } else {
          setProductForm((prev) => ({
            ...prev,
            additional_images: [...prev.additional_images, imageUrl],
          }))
        }
      } else {
        setHeroSlideForm((prev) => ({ ...prev, image_url: imageUrl }))
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      const uploadKey = `${type}-${Date.now()}`
      setUploadingImages((prev) => ({ ...prev, [uploadKey]: false }))
    }
  }

  const handleRemoveAdditionalImage = async (imageUrl: string, index: number) => {
    try {
      await deleteProductImage(imageUrl)
      setProductForm((prev) => ({
        ...prev,
        additional_images: prev.additional_images.filter((_, i) => i !== index),
      }))
      toast({
        title: "Success",
        description: "Image removed successfully",
      })
    } catch (error) {
      console.error("Error removing image:", error)
      toast({
        title: "Error",
        description: "Failed to remove image",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products, categories, and hero slides</p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="hero-slides">Hero Slides</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Products</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetProductForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                      {editingProduct ? "Update the product details" : "Create a new product for your store"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productForm.category_id}
                          onValueChange={(value) => setProductForm((prev) => ({ ...prev, category_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                        <Input
                          id="stock_quantity"
                          type="number"
                          value={productForm.stock_quantity}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, stock_quantity: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          value={productForm.sku}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, sku: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          type="number"
                          value={productForm.year}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, year: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Input
                          id="condition"
                          value={productForm.condition}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, condition: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metal">Metal</Label>
                        <Input
                          id="metal"
                          value={productForm.metal}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, metal: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="denomination">Denomination</Label>
                        <Input
                          id="denomination"
                          value={productForm.denomination}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, denomination: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Images</h3>

                      {/* Primary Image */}
                      <div className="space-y-2">
                        <Label>Primary Image</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "product", "primary")
                            }}
                            className="hidden"
                            id="primary-image-upload"
                          />
                          <Label htmlFor="primary-image-upload" className="cursor-pointer">
                            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                              <Upload className="w-4 h-4" />
                              Upload Primary Image
                            </div>
                          </Label>
                          {productForm.primary_image_url && (
                            <div className="relative">
                              <Image
                                src={productForm.primary_image_url || "/placeholder.svg"}
                                alt="Primary"
                                width={60}
                                height={60}
                                className="object-cover rounded"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 w-6 h-6 p-0"
                                onClick={() => setProductForm((prev) => ({ ...prev, primary_image_url: "" }))}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Images */}
                      <div className="space-y-2">
                        <Label>Additional Images</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "product", "additional")
                            }}
                            className="hidden"
                            id="additional-image-upload"
                          />
                          <Label htmlFor="additional-image-upload" className="cursor-pointer">
                            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                              <Upload className="w-4 h-4" />
                              Add Additional Image
                            </div>
                          </Label>
                        </div>
                        {productForm.additional_images.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {productForm.additional_images.map((imageUrl, index) => (
                              <div key={index} className="relative">
                                <Image
                                  src={imageUrl || "/placeholder.svg"}
                                  alt={`Additional ${index + 1}`}
                                  width={60}
                                  height={60}
                                  className="object-cover rounded"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                                  onClick={() => handleRemoveAdditionalImage(imageUrl, index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_featured"
                          checked={productForm.is_featured}
                          onCheckedChange={(checked) => setProductForm((prev) => ({ ...prev, is_featured: checked }))}
                        />
                        <Label htmlFor="is_featured">Featured Product</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_active"
                          checked={productForm.is_active}
                          onCheckedChange={(checked) => setProductForm((prev) => ({ ...prev, is_active: checked }))}
                        />
                        <Label htmlFor="is_active">Active</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingProduct ? "Update Product" : "Create Product"}</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {product.primary_image_url && (
                          <Image
                            src={product.primary_image_url || "/placeholder.svg"}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${product.price.toLocaleString()} • Stock: {product.stock_quantity}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {product.is_featured && <Badge variant="secondary">Featured</Badge>}
                            {product.is_active ? (
                              <Badge variant="default">Active</Badge>
                            ) : (
                              <Badge variant="outline">Inactive</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Categories</h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetCategoryForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                    <DialogDescription>
                      {editingCategory ? "Update the category details" : "Create a new category for your products"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Name *</Label>
                      <Input
                        id="category-name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-slug">Slug *</Label>
                      <Input
                        id="category-slug"
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-description">Description</Label>
                      <Textarea
                        id="category-description"
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingCategory ? "Update Category" : "Create Category"}</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.slug}</p>
                        {category.description && <p className="text-sm text-gray-500 mt-1">{category.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{category.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hero Slides Tab */}
          <TabsContent value="hero-slides" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Hero Slides</h2>
              <Dialog open={isHeroSlideDialogOpen} onOpenChange={setIsHeroSlideDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetHeroSlideForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hero Slide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingHeroSlide ? "Edit Hero Slide" : "Add New Hero Slide"}</DialogTitle>
                    <DialogDescription>
                      {editingHeroSlide ? "Update the hero slide details" : "Create a new hero slide for your homepage"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleHeroSlideSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="slide-type">Slide Type</Label>
                          <Select
                            value={heroSlideForm.slide_type}
                            onValueChange={(value: "manual" | "product") =>
                              setHeroSlideForm((prev) => ({ ...prev, slide_type: value, product_id: null }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manual">Manual Slide</SelectItem>
                              <SelectItem value="product">Product Slide</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="display-order">Display Order</Label>
                          <Input
                            id="display-order"
                            type="number"
                            min="1"
                            value={heroSlideForm.display_order}
                            onChange={(e) =>
                              setHeroSlideForm((prev) => ({
                                ...prev,
                                display_order: Number.parseInt(e.target.value) || 1,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">Content</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="slide-title">Title *</Label>
                          <Input
                            id="slide-title"
                            value={heroSlideForm.title}
                            onChange={(e) => setHeroSlideForm((prev) => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slide-subtitle">Subtitle *</Label>
                          <Input
                            id="slide-subtitle"
                            value={heroSlideForm.subtitle}
                            onChange={(e) => setHeroSlideForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="slide-price">Price</Label>
                          <Input
                            id="slide-price"
                            placeholder="e.g., From $25"
                            value={heroSlideForm.price}
                            onChange={(e) => setHeroSlideForm((prev) => ({ ...prev, price: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slide-coins">Coins Info</Label>
                          <Input
                            id="slide-coins"
                            placeholder="e.g., 14 Coins"
                            value={heroSlideForm.coins}
                            onChange={(e) => setHeroSlideForm((prev) => ({ ...prev, coins: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slide-years">Years</Label>
                          <Input
                            id="slide-years"
                            placeholder="e.g., 2009-2023"
                            value={heroSlideForm.years}
                            onChange={(e) => setHeroSlideForm((prev) => ({ ...prev, years: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Link Options */}
                    {heroSlideForm.slide_type === "manual" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Link Options</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="product-link">Link to Product</Label>
                            <Select
                              value={heroSlideForm.product_id?.toString() || "0"}
                              onValueChange={(value) =>
                                setHeroSlideForm((prev) => ({
                                  ...prev,
                                  product_id: value ? Number.parseInt(value) : null,
                                  custom_link: value ? "" : prev.custom_link,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a product to link to" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">No product link</SelectItem>
                                {products
                                  .filter((p) => p.is_active)
                                  .map((product) => (
                                    <SelectItem key={product.id} value={product.id.toString()}>
                                      {product.name} - ${product.price}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {!heroSlideForm.product_id && (
                            <div className="space-y-2">
                              <Label htmlFor="custom-link">Or Custom Link</Label>
                              <Input
                                id="custom-link"
                                placeholder="/catalog or https://external-link.com"
                                value={heroSlideForm.custom_link}
                                onChange={(e) => setHeroSlideForm((prev) => ({ ...prev, custom_link: e.target.value }))}
                              />
                              <p className="text-sm text-gray-500">
                                Leave empty to use default catalog link. Can be internal (/catalog) or external
                                (https://...)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">Hero Image</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "hero")
                            }}
                            className="hidden"
                            id="hero-image-upload"
                          />
                          <Label htmlFor="hero-image-upload" className="cursor-pointer">
                            <div className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
                              <Upload className="w-4 h-4" />
                              Upload New Image
                            </div>
                          </Label>
                        </div>

                        {heroSlideForm.image_url && (
                          <div className="relative inline-block">
                            <Image
                              src={heroSlideForm.image_url || "/placeholder.svg"}
                              alt="Hero slide preview"
                              width={300}
                              height={200}
                              className="object-cover rounded border"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute -top-2 -right-2 w-8 h-8 p-0"
                              onClick={() => setHeroSlideForm((prev) => ({ ...prev, image_url: "" }))}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="slide-active"
                        checked={heroSlideForm.is_active}
                        onCheckedChange={(checked) => setHeroSlideForm((prev) => ({ ...prev, is_active: checked }))}
                      />
                      <Label htmlFor="slide-active">Active</Label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsHeroSlideDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        {editingHeroSlide ? "Save Changes" : "Create Hero Slide"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {heroSlides.map((slide) => (
                <Card key={slide.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {slide.image_url && (
                          <Image
                            src={slide.image_url || "/placeholder.svg"}
                            alt={slide.title}
                            width={80}
                            height={60}
                            className="object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{slide.title}</h3>
                          <p className="text-sm text-gray-600">{slide.subtitle}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={slide.slide_type === "product" ? "default" : "secondary"}>
                              {slide.slide_type === "product" ? "Product Slide" : "Manual Slide"}
                            </Badge>
                            {slide.is_active ? (
                              <Badge variant="default">
                                <Eye className="w-3 h-3 mr-1" />
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                <EyeOff className="w-3 h-3 mr-1" />
                                Inactive
                              </Badge>
                            )}
                            <Badge variant="outline">Order: {slide.display_order}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditHeroSlide(slide)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Hero Slide</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{slide.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteHeroSlide(slide.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

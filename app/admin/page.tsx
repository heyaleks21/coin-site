"use client"

import type React from "react"

import { useState, useEffect } from "react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  ArrowLeft,
  LogOut,
  User,
  Package,
  Tag,
  X,
  Upload,
  GripVertical,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadProductImage,
  deleteProductImage,
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  uploadHeroImage,
  type Product,
  type Category,
  type HeroSlide,
} from "@/lib/supabase-admin"
import { toast } from "@/hooks/use-toast"

// Image management component
interface ImageManagerProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  isUploading: boolean
  onUpload: (file: File) => Promise<void>
}

function ImageManager({ images, onImagesChange, isUploading, onUpload }: ImageManagerProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      await onUpload(files[i])
    }

    // Clear the input
    e.target.value = ""
  }

  const removeImage = async (index: number) => {
    const imageUrl = images[index]
    try {
      // Delete from storage
      await deleteProductImage(imageUrl)
      // Remove from array
      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)
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

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onImagesChange(newImages)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveImage(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Product Images</Label>
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button size="sm" disabled={isUploading} className="bg-amber-600 hover:bg-amber-700">
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Add Images"}
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative group border-2 border-dashed border-gray-200 rounded-lg p-2 hover:border-amber-300 transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="aspect-square relative overflow-hidden rounded-md bg-gray-50">
                <NextImage
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-contain"
                />
                {index === 0 && <Badge className="absolute top-1 left-1 text-xs bg-amber-600">Primary</Badge>}
              </div>

              {/* Controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0" title="Drag to reorder">
                  <GripVertical className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 w-8 p-0"
                  onClick={() => removeImage(index)}
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Move buttons for mobile */}
              <div className="flex justify-between mt-2 md:hidden">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => index > 0 && moveImage(index, index - 1)}
                  disabled={index === 0}
                  className="h-6 px-2 text-xs"
                >
                  ←
                </Button>
                <span className="text-xs text-gray-500 self-center">
                  {index + 1} of {images.length}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => index < images.length - 1 && moveImage(index, index + 1)}
                  disabled={index === images.length - 1}
                  className="h-6 px-2 text-xs"
                >
                  →
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No images uploaded</p>
          <p className="text-sm text-gray-400">Click "Add Images" to upload product photos</p>
        </div>
      )}

      <p className="text-sm text-gray-500">
        The first image will be used as the primary image. Drag and drop to reorder images.
      </p>
    </div>
  )
}

function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Product dialog states
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock_quantity: 0,
    country: "Australia",
    is_active: true,
    is_featured: false,
    additional_images: [],
  })

  // Category dialog states
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    slug: "",
  })

  // Image upload states
  const [uploadingImage, setUploadingImage] = useState(false)

  // Hero slide states
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [isAddHeroDialogOpen, setIsAddHeroDialogOpen] = useState(false)
  const [isEditHeroDialogOpen, setIsEditHeroDialogOpen] = useState(false)
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null)
  const [newHeroSlide, setNewHeroSlide] = useState<Partial<HeroSlide>>({
    title: "",
    subtitle: "",
    image_url: null,
    price: "",
    coins: "",
    years: "",
    custom_link: "",
    is_active: true,
    display_order: 0,
    slide_type: "manual",
    product_id: null,
  })
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || product.category_id?.toString() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
        toast({
          title: "Error",
          description: "Please fill in all required fields (Name, Price, Category)",
          variant: "destructive",
        })
        return
      }

      // Generate slug from name
      const slug = newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      // Prepare images array
      const allImages = [newProduct.primary_image_url, ...(newProduct.additional_images || [])].filter(Boolean)
      const primary_image_url = allImages[0] || null
      const additional_images = allImages.slice(1)

      const productData = {
        ...newProduct,
        slug,
        primary_image_url,
        additional_images,
        price: Number(newProduct.price),
        stock_quantity: Number(newProduct.stock_quantity) || 0,
        year: newProduct.year ? Number(newProduct.year) : null,
        set_size: newProduct.set_size ? Number(newProduct.set_size) : null,
        weight: newProduct.weight ? Number(newProduct.weight) : null,
      } as Omit<Product, "id" | "created_at" | "updated_at" | "categories">

      const createdProduct = await createProduct(productData)
      await loadData()
      setNewProduct({
        name: "",
        price: 0,
        stock_quantity: 0,
        country: "Australia",
        is_active: true,
        is_featured: false,
        additional_images: [],
      })
      setIsAddProductDialogOpen(false)
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = async () => {
    try {
      if (!editingProduct || !editingProduct.name || !editingProduct.price || !editingProduct.category_id) {
        toast({
          title: "Error",
          description: "Please fill in all required fields (Name, Price, Category)",
          variant: "destructive",
        })
        return
      }

      // Get the original product data to compare images
      const originalProduct = products.find((p) => p.id === editingProduct.id)

      // remove the joined "categories" object before sending to DB
      const { categories: _ignored, ...base } = editingProduct

      // Prepare images array
      const allImages = [base.primary_image_url, ...(base.additional_images || [])].filter(Boolean)
      const primary_image_url = allImages[0] || null
      const additional_images = allImages.slice(1)

      const updates = {
        ...base,
        primary_image_url,
        additional_images,
        price: Number(base.price),
        stock_quantity: Number(base.stock_quantity),
        year: base.year ? Number(base.year) : null,
        set_size: base.set_size ? Number(base.set_size) : null,
        weight: base.weight ? Number(base.weight) : null,
      } satisfies Omit<Product, "categories">

      // Update the product in database
      await updateProduct(editingProduct.id, updates)

      // Clean up removed images from storage
      if (originalProduct) {
        const originalImages = [originalProduct.primary_image_url, ...(originalProduct.additional_images || [])].filter(
          Boolean,
        )

        const currentImages = allImages
        const removedImages = originalImages.filter((img) => !currentImages.includes(img))

        // Delete removed images from storage
        for (const imageUrl of removedImages) {
          try {
            await deleteProductImage(imageUrl)
            console.log(`Cleaned up removed image: ${imageUrl}`)
          } catch (error) {
            console.error(`Failed to delete image ${imageUrl}:`, error)
            // Continue with other deletions even if one fails
          }
        }
      }

      await loadData()
      setEditingProduct(null)
      setIsEditProductDialogOpen(false)
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      const product = products.find((p) => p.id === id)
      if (!product) return

      const imageCount = [product.primary_image_url, ...(product.additional_images || [])].filter(Boolean).length
      const confirmMessage =
        imageCount > 0
          ? `Are you sure you want to delete "${product.name}"? This will also delete ${imageCount} associated image(s).`
          : `Are you sure you want to delete "${product.name}"?`

      if (!confirm(confirmMessage)) return

      await deleteProduct(id)
      setProducts(products.filter((product) => product.id !== id))
      toast({
        title: "Success",
        description: `Product and ${imageCount} image(s) deleted successfully`,
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const handleAddCategory = async () => {
    try {
      if (!newCategory.name) {
        toast({
          title: "Error",
          description: "Please enter a category name",
          variant: "destructive",
        })
        return
      }

      const slug =
        newCategory.slug ||
        newCategory.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")

      const categoryData = {
        ...newCategory,
        slug,
      } as Omit<Category, "id" | "created_at" | "updated_at">

      const createdCategory = await createCategory(categoryData)
      setCategories([...categories, createdCategory])
      setNewCategory({ name: "", description: "", slug: "" })
      setIsAddCategoryDialogOpen(false)
      toast({
        title: "Success",
        description: "Category added successfully",
      })
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = async () => {
    try {
      if (!editingCategory || !editingCategory.name) {
        toast({
          title: "Error",
          description: "Please enter a category name",
          variant: "destructive",
        })
        return
      }

      const slug =
        editingCategory.slug ||
        editingCategory.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")

      const updates = {
        ...editingCategory,
        slug,
      } as Partial<Category>

      await updateCategory(editingCategory.id, updates)
      await loadData()
      setEditingCategory(null)
      setIsEditCategoryDialogOpen(false)
      toast({
        title: "Success",
        description: "Category updated successfully",
      })
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      // Check if category has products
      const productsInCategory = products.filter((p) => p.category_id === id)
      if (productsInCategory.length > 0) {
        toast({
          title: "Cannot Delete Category",
          description: `This category contains ${productsInCategory.length} product(s). Please move or delete the products first.`,
          variant: "destructive",
        })
        return
      }

      await deleteCategory(id)
      setCategories(categories.filter((category) => category.id !== id))
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory({ ...category })
    setIsEditCategoryDialogOpen(true)
  }

  const handleImageUpload = async (file: File, isEditing = false) => {
    try {
      setUploadingImage(true)
      console.log("Starting image upload for file:", file.name)

      const imageUrl = await uploadProductImage(file)
      console.log("Image uploaded successfully:", imageUrl)

      if (isEditing && editingProduct) {
        const currentImages = [editingProduct.primary_image_url, ...(editingProduct.additional_images || [])].filter(
          Boolean,
        )
        const newImages = [...currentImages, imageUrl]
        const primary_image_url = newImages[0]
        const additional_images = newImages.slice(1)

        setEditingProduct({
          ...editingProduct,
          primary_image_url,
          additional_images,
        })
      } else {
        const currentImages = [newProduct.primary_image_url, ...(newProduct.additional_images || [])].filter(Boolean)
        const newImages = [...currentImages, imageUrl]
        const primary_image_url = newImages[0]
        const additional_images = newImages.slice(1)

        setNewProduct({
          ...newProduct,
          primary_image_url,
          additional_images,
        })
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error: any) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleImagesChange = (images: string[], isEditing = false) => {
    const primary_image_url = images[0] || null
    const additional_images = images.slice(1)

    if (isEditing && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        primary_image_url,
        additional_images,
      })
    } else {
      setNewProduct({
        ...newProduct,
        primary_image_url,
        additional_images,
      })
    }
  }

  const openEditProductDialog = (product: Product) => {
    setEditingProduct({ ...product })
    setIsEditProductDialogOpen(true)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const rarities = ["Common", "Uncommon", "Scarce", "Rare", "Very Rare"]
  const conditions = [
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Fine",
    "Very Fine",
    "Extremely Fine",
    "Uncirculated",
    "Proof",
  ]

  // Calculate stats
  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock_quantity, 0)
  const lowStockItems = products.filter((product) => product.stock_quantity < 5).length
  const totalCategories = categories.length

  // Hero slide management functions
  const handleAddHeroSlide = async () => {
    try {
      // Check slide limit
      if (heroSlides.length >= 8) {
        toast({
          title: "Limit Reached",
          description: "Maximum of 8 hero slides allowed",
          variant: "destructive",
        })
        return
      }

      if (!newHeroSlide.title || !newHeroSlide.subtitle) {
        toast({
          title: "Error",
          description: "Please fill in title and subtitle",
          variant: "destructive",
        })
        return
      }

      if (newHeroSlide.slide_type === "product" && !newHeroSlide.product_id) {
        toast({
          title: "Error",
          description: "Please select a product for product-based slides",
          variant: "destructive",
        })
        return
      }

      const maxOrder = Math.max(...heroSlides.map((slide) => slide.display_order), 0)

      const heroSlideData = {
        ...newHeroSlide,
        display_order: maxOrder + 1,
      } as Omit<HeroSlide, "id" | "created_at" | "updated_at" | "products">

      await createHeroSlide(heroSlideData)
      await loadData()

      // Reset the form after successful creation
      setNewHeroSlide({
        title: "",
        subtitle: "",
        image_url: null,
        price: "",
        coins: "",
        years: "",
        custom_link: "",
        is_active: true,
        display_order: 0,
        slide_type: "manual",
        product_id: null,
      })

      setIsAddHeroDialogOpen(false)
      toast({
        title: "Success",
        description: "Hero slide added successfully",
      })
    } catch (error) {
      console.error("Error adding hero slide:", error)
      toast({
        title: "Error",
        description: "Failed to add hero slide",
        variant: "destructive",
      })
    }
  }

  const handleEditHeroSlide = async () => {
    try {
      if (!editingHeroSlide || !editingHeroSlide.title || !editingHeroSlide.subtitle) {
        toast({
          title: "Error",
          description: "Please fill in title and subtitle",
          variant: "destructive",
        })
        return
      }

      const { products: _ignored, ...updates } = editingHeroSlide

      await updateHeroSlide(editingHeroSlide.id, updates)
      await loadData()
      setEditingHeroSlide(null)
      setIsEditHeroDialogOpen(false)
      toast({
        title: "Success",
        description: "Hero slide updated successfully",
      })
    } catch (error) {
      console.error("Error updating hero slide:", error)
      toast({
        title: "Error",
        description: "Failed to update hero slide",
        variant: "destructive",
      })
    }
  }

  const handleDeleteHeroSlide = async (id: number) => {
    try {
      const slide = heroSlides.find((s) => s.id === id)
      if (!slide) return

      if (!confirm(`Are you sure you want to delete "${slide.title}"?`)) return

      await deleteHeroSlide(id)
      setHeroSlides(heroSlides.filter((slide) => slide.id !== id))
      toast({
        title: "Success",
        description: "Hero slide deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting hero slide:", error)
      toast({
        title: "Error",
        description: "Failed to delete hero slide",
        variant: "destructive",
      })
    }
  }

  const handleHeroImageUpload = async (file: File, isEditing = false) => {
    try {
      setUploadingHeroImage(true)
      const imageUrl = await uploadHeroImage(file)

      if (isEditing && editingHeroSlide) {
        setEditingHeroSlide({
          ...editingHeroSlide,
          image_url: imageUrl,
        })
      } else {
        setNewHeroSlide({
          ...newHeroSlide,
          image_url: imageUrl,
        })
      }

      toast({
        title: "Success",
        description: "Hero image uploaded successfully",
      })
    } catch (error: any) {
      console.error("Error uploading hero image:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to upload hero image",
        variant: "destructive",
      })
    } finally {
      setUploadingHeroImage(false)
    }
  }

  const openEditHeroDialog = (heroSlide: HeroSlide) => {
    // Ensure all properties are properly set with fallbacks
    setEditingHeroSlide({
      ...heroSlide,
      title: heroSlide.title || "",
      subtitle: heroSlide.subtitle || "",
      image_url: heroSlide.image_url || null,
      price: heroSlide.price || "",
      coins: heroSlide.coins || "",
      years: heroSlide.years || "",
      custom_link: heroSlide.custom_link || "",
      is_active: heroSlide.is_active ?? true,
      display_order: heroSlide.display_order || 0,
      slide_type: heroSlide.slide_type || "manual",
      product_id: heroSlide.product_id || null,
    })
    setIsEditHeroDialogOpen(true)
  }

  const handleProductSelection = (productId: string, isEditing = false) => {
    const product = products.find((p) => p.id === Number(productId))
    if (!product) return

    const slideData = {
      title: product.name.toUpperCase(),
      subtitle: product.categories?.name?.toUpperCase() || "COLLECTIBLE COIN",
      image_url: product.primary_image_url,
      price: `$${product.price.toLocaleString()}`,
      coins: `${product.stock_quantity} Available`,
      years: product.year ? product.year.toString() : "Various",
      slide_type: "product" as const,
      product_id: Number(productId),
    }

    if (isEditing && editingHeroSlide) {
      setEditingHeroSlide({
        ...editingHeroSlide,
        ...slideData,
      })
    } else {
      setNewHeroSlide({
        ...newHeroSlide,
        ...slideData,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-amber-50 hover:text-amber-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Site</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 hidden sm:block text-xs sm:text-sm">Manage your inventory</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-gray-100">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
            <CardContent className="py-6">
              <h2 className="text-xl font-semibold mb-2">Welcome back, {user?.email}!</h2>
              <p className="text-amber-100">Manage your inventory and track your business performance.</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{lowStockItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="hero-slides" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Hero Slides
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Add, edit, and manage your inventory</CardDescription>
                  </div>
                  <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Enter the details for the new product</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              placeholder="e.g., 1966 Round 50 Cent"
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">Price ($) *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Category *</Label>
                            <Select
                              value={newProduct.category_id?.toString()}
                              onValueChange={(value) => setNewProduct({ ...newProduct, category_id: Number(value) })}
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
                          <div>
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={newProduct.stock_quantity}
                              onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: Number(e.target.value) })}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        {/* Additional fields */}
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="year">Year</Label>
                            <Input
                              id="year"
                              type="number"
                              value={newProduct.year || ""}
                              onChange={(e) =>
                                setNewProduct({ ...newProduct, year: e.target.value ? Number(e.target.value) : null })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="condition">Condition</Label>
                            <Select
                              value={newProduct.condition || ""}
                              onValueChange={(value) => setNewProduct({ ...newProduct, condition: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                {conditions.map((condition) => (
                                  <SelectItem key={condition} value={condition}>
                                    {condition}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="rarity">Rarity</Label>
                            <Select
                              value={newProduct.rarity || ""}
                              onValueChange={(value) => setNewProduct({ ...newProduct, rarity: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select rarity" />
                              </SelectTrigger>
                              <SelectContent>
                                {rarities.map((rarity) => (
                                  <SelectItem key={rarity} value={rarity}>
                                    {rarity}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={newProduct.country}
                              onChange={(e) => setNewProduct({ ...newProduct, country: e.target.value })}
                              placeholder="Australia"
                            />
                          </div>
                        </div>

                        {/* Additional fields for sets */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="set_size">Set Size</Label>
                            <Input
                              id="set_size"
                              type="number"
                              value={newProduct.set_size || ""}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  set_size: e.target.value ? Number(e.target.value) : null,
                                })
                              }
                              placeholder="Number of items in set"
                            />
                          </div>
                          <div>
                            <Label htmlFor="set_type">Set Type</Label>
                            <Input
                              id="set_type"
                              value={newProduct.set_type || ""}
                              onChange={(e) => setNewProduct({ ...newProduct, set_type: e.target.value })}
                              placeholder="e.g., Commemorative, Proof"
                            />
                          </div>
                          <div>
                            <Label htmlFor="metal">Metal</Label>
                            <Input
                              id="metal"
                              value={newProduct.metal || ""}
                              onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })}
                              placeholder="e.g., Silver, Gold, Bronze"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description || ""}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            placeholder="Enter product description..."
                            rows={3}
                          />
                        </div>

                        {/* Image Manager */}
                        <ImageManager
                          images={[newProduct.primary_image_url, ...(newProduct.additional_images || [])].filter(
                            Boolean,
                          )}
                          onImagesChange={(images) => handleImagesChange(images, false)}
                          isUploading={uploadingImage}
                          onUpload={(file) => handleImageUpload(file, false)}
                        />

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="is_featured"
                              checked={newProduct.is_featured}
                              onChange={(e) => setNewProduct({ ...newProduct, is_featured: e.target.checked })}
                            />
                            <Label htmlFor="is_featured">Featured Product</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="is_active"
                              checked={newProduct.is_active}
                              onChange={(e) => setNewProduct({ ...newProduct, is_active: e.target.checked })}
                            />
                            <Label htmlFor="is_active">Active</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddProduct} className="bg-amber-600 hover:bg-amber-700">
                          Add Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
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

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="relative">
                              <NextImage
                                src={product.primary_image_url || "/placeholder.svg?height=50&width=50&text=No+Image"}
                                alt={product.name}
                                width={50}
                                height={50}
                                className="rounded-md object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=50&width=50&text=No+Image"
                                }}
                              />
                              {(product.additional_images?.length || 0) > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-amber-600">
                                  +{product.additional_images?.length}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{product.categories?.name || "Uncategorized"}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">${product.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={product.stock_quantity < 5 ? "destructive" : "secondary"}>
                              {product.stock_quantity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {product.is_featured && <Badge variant="default">Featured</Badge>}
                              <Badge variant={product.is_active ? "default" : "secondary"}>
                                {product.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditProductDialog(product)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <CardTitle>Category Management</CardTitle>
                    <CardDescription>Organize your products into categories</CardDescription>
                  </div>
                  <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>Create a new product category</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="category-name">Category Name *</Label>
                          <Input
                            id="category-name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="e.g., Commemorative Coins"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category-slug">URL Slug</Label>
                          <Input
                            id="category-slug"
                            value={newCategory.slug}
                            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                            placeholder="commemorative-coins (auto-generated if empty)"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category-description">Description</Label>
                          <Textarea
                            id="category-description"
                            value={newCategory.description || ""}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            placeholder="Enter category description..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddCategory} className="bg-amber-600 hover:bg-amber-700">
                          Add Category
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                            <p className="text-xs text-gray-400">Slug: {category.slug}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {products.filter((p) => p.category_id === category.id).length} products
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditCategoryDialog(category)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Slides Tab */}
          <TabsContent value="hero-slides">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <CardTitle>Hero Slideshow Management</CardTitle>
                    <CardDescription>Manage the homepage hero slideshow content (Max 8 slides)</CardDescription>
                  </div>
                  <Dialog open={isAddHeroDialogOpen} onOpenChange={setIsAddHeroDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-600 hover:bg-amber-700" disabled={heroSlides.length >= 8}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Hero Slide {heroSlides.length >= 8 ? "(Limit Reached)" : `(${heroSlides.length}/8)`}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Hero Slide</DialogTitle>
                        <DialogDescription>Create a new hero slide for the homepage</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        {/* Slide Type Selection */}
                        <div>
                          <Label>Slide Type</Label>
                          <Select
                            value={newHeroSlide.slide_type}
                            onValueChange={(value: "manual" | "product") => {
                              setNewHeroSlide({
                                ...newHeroSlide,
                                slide_type: value,
                                product_id: value === "manual" ? null : newHeroSlide.product_id,
                              })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a slide type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manual">Manual Slide</SelectItem>
                              <SelectItem value="product">Product-Based Slide</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Product Selection for Product-Based Slides */}
                        {newHeroSlide.slide_type === "product" && (
                          <div>
                            <Label>Select Product</Label>
                            <Select
                              value={newHeroSlide.product_id?.toString() || ""}
                              onValueChange={(value) => handleProductSelection(value, false)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a product" />
                              </SelectTrigger>
                              <SelectContent>
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
                        )}

                        {/* Title and Subtitle */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="hero-title">Title *</Label>
                            <Input
                              id="hero-title"
                              value={newHeroSlide.title}
                              onChange={(e) => setNewHeroSlide({ ...newHeroSlide, title: e.target.value })}
                              placeholder="e.g., COMPLETE SET"
                            />
                          </div>
                          <div>
                            <Label htmlFor="hero-subtitle">Subtitle *</Label>
                            <Input
                              id="hero-subtitle"
                              value={newHeroSlide.subtitle}
                              onChange={(e) => setNewHeroSlide({ ...newHeroSlide, subtitle: e.target.value })}
                              placeholder="e.g., $2 COMMEMORATIVE COIN COLLECTION"
                            />
                          </div>
                        </div>

                        {/* Price, Coins, and Years */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="hero-price">Price</Label>
                            <Input
                              id="hero-price"
                              value={newHeroSlide.price || ""}
                              onChange={(e) => setNewHeroSlide({ ...newHeroSlide, price: e.target.value })}
                              placeholder="e.g., $1,850"
                            />
                          </div>
                          <div>
                            <Label htmlFor="hero-coins">Coins Info</Label>
                            <Input
                              id="hero-coins"
                              value={newHeroSlide.coins || ""}
                              onChange={(e) => setNewHeroSlide({ ...newHeroSlide, coins: e.target.value })}
                              placeholder="e.g., 57 Coins"
                            />
                          </div>
                          <div>
                            <Label htmlFor="hero-years">Years</Label>
                            <Input
                              id="hero-years"
                              value={newHeroSlide.years || ""}
                              onChange={(e) => setNewHeroSlide({ ...newHeroSlide, years: e.target.value })}
                              placeholder="e.g., 1988-2025"
                            />
                          </div>
                        </div>

                        {/* Link Options for Manual Slides */}
                        {newHeroSlide.slide_type === "manual" && (
                          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                            <Label className="text-sm font-medium">Link Options</Label>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm">Link to Product (Recommended)</Label>
                                <Select
                                  value={newHeroSlide.product_id?.toString() || ""}
                                  onValueChange={(value) => {
                                    if (value) {
                                      const product = products.find((p) => p.id === Number(value))
                                      setNewHeroSlide({
                                        ...newHeroSlide,
                                        product_id: Number(value),
                                        custom_link: `/product/${product?.slug || value}`,
                                      })
                                    } else {
                                      setNewHeroSlide({
                                        ...newHeroSlide,
                                        product_id: null,
                                        custom_link: "",
                                      })
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a product to link to" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">No product link</SelectItem>
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
                              <div className="text-center text-sm text-gray-500">OR</div>
                              <div>
                                <Label htmlFor="hero-custom-link" className="text-sm">
                                  Custom Link
                                </Label>
                                <Input
                                  id="hero-custom-link"
                                  value={newHeroSlide.custom_link || ""}
                                  onChange={(e) => {
                                    setNewHeroSlide({
                                      ...newHeroSlide,
                                      custom_link: e.target.value,
                                      product_id: e.target.value ? null : newHeroSlide.product_id,
                                    })
                                  }}
                                  placeholder="e.g., /catalog, /about, https://external-link.com"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Leave empty to link to catalog. Can be internal (/catalog) or external (https://...)
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Image Upload for Manual Slides */}
                        {newHeroSlide.slide_type === "manual" && (
                          <div>
                            <Label>Hero Image</Label>
                            <div className="space-y-4">
                              <div className="relative">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleHeroImageUpload(file, false)
                                  }}
                                  disabled={uploadingHeroImage}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Button disabled={uploadingHeroImage} className="bg-amber-600 hover:bg-amber-700">
                                  <Upload className="h-4 w-4 mr-2" />
                                  {uploadingHeroImage ? "Uploading..." : "Upload Image"}
                                </Button>
                              </div>
                              {newHeroSlide.image_url && (
                                <div className="relative w-32 h-20 border rounded overflow-hidden">
                                  <NextImage
                                    src={newHeroSlide.image_url || "/placeholder.svg"}
                                    alt="Hero preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Product Image Preview for Product-Based Slides */}
                        {newHeroSlide.slide_type === "product" && newHeroSlide.image_url && (
                          <div>
                            <Label>Product Image Preview</Label>
                            <div className="relative w-32 h-20 border rounded overflow-hidden">
                              <NextImage
                                src={newHeroSlide.image_url || "/placeholder.svg"}
                                alt="Product preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Active Checkbox */}
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="hero-is_active"
                            checked={newHeroSlide.is_active}
                            onChange={(e) => setNewHeroSlide({ ...newHeroSlide, is_active: e.target.checked })}
                          />
                          <Label htmlFor="hero-is_active">Active</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddHeroDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddHeroSlide} className="bg-amber-600 hover:bg-amber-700">
                          Add Hero Slide
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heroSlides.map((slide) => (
                    <Card key={slide.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {slide.image_url && (
                              <div className="relative w-16 h-10 border rounded overflow-hidden">
                                <NextImage
                                  src={slide.image_url || "/placeholder.svg"}
                                  alt={slide.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold">{slide.title}</h3>
                              <p className="text-sm text-gray-600">{slide.subtitle}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Badge variant={slide.slide_type === "product" ? "default" : "secondary"}>
                                  {slide.slide_type === "product" ? "Product" : "Manual"}
                                </Badge>
                                {slide.price && <span>{slide.price}</span>}
                                {slide.coins && <span>• {slide.coins}</span>}
                                {slide.years && <span>• {slide.years}</span>}
                                {slide.custom_link && <span>• Link: {slide.custom_link}</span>}
                                {slide.slide_type === "product" && slide.products?.slug && (
                                  <span>• Link: /product/{slide.products.slug}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={slide.is_active ? "default" : "secondary"}>
                              {slide.is_active ? "Active" : "Inactive"}
                            </Badge>
                            <Badge variant="outline">Order: {slide.display_order}</Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditHeroDialog(slide)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteHeroSlide(slide.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {heroSlides.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No hero slides found. Add your first slide to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Product Dialog */}
        <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update the product details</DialogDescription>
            </DialogHeader>
            {editingProduct && (
              <div className="grid gap-4 py-4">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Product Name *</Label>
                    <Input
                      id="edit-name"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="e.g., 1966 Round 50 Cent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Price ($) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Category *</Label>
                    <Select
                      value={editingProduct.category_id?.toString()}
                      onValueChange={(value) => setEditingProduct({ ...editingProduct, category_id: Number(value) })}
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
                  <div>
                    <Label htmlFor="edit-stock">Stock Quantity</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={editingProduct.stock_quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Additional fields */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="edit-year">Year</Label>
                    <Input
                      id="edit-year"
                      type="number"
                      value={editingProduct.year || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, year: e.target.value ? Number(e.target.value) : null })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-condition">Condition</Label>
                    <Select
                      value={editingProduct.condition || ""}
                      onValueChange={(value) => setEditingProduct({ ...editingProduct, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-rarity">Rarity</Label>
                    <Select
                      value={editingProduct.rarity || ""}
                      onValueChange={(value) => setEditingProduct({ ...editingProduct, rarity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        {rarities.map((rarity) => (
                          <SelectItem key={rarity} value={rarity}>
                            {rarity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-country">Country</Label>
                    <Input
                      id="edit-country"
                      value={editingProduct.country}
                      onChange={(e) => setEditingProduct({ ...editingProduct, country: e.target.value })}
                      placeholder="Australia"
                    />
                  </div>
                </div>

                {/* Additional fields for sets */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-set_size">Set Size</Label>
                    <Input
                      id="edit-set_size"
                      type="number"
                      value={editingProduct.set_size || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          set_size: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      placeholder="Number of items in set"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-set_type">Set Type</Label>
                    <Input
                      id="edit-set_type"
                      value={editingProduct.set_type || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, set_type: e.target.value })}
                      placeholder="e.g., Commemorative, Proof"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-metal">Metal</Label>
                    <Input
                      id="edit-metal"
                      value={editingProduct.metal || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, metal: e.target.value })}
                      placeholder="e.g., Silver, Gold, Bronze"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Enter product description..."
                    rows={3}
                  />
                </div>

                {/* Image Manager */}
                <ImageManager
                  images={[editingProduct.primary_image_url, ...(editingProduct.additional_images || [])].filter(
                    Boolean,
                  )}
                  onImagesChange={(images) => handleImagesChange(images, true)}
                  isUploading={uploadingImage}
                  onUpload={(file) => handleImageUpload(file, true)}
                />

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-is_featured"
                      checked={editingProduct.is_featured}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    />
                    <Label htmlFor="edit-is_featured">Featured Product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-is_active"
                      checked={editingProduct.is_active}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                    />
                    <Label htmlFor="edit-is_active">Active</Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="bg-amber-600 hover:bg-amber-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>Update the category details</DialogDescription>
            </DialogHeader>
            {editingCategory && (
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="edit-category-name">Category Name *</Label>
                  <Input
                    id="edit-category-name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    placeholder="e.g., Commemorative Coins"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-slug">URL Slug</Label>
                  <Input
                    id="edit-category-slug"
                    value={editingCategory.slug}
                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                    placeholder="commemorative-coins (auto-generated if empty)"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-description">Description</Label>
                  <Textarea
                    id="edit-category-description"
                    value={editingCategory.description || ""}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    placeholder="Enter category description..."
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCategory} className="bg-amber-600 hover:bg-amber-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Hero Slide Dialog */}
        <Dialog open={isEditHeroDialogOpen} onOpenChange={setIsEditHeroDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Hero Slide</DialogTitle>
              <DialogDescription>Update the hero slide details</DialogDescription>
            </DialogHeader>
            {editingHeroSlide && (
              <div className="grid gap-6 py-4">
                {/* Slide Type Selection */}
                <div>
                  <Label>Slide Type</Label>
                  <Select
                    value={editingHeroSlide.slide_type || "manual"}
                    onValueChange={(value: "manual" | "product") => {
                      setEditingHeroSlide({
                        ...editingHeroSlide,
                        slide_type: value,
                        product_id: value === "manual" ? null : editingHeroSlide.product_id,
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a slide type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Slide</SelectItem>
                      <SelectItem value="product">Product-Based Slide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Selection for Product-Based Slides */}
                {editingHeroSlide.slide_type === "product" && (
                  <div>
                    <Label>Select Product</Label>
                    <Select
                      value={editingHeroSlide.product_id?.toString() || ""}
                      onValueChange={(value) => handleProductSelection(value, true)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product" />
                      </SelectTrigger>
                      <SelectContent>
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
                )}

                {/* Title and Subtitle */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-hero-title">Title *</Label>
                    <Input
                      id="edit-hero-title"
                      value={editingHeroSlide.title || ""}
                      onChange={(e) => setEditingHeroSlide({ ...editingHeroSlide, title: e.target.value })}
                      placeholder="e.g., COMPLETE SET"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-hero-subtitle">Subtitle *</Label>
                    <Input
                      id="edit-hero-subtitle"
                      value={editingHeroSlide.subtitle || ""}
                      onChange={(e) => setEditingHeroSlide({ ...editingHeroSlide, subtitle: e.target.value })}
                      placeholder="e.g., $2 COMMEMORATIVE COIN COLLECTION"
                    />
                  </div>
                </div>

                {/* Price, Coins, and Years */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-hero-price">Price</Label>
                    <Input
                      id="edit-hero-price"
                      value={editingHeroSlide.price || ""}
                      onChange={(e) => setEditingHeroSlide({ ...editingHeroSlide, price: e.target.value })}
                      placeholder="e.g., $1,850"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-hero-coins">Coins Info</Label>
                    <Input
                      id="edit-hero-coins"
                      value={editingHeroSlide.coins || ""}
                      onChange={(e) => setEditingHeroSlide({ ...editingHeroSlide, coins: e.target.value })}
                      placeholder="e.g., 57 Coins"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-hero-years">Years</Label>
                    <Input
                      id="edit-hero-years"
                      value={editingHeroSlide.years || ""}
                      onChange={(e) => setEditingHeroSlide({ ...editingHeroSlide, years: e.target.value })}
                      placeholder="e.g., 1988-2025"
                    />
                  </div>
                </div>

                {/* Link Options for Manual Slides */}
                {editingHeroSlide.slide_type === "manual" && (
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                    <Label className="text-sm font-medium">Link Options</Label>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Link to Product (Recommended)</Label>
                        <Select
                          value={editingHeroSlide.product_id?.toString() || ""}
                          onValueChange={(value) => {
                            if (value) {
                              const product = products.find((p) => p.id === Number(value))
                              setEditingHeroSlide({
                                ...editingHeroSlide,
                                product_id: Number(value),
                                custom_link: `/product/${product?.slug || value}`,
                              })
                            } else {
                              setEditingHeroSlide({
                                ...editingHeroSlide,
                                product_id: null,
                                custom_link: "",
                              })
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product to link to" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No product link</SelectItem>
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
                      <div className="text-center text-sm text-gray-500">OR</div>
                      <div>
                        <Label htmlFor="edit-hero-custom-link" className="text-sm">
                          Custom Link
                        </Label>
                        <Input
                          id="edit-hero-custom-link"
                          value={editingHeroSlide.custom_link || ""}
                          onChange={(e) => {
                            setEditingHeroSlide({
                              ...editingHeroSlide,
                              custom_link: e.target.value,
                              product_id: e.target.value ? null : editingHeroSlide.product_id,
                            })
                          }}
                          placeholder="e.g., /catalog, /about, https://external-link.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Leave empty to link to catalog. Can be internal (/catalog) or external (https://...)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Display Order and Active */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-hero-order">Display Order</Label>
                    <Input
                      id="edit-hero-order"
                      type="number"
                      value={editingHeroSlide.display_order || 0}
                      onChange={(e) =>
                        setEditingHeroSlide({ ...editingHeroSlide, display_order: Number(e.target.value) || 0 })
                      }
                      min="1"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="edit-hero-is_active"
                      checked={editingHeroSlide.is_active ?? true}
                      onChange={(e) => setEditingHeroSlide({ ...editingHeroSlide, is_active: e.target.checked })}
                    />
                    <Label htmlFor="edit-hero-is_active">Active</Label>
                  </div>
                </div>

                {/* Image Upload for Manual Slides */}
                {editingHeroSlide.slide_type === "manual" && (
                  <div>
                    <Label>Hero Image</Label>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleHeroImageUpload(file, true)
                          }}
                          disabled={uploadingHeroImage}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button disabled={uploadingHeroImage} className="bg-amber-600 hover:bg-amber-700">
                          <Upload className="h-4 w-4 mr-2" />
                          {uploadingHeroImage ? "Uploading..." : "Upload New Image"}
                        </Button>
                      </div>
                      {editingHeroSlide.image_url && (
                        <div className="relative w-32 h-20 border rounded overflow-hidden">
                          <NextImage
                            src={editingHeroSlide.image_url}
                            alt="Hero preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Product Image Preview for Product-Based Slides */}
                {editingHeroSlide.slide_type === "product" && editingHeroSlide.image_url && (
                  <div>
                    <Label>Product Image Preview</Label>
                    <div className="relative w-32 h-20 border rounded overflow-hidden">
                      <NextImage src={editingHeroSlide.image_url} alt="Product preview" fill className="object-cover" />
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditHeroDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditHeroSlide} className="bg-amber-600 hover:bg-amber-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  )
}

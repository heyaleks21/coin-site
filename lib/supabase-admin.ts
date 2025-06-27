import { supabase } from "./supabase"

export interface Category {
  id: number
  name: string
  description: string | null
  slug: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  category_id: number | null
  stock_quantity: number
  sku: string | null
  weight: number | null
  dimensions: string | null
  year: number | null
  mint_mark: string | null
  condition: string | null
  rarity: string | null
  metal: string | null
  denomination: string | null
  country: string
  set_size: number | null
  set_type: string | null
  primary_image_url: string | null
  additional_images: string[] | null
  slug: string | null
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  categories?: Category
}

// Category functions
export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) throw error
  return data as Category[]
}

export const createCategory = async (category: Omit<Category, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("categories").insert([category]).select().single()

  if (error) throw error
  return data as Category
}

export const updateCategory = async (id: number, updates: Partial<Category>) => {
  const { data, error } = await supabase.from("categories").update(updates).eq("id", id).select().single()

  if (error) throw error
  return data as Category
}

export const deleteCategory = async (id: number) => {
  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) throw error
}

// Product functions
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Product[]
}

export const createProduct = async (product: Omit<Product, "id" | "created_at" | "updated_at" | "categories">) => {
  const { data, error } = await supabase.from("products").insert([product]).select("*").single()
  if (error) throw error
  return data as Product
}

export const updateProduct = async (id: number, updates: Partial<Product>) => {
  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select("*").single()
  if (error) throw error
  return data as Product
}

// Add a helper function to extract file path from URL
const getFilePathFromUrl = (imageUrl: string): string => {
  try {
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split("/")
    // Find the part after 'products' in the path
    const productsIndex = pathParts.indexOf("products")
    if (productsIndex !== -1 && productsIndex < pathParts.length - 1) {
      return `products/${pathParts[productsIndex + 1]}`
    }
    // Fallback: use the last part of the path
    return `products/${pathParts[pathParts.length - 1]}`
  } catch (error) {
    console.error("Error parsing image URL:", error)
    // Fallback: extract filename from URL
    const urlParts = imageUrl.split("/")
    const fileName = urlParts[urlParts.length - 1]
    return `products/${fileName}`
  }
}

// Update the deleteProduct function to delete associated images
export const deleteProduct = async (id: number) => {
  try {
    // First, get the product to access its images
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("primary_image_url, additional_images")
      .eq("id", id)
      .single()

    if (fetchError) {
      console.error("Error fetching product for deletion:", fetchError)
      throw fetchError
    }

    // Collect all image URLs
    const imagesToDelete: string[] = []
    if (product.primary_image_url) {
      imagesToDelete.push(product.primary_image_url)
    }
    if (product.additional_images && Array.isArray(product.additional_images)) {
      imagesToDelete.push(...product.additional_images)
    }

    // Delete the product from database first
    const { error: deleteError } = await supabase.from("products").delete().eq("id", id)
    if (deleteError) throw deleteError

    // Then delete associated images from storage
    if (imagesToDelete.length > 0) {
      const filePaths = imagesToDelete.map((url) => getFilePathFromUrl(url))
      const { error: storageError } = await supabase.storage.from("product-images").remove(filePaths)

      if (storageError) {
        console.error("Error deleting images from storage:", storageError)
        // Don't throw here as the product is already deleted
      } else {
        console.log(`Deleted ${filePaths.length} images from storage`)
      }
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error)
    throw error
  }
}

// Image upload function
export const uploadProductImage = async (file: File, productId?: number) => {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file")
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB")
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `products/${fileName}`

    console.log("Uploading file:", filePath)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    console.log("Upload successful:", uploadData)

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(filePath)

    console.log("Public URL:", urlData.publicUrl)

    return urlData.publicUrl
  } catch (error) {
    console.error("Image upload error:", error)
    throw error
  }
}

// Update the deleteProductImage function to use the helper
export const deleteProductImage = async (imageUrl: string) => {
  try {
    const filePath = getFilePathFromUrl(imageUrl)

    const { error } = await supabase.storage.from("product-images").remove([filePath])

    if (error) {
      console.error("Delete error:", error)
      throw new Error(`Delete failed: ${error.message}`)
    }

    console.log("Image deleted successfully:", filePath)
  } catch (error) {
    console.error("Image delete error:", error)
    throw error
  }
}

export { supabase }

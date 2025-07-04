"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getHeroSlides, type HeroSlide } from "@/lib/supabase-admin"

export default function HeroSlideshow() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load slides from database
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const heroSlides = await getHeroSlides()
        const activeSlides = heroSlides.filter((slide) => slide.is_active)
        setSlides(activeSlides)
      } catch (error) {
        console.error("Error loading hero slides:", error)
        // Fallback to empty array if there's an error
        setSlides([])
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [])

  // Preload all images to prevent flash
  useEffect(() => {
    if (slides.length === 0) {
      setImagesLoaded(true)
      // Add a small delay then trigger the initial load animation
      setTimeout(() => {
        setHasInitiallyLoaded(true)
      }, 100)
      return
    }

    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        if (!slide.image_url) {
          resolve(null)
          return
        }
        const img = new window.Image()
        img.onload = resolve
        img.onerror = reject
        img.src = slide.image_url
      })
    })

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true)
        // Add a small delay then trigger the initial load animation
        setTimeout(() => {
          setHasInitiallyLoaded(true)
        }, 100)
      })
      .catch(() => {
        setImagesLoaded(true)
        setTimeout(() => {
          setHasInitiallyLoaded(true)
        }, 100)
      })
  }, [slides])

  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded || slides.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50) // Small delay to ensure content updates before transition ends
      }, 350) // Slightly longer to ensure smooth transition
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, imagesLoaded, slides.length])

  const changeSlide = (newSlide: number) => {
    if (newSlide === currentSlide || slides.length === 0) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(newSlide)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50) // Small delay to ensure content updates before transition ends
    }, 350) // Slightly longer to ensure smooth transition
    setIsAutoPlaying(false)

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    changeSlide(index)
  }

  // Get the link for the current slide
  const getCurrentSlideLink = () => {
    const currentSlideData = slides[currentSlide]
    if (!currentSlideData) return null

    // If it's a product-based slide, link to the product page
    if (currentSlideData.slide_type === "product" && currentSlideData.products?.slug) {
      return `/product/${currentSlideData.products.slug}`
    }

    // If it's a manual slide with a custom link, use that
    if (currentSlideData.slide_type === "manual" && currentSlideData.custom_link) {
      return currentSlideData.custom_link
    }

    // Default fallback
    return "/catalog"
  }

  // Show loading state until slides are loaded and images are preloaded
  if (loading || !imagesLoaded) {
    return (
      <section className="relative w-full min-h-[calc(100vh-80px)] bg-black overflow-hidden flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></div>
        </div>
      </section>
    )
  }

  // Show fallback if no slides are available
  if (slides.length === 0) {
    return (
      <section className="relative w-full min-h-[calc(100vh-80px)] bg-black overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-light mb-4">Welcome to Our Store</h1>
          <p className="text-gray-300 mb-8">Discover our amazing collection of coins</p>
          <Link href="/catalog">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-full">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  const currentSlideData = slides[currentSlide]
  const slideLink = getCurrentSlideLink()

  // Create a unified transition class for both text and image
  const getTransitionClass = () => {
    if (!hasInitiallyLoaded) {
      return "opacity-0"
    }
    if (isTransitioning) {
      return "opacity-0"
    }
    return "opacity-100"
  }

  const getTextTransform = () => {
    if (!hasInitiallyLoaded) {
      return "transform translate-y-8 lg:translate-y-0 lg:translate-x-[-40px]"
    }
    if (isTransitioning) {
      return "transform translate-y-4 lg:translate-y-0 lg:translate-x-[-20px]"
    }
    return "transform translate-y-0 lg:translate-x-0"
  }

  const getImageTransform = () => {
    if (!hasInitiallyLoaded) {
      return "transform translate-y-8 lg:translate-y-0 lg:translate-x-[40px] scale-90"
    }
    if (isTransitioning) {
      return "transform translate-y-4 lg:translate-y-0 lg:translate-x-[20px] scale-95"
    }
    return "transform translate-y-0 lg:translate-x-0 scale-100"
  }

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-black overflow-hidden flex flex-col justify-end">
      {/* Main Content Area */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 md:px-8 pb-24 pt-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Content - Typography */}
          <div
            className={`text-white text-center lg:text-left space-y-4 md:space-y-6 transition-all duration-700 ease-in-out ${getTransitionClass()} ${getTextTransform()}`}
          >
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-wider leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Decorative Line */}
              <div className="w-32 sm:w-40 md:w-32 h-0.5 bg-amber-500 mx-auto lg:mx-0"></div>

              <h2 className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-light tracking-widest text-gray-300">
                {currentSlideData.subtitle}
              </h2>
            </div>

            {/* Collection Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 text-sm sm:text-base md:text-sm lg:text-base text-gray-400 font-light tracking-wide">
              {currentSlideData.coins && <span>{currentSlideData.coins}</span>}
              {currentSlideData.coins && currentSlideData.years && <span>•</span>}
              {currentSlideData.years && <span>{currentSlideData.years}</span>}
              {(currentSlideData.coins || currentSlideData.years) && currentSlideData.price && <span>•</span>}
              {currentSlideData.price && <span className="text-amber-500 font-medium">{currentSlideData.price}</span>}
            </div>
          </div>

          {/* Right Content - Collection Image (Only the image is clickable) */}
          <div className="relative flex items-center justify-center w-full lg:w-auto">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div
                className={`relative w-full h-auto aspect-[3/2] mx-auto flex items-center justify-center transition-all duration-700 ease-in-out ${getTransitionClass()} ${getImageTransform()}`}
              >
                {/* Mobile-optimized glow - reduced blur and opacity */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-amber-600/10 blur-xl md:blur-3xl md:from-amber-400/20 md:to-amber-600/20 rounded-2xl will-change-transform"></div>

                {/* Only the image is clickable */}
                {slideLink ? (
                  <Link href={slideLink} className="block w-full h-full group cursor-pointer">
                    <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02]">
                      <Image
                        key={`${currentSlide}-${currentSlideData.id}`} // More unique key to force re-render
                        src={currentSlideData.image_url || "/placeholder.svg?height=400&width=600&text=No+Image"}
                        alt={`${currentSlideData.title} Collection`}
                        width={600}
                        height={400}
                        className="object-contain drop-shadow-2xl max-h-full w-full h-full"
                        priority
                        loading="eager"
                      />
                    </div>
                  </Link>
                ) : (
                  <Image
                    key={`${currentSlide}-${currentSlideData.id}`} // More unique key to force re-render
                    src={currentSlideData.image_url || "/placeholder.svg?height=400&width=600&text=No+Image"}
                    alt={`${currentSlideData.title} Collection`}
                    width={600}
                    height={400}
                    className="object-contain drop-shadow-2xl max-h-full w-full h-full"
                    priority
                    loading="eager"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slide Indicators - underneath all content */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-3 pt-8 md:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-amber-500 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Indicators - positioned at bottom */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden md:block">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-amber-500 scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shop Now Button - Desktop Only */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-30 hidden md:block">
        <Link href="/catalog">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full tracking-wide transition-all duration-300 hover:scale-105">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </section>
  )
}

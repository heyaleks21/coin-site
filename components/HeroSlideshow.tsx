"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "COMPLETE SET",
    subtitle: "$2 COMMEMORATIVE COIN COLLECTION",
    mainImage: "/images/complete-2dollar-collection.svg",
    secondaryImage: null,
    price: "$1,850",
    coins: "57 Coins",
    years: "1988-2025",
    singleImage: true,
  },
  {
    id: 2,
    title: "LIMITED SERIES",
    subtitle: "35TH ANNIVERSARY OF THE $2 COIN",
    mainImage: "/images/35th-anniversary-14-coin-set.svg",
    secondaryImage: null,
    price: "$395",
    coins: "14 Coins",
    years: "2023",
    singleImage: true,
  },
  {
    id: 3,
    title: "RED POPPY",
    subtitle: "REMEMBRANCE DAY C MINTMARK",
    mainImage: "/images/2022-remembrance-day-red-poppy.svg",
    secondaryImage: null,
    price: "$125",
    coins: "1 Coin",
    years: "2022",
    singleImage: true,
  },
]

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)

  // Preload all images to prevent flash
  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.onload = resolve
        img.onerror = reject
        img.src = slide.mainImage
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
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 300)
    }, 4000) // Changed to 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, imagesLoaded])

  const changeSlide = (newSlide: number) => {
    if (newSlide === currentSlide) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(newSlide)
      setIsTransitioning(false)
    }, 300)
    setIsAutoPlaying(false)

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    changeSlide(index)
  }

  const currentSlideData = slides[currentSlide]

  // Show loading state until images are preloaded
  if (!imagesLoaded) {
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

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-black overflow-hidden flex flex-col justify-end">
      {/* Main Content Area */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 md:px-8 pb-24 pt-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Content - Typography */}
          <div
            className={`text-white text-center lg:text-left space-y-4 md:space-y-6 transition-all duration-700 ease-in-out ${
              !hasInitiallyLoaded
                ? "opacity-0 transform translate-y-8 lg:translate-y-0 lg:translate-x-[-40px]"
                : isTransitioning
                  ? "opacity-0 transform translate-y-4 lg:translate-y-0 lg:translate-x-[-20px]"
                  : "opacity-100 transform translate-y-0 lg:translate-x-0"
            }`}
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
              <span>{currentSlideData.coins}</span>
              <span>•</span>
              <span>{currentSlideData.years}</span>
              <span>•</span>
              <span className="text-amber-500 font-medium">{currentSlideData.price}</span>
            </div>
          </div>

          {/* Right Content - Collection Image */}
          <div className="relative flex items-center justify-center w-full lg:w-auto">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div
                className={`relative w-full h-auto aspect-[3/2] mx-auto flex items-center justify-center transition-all duration-700 ease-in-out ${
                  !hasInitiallyLoaded
                    ? "opacity-0 transform translate-y-8 lg:translate-y-0 lg:translate-x-[40px] scale-90"
                    : isTransitioning
                      ? "opacity-0 transform translate-y-4 lg:translate-y-0 lg:translate-x-[20px] scale-95"
                      : "opacity-100 transform translate-y-0 lg:translate-x-0 scale-100"
                }`}
              >
                {/* Mobile-optimized glow - reduced blur and opacity */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-amber-600/10 blur-xl md:blur-3xl md:from-amber-400/20 md:to-amber-600/20 rounded-2xl will-change-transform"></div>
                <Image
                  key={currentSlide} // Force re-render to prevent flash
                  src={currentSlideData.mainImage || "/placeholder.svg"}
                  alt={`${currentSlideData.title} Collection`}
                  width={600}
                  height={400}
                  className="object-contain drop-shadow-2xl max-h-full w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Slide Indicators - Mobile only, part of content */}
          <div className="flex gap-3 mt-8 md:hidden">
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

      {/* Slide Indicators - Desktop only, positioned at bottom */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
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

      {/* Shop Now Button - Desktop Only */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 hidden md:block">
        <Link href="/catalog">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full tracking-wide transition-all duration-300 hover:scale-105">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </section>
  )
}

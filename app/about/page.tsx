"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, History, Gem, ShieldCheck, Lightbulb, Handshake, Play } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Filip Manevski",
      title: "Founder & Chief Numismatist",
      description:
        "With over 30 years in numismatics, Filip's passion for Australian coins led to the creation of Aussie Coins. His expertise in rare and historical pieces is unparalleled.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Aleks Manevski",
      title: "Senior Coin Specialist",
      description:
        "Aleks brings a fresh perspective and deep knowledge of modern Australian coinage and market trends. He specializes in helping collectors build valuable and meaningful collections.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Stefano Dinino",
      title: "Authentication Expert",
      description:
        "Stefano is our meticulous authentication expert, ensuring every coin's authenticity with advanced techniques. His dedication protects our clients from counterfeits.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const values = [
    {
      icon: ShieldCheck,
      title: "Integrity",
      description: "Upholding the highest standards of honesty and transparency in all our dealings.",
    },
    {
      icon: Gem,
      title: "Expertise",
      description: "Leveraging deep numismatic knowledge to provide accurate and insightful guidance.",
    },
    {
      icon: Handshake,
      title: "Customer Trust",
      description:
        "Building lasting relationships through reliable service and genuine care for our clients' collections.",
    },
    {
      icon: Lightbulb,
      title: "Passion",
      description: "Driven by a profound love for Australian numismatics and its rich history.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Aussie Coins
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Your trusted partner in Australian numismatics. We are dedicated to preserving and sharing the rich history
            of Australian coinage.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <History className="h-5 w-5 text-amber-600 mr-2" />
              30+ Years Experience
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-amber-600 mr-2" />
              Family Owned & Operated
            </div>
            <div className="flex items-center">
              <Gem className="h-5 w-5 text-amber-600 mr-2" />
              Passion for Numismatics
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Aussie Coins began over three decades ago with a simple passion: the rich and diverse history of
                Australian coinage. Founded by Filip Manevski, what started as a personal collection and a deep
                fascination for numismatics quickly grew into a mission to share this passion with others.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                From humble beginnings, we've grown into a trusted name in the Australian numismatic community, known
                for our expertise, integrity, and commitment to our clients. We believe every coin tells a story, and
                we're here to help you discover, preserve, and appreciate those stories.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, Aussie Coins remains a family-owned and operated business, with Filip, Aleks, and Stefano leading
                the way. Our dedication to the art and science of coin collecting is as strong as ever.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Vintage Australian Coins Collection"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">Guiding principles of our service</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600">The passionate individuals behind Aussie Coins</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-amber-600 font-semibold">{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* TikTok CTA - Full Width */}
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

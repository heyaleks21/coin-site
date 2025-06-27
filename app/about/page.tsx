"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, History, Gem, ShieldCheck, Lightbulb, Handshake } from "lucide-react"
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

        {/* Call to Action Section */}
        <section className="text-center bg-amber-600 text-white py-16 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore Your Collection?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or simply learn more about your coins, our team is here to assist you.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact">
              <Button variant="secondary" className="text-amber-600 hover:bg-amber-50">
                Contact Us
              </Button>
            </Link>
            <Link href="/catalog">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600">
                View Catalog
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AC</span>
                </div>
                <span className="font-bold text-lg">Aussie Coins</span>
              </div>
              <p className="text-gray-400">
                Australia's premier destination for collectible coins and numismatic treasures.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/catalog" className="hover:text-white transition-colors">
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Pre-Decimal</li>
                <li>Decimal</li>
                <li>Commemorative</li>
                <li>Gold Coins</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@aussiecoins.com.au</li>
                <li>📞 1300 COINS (26467)</li>
                <li>📍 Adelaide, South Australia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Aussie Coins. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

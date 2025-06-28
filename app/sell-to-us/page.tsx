"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  DollarSign,
  Upload,
  CheckCircle,
  Clock,
  Package,
  Banknote,
  Coins,
  ShieldCheck,
  Play,
} from "lucide-react"
import Navigation from "@/components/Navigation"

export default function SellToUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coinType: "",
    quantity: "",
    condition: "",
    description: "",
    preferredMethod: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const coinTypes = [
    "Pre-Decimal Australian Coins",
    "Decimal Australian Coins",
    "Gold Coins & Sovereigns",
    "Silver Coins",
    "Commemorative Coins",
    "Proof Sets",
    "Mint Sets",
    "Banknotes",
    "Foreign Coins",
    "Mixed Collection",
  ]

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

  const preferredMethods = ["Bank Transfer", "Cheque", "Store Credit"]

  const process = [
    {
      step: 1,
      title: "Submit Details",
      description: "Fill out our online form with information about your coins.",
      icon: Upload,
    },
    {
      step: 2,
      title: "Receive Offer",
      description: "Our experts will evaluate and provide a competitive offer.",
      icon: DollarSign,
    },
    {
      step: 3,
      title: "Secure Shipping",
      description: "Ship your coins to us with our insured and tracked service.",
      icon: Package,
    },
    {
      step: 4,
      title: "Fast Payment",
      description: "Get paid quickly via your preferred payment method.",
      icon: Banknote,
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Offers",
      description: "We provide fair and market-leading prices for your valuable coins.",
    },
    {
      icon: CheckCircle,
      title: "Hassle-Free Process",
      description: "Our streamlined process makes selling your coins easy and stress-free.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Insured",
      description: "Your collection is fully insured during transit and evaluation.",
    },
    {
      icon: Clock,
      title: "Fast Payments",
      description: "Receive prompt payment once your coins are authenticated and valued.",
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
            Sell Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Coins</span> to
            Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Looking to sell your Australian coins or collection? We offer competitive prices and a simple, secure
            process.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-amber-600 mr-2" />
              Competitive Offers
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-amber-600 mr-2" />
              Hassle-Free Process
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-amber-600 mr-2" />
              Secure & Insured
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Our simple 4-step selling process</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Sell to Aussie Coins?</h2>
            <p className="text-xl text-gray-600">Experience the difference of a trusted buyer</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Selling Form */}
          <section>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Coins className="h-6 w-6 mr-2 text-amber-600" />
                  Tell Us About Your Coins
                </CardTitle>
                <CardDescription>
                  Fill out the form below to get a preliminary offer for your coins or collection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(optional)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredMethod">Preferred Payment Method</Label>
                      <Select
                        value={formData.preferredMethod}
                        onValueChange={(value) => handleInputChange("preferredMethod", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {preferredMethods.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="coinType">Coin Type *</Label>
                      <Select value={formData.coinType} onValueChange={(value) => handleInputChange("coinType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {coinTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        placeholder="Number of coins"
                      />
                    </div>
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => handleInputChange("condition", value)}
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
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please provide detailed information about your coins including years, denominations, any special features, and your asking price (if any)..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Next Steps:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• We'll review your submission within 24 hours</li>
                      <li>• We may request photos for a more accurate offer</li>
                      <li>• Receive a no-obligation offer for your coins</li>
                      <li>• If accepted, arrange secure shipping and fast payment</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg">
                    Submit Coins for Offer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Additional Information */}
          <section className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-amber-600" />
                  What We Buy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Australian Pre-Decimal Coins</h4>
                      <p className="text-gray-600 text-sm">
                        Pennies, shillings, florins, crowns, and more from 1910-1964
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Australian Decimal Coins</h4>
                      <p className="text-gray-600 text-sm">
                        Rare 50c, 20c, $1, $2 coins, commemorative issues, and proof sets
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Gold & Silver Bullion Coins</h4>
                      <p className="text-gray-600 text-sm">
                        Australian gold sovereigns, Kookaburras, Koalas, and other precious metal coins
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Full Collections & Estates</h4>
                      <p className="text-gray-600 text-sm">
                        We purchase entire coin collections, large or small, and assist with estate valuations
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Provide clear, well-lit photos of your coins</li>
                  <li>• Include any original packaging or certificates</li>
                  <li>• Be honest about the condition of your coins</li>
                  <li>• Research similar coins to understand market value</li>
                  <li>• Don't clean your coins, it can decrease their value!</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">How long does the process take?</h4>
                    <p className="text-gray-600 text-sm">
                      Typically, you'll receive an offer within 24-48 hours. Payment is processed within 1-2 business
                      days after receiving and verifying your coins.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Do you buy all types of coins?</h4>
                    <p className="text-gray-600 text-sm">
                      We specialize in Australian numismatics but also consider significant foreign or ancient coins.
                      Please provide details in the form.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Is shipping insured?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes, we provide insured and tracked shipping labels for your peace of mind.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* TikTok CTA */}
      </div>

      {/* TikTok CTA */}
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, Camera, FileText, Clock, CheckCircle, Star, Award, Play } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function AppraisalPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coinType: "",
    quantity: "",
    condition: "",
    description: "",
    appraisalType: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const appraisalTypes = [
    "Insurance Appraisal",
    "Estate Valuation",
    "Collection Assessment",
    "Single Coin Appraisal",
    "Investment Evaluation",
    "Damage Assessment",
  ]

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

  const process = [
    {
      step: 1,
      title: "Submit Request",
      description: "Complete our detailed appraisal form with coin information",
      icon: FileText,
    },
    {
      step: 2,
      title: "Photo Submission",
      description: "Send high-quality photos of both sides of each coin",
      icon: Camera,
    },
    {
      step: 3,
      title: "Expert Analysis",
      description: "Our certified numismatists conduct thorough evaluation",
      icon: Award,
    },
    {
      step: 4,
      title: "Detailed Report",
      description: "Receive comprehensive written appraisal report",
      icon: FileText,
    },
  ]

  const pricingTiers = [
    {
      name: "Single Coin",
      price: "$25",
      description: "Individual coin appraisal",
      features: ["Professional evaluation", "Written report", "Market value assessment", "48-hour turnaround"],
      popular: false,
    },
    {
      name: "Collection (5-20 coins)",
      price: "$15",
      priceNote: "per coin",
      description: "Small to medium collections",
      features: ["Bulk discount pricing", "Comprehensive report", "Insurance documentation", "Priority service"],
      popular: true,
    },
    {
      name: "Estate/Large Collection",
      price: "Custom",
      description: "20+ coins or complete estates",
      features: ["Custom pricing", "On-site evaluation available", "Detailed catalog", "Expert consultation"],
      popular: false,
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
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Coin Appraisal
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Get accurate, professional valuations for your coins from certified numismatists with over 30 years of
            experience.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-amber-600 mr-2" />
              Certified Experts
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
              48hr Turnaround
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-amber-600 mr-2" />
              Written Reports
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Appraisal Process</h2>
            <p className="text-xl text-gray-600">Professional, thorough, and reliable</p>
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

        {/* Pricing Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Appraisal Pricing</h2>
            <p className="text-xl text-gray-600">Transparent, competitive rates</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative ${tier.popular ? "ring-2 ring-amber-500 shadow-xl" : "hover:shadow-lg"} transition-all`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600 hover:bg-amber-700">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-amber-600">
                    {tier.price}
                    {tier.priceNote && <span className="text-sm text-gray-500 ml-1">{tier.priceNote}</span>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${tier.popular ? "bg-amber-600 hover:bg-amber-700" : ""}`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Appraisal Form */}
          <section>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-amber-600" />
                  Request Appraisal
                </CardTitle>
                <CardDescription>
                  Fill out the form below to get started with your professional coin appraisal
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
                      <Label htmlFor="appraisalType">Appraisal Type *</Label>
                      <Select
                        value={formData.appraisalType}
                        onValueChange={(value) => handleInputChange("appraisalType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {appraisalTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                      placeholder="Please provide detailed information about your coins including years, denominations, any special features, and reason for appraisal..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Next Steps:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• We'll review your submission within 24 hours</li>
                      <li>• Send detailed photos via email for evaluation</li>
                      <li>• Receive your professional appraisal report</li>
                      <li>• Payment due upon completion</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg">
                    Submit Appraisal Request
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
                  <Star className="h-5 w-5 mr-2 text-amber-600" />
                  Why Choose Our Appraisal Service?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Certified Expertise</h4>
                      <p className="text-gray-600 text-sm">
                        Our numismatists are certified by leading professional organizations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Insurance Accepted</h4>
                      <p className="text-gray-600 text-sm">
                        Our appraisals are accepted by all major insurance companies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Detailed Documentation</h4>
                      <p className="text-gray-600 text-sm">Comprehensive reports with photos and market analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Fast Turnaround</h4>
                      <p className="text-gray-600 text-sm">Most appraisals completed within 48 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What You'll Receive</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional written appraisal report</li>
                  <li>• High-resolution photographs</li>
                  <li>• Current market value assessment</li>
                  <li>• Historical significance notes</li>
                  <li>• Condition and grading details</li>
                  <li>• Insurance replacement values</li>
                  <li>• Expert recommendations</li>
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
                    <h4 className="font-semibold text-gray-900 mb-1">How long does an appraisal take?</h4>
                    <p className="text-gray-600 text-sm">
                      Most appraisals are completed within 48 hours of receiving clear photos.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Do I need to send my coins?</h4>
                    <p className="text-gray-600 text-sm">
                      No, we can provide accurate appraisals from high-quality photographs in most cases.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Are your appraisals legally binding?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes, our certified appraisals are accepted by insurance companies and legal institutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* TikTok CTA - moved outside container */}
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

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
import { ArrowLeft, Shield, Search, Award, Clock, CheckCircle, AlertTriangle, Star, Play } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function AuthenticationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coinType: "",
    suspectedIssue: "",
    description: "",
    urgency: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const suspectedIssues = [
    "Counterfeit Coin",
    "Altered Date",
    "Added Mintmark",
    "Cleaned/Polished",
    "Repaired Damage",
    "Wrong Metal Content",
    "Suspicious Provenance",
    "General Verification",
  ]

  const urgencyLevels = ["Standard (5-7 days)", "Priority (2-3 days)", "Express (24 hours)"]

  const coinTypes = [
    "Pre-Decimal Australian Coins",
    "Decimal Australian Coins",
    "Gold Coins & Sovereigns",
    "Silver Coins",
    "Commemorative Coins",
    "Proof Sets",
    "Rare/Key Dates",
    "Foreign Coins",
    "Banknotes",
  ]

  const process = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "Submit detailed photos and description of suspected issues",
      icon: Search,
    },
    {
      step: 2,
      title: "Expert Analysis",
      description: "Our specialists examine using advanced authentication tools",
      icon: Award,
    },
    {
      step: 3,
      title: "Verification Report",
      description: "Receive detailed authentication certificate with findings",
      icon: Shield,
    },
    {
      step: 4,
      title: "Follow-up Support",
      description: "Ongoing consultation and advice based on results",
      icon: CheckCircle,
    },
  ]

  const authenticationMethods = [
    {
      name: "Visual Inspection",
      description: "Detailed examination of design elements, typography, and overall appearance",
      icon: Search,
    },
    {
      name: "Weight & Dimensions",
      description: "Precise measurements compared to official specifications",
      icon: Award,
    },
    {
      name: "Metal Analysis",
      description: "Non-destructive testing to verify metal content and composition",
      icon: Shield,
    },
    {
      name: "Edge Examination",
      description: "Analysis of edge lettering, reeding, and manufacturing marks",
      icon: CheckCircle,
    },
  ]

  const pricingTiers = [
    {
      name: "Standard Authentication",
      price: "$75",
      description: "Complete authentication service",
      turnaround: "5-7 business days",
      features: ["Visual inspection", "Weight/dimension check", "Written certificate", "Photo documentation"],
      popular: false,
    },
    {
      name: "Priority Service",
      price: "$125",
      description: "Expedited authentication",
      turnaround: "2-3 business days",
      features: ["All standard features", "Priority processing", "Metal analysis", "Phone consultation"],
      popular: true,
    },
    {
      name: "Express Service",
      price: "$200",
      description: "Emergency authentication",
      turnaround: "24 hours",
      features: ["All priority features", "Same-day processing", "Detailed report", "Expert consultation"],
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
            Coin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Authentication
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Protect your investment with professional authentication services. Our experts use advanced techniques to
            verify authenticity and detect counterfeits.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-amber-600 mr-2" />
              100% Accurate
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-amber-600 mr-2" />
              Certified Process
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
              Fast Results
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="mb-16">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="py-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Why Authentication Matters</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    The coin market has seen an increase in sophisticated counterfeits. Professional authentication
                    protects you from financial loss and ensures the integrity of your collection. Don't risk purchasing
                    or selling unverified coins.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Authentication Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Authentication Methods</h2>
            <p className="text-xl text-gray-600">Advanced techniques for accurate verification</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {authenticationMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Process</h2>
            <p className="text-xl text-gray-600">Thorough and systematic verification</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Pricing</h2>
            <p className="text-xl text-gray-600">Choose the service level that meets your needs</p>
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
                  <div className="text-3xl font-bold text-amber-600">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                  <Badge variant="outline" className="mx-auto">
                    {tier.turnaround}
                  </Badge>
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
                    Select Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Authentication Form */}
          <section>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-amber-600" />
                  Request Authentication
                </CardTitle>
                <CardDescription>Submit your coin for professional authentication and verification</CardDescription>
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
                      <Label htmlFor="urgency">Service Level *</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

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
                    <Label htmlFor="suspectedIssue">Suspected Issue</Label>
                    <Select
                      value={formData.suspectedIssue}
                      onValueChange={(value) => handleInputChange("suspectedIssue", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select if known" />
                      </SelectTrigger>
                      <SelectContent>
                        {suspectedIssues.map((issue) => (
                          <SelectItem key={issue} value={issue}>
                            {issue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please describe the coin in detail, including any concerns about authenticity, where it was acquired, and any specific features you'd like us to examine..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Photo Requirements:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• High-resolution photos of both sides</li>
                      <li>• Close-up of edge and any suspicious areas</li>
                      <li>• Photos in good lighting without flash</li>
                      <li>• Include any packaging or certificates</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg">
                    Submit Authentication Request
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
                  Common Counterfeits We Detect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Cast Counterfeits</h4>
                      <p className="text-gray-600 text-sm">
                        Coins made from molds of genuine pieces, often with telltale casting marks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Altered Dates</h4>
                      <p className="text-gray-600 text-sm">Common dates modified to appear as rare key dates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Added Mintmarks</h4>
                      <p className="text-gray-600 text-sm">Mintmarks added to increase perceived rarity and value</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Wrong Metal Content</h4>
                      <p className="text-gray-600 text-sm">Coins made with incorrect metals or plating</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Comprehensive authenticity certificate</li>
                  <li>• Detailed examination report</li>
                  <li>• High-resolution documentation photos</li>
                  <li>• Specific findings and observations</li>
                  <li>• Market impact assessment</li>
                  <li>• Recommendations for next steps</li>
                  <li>• Follow-up consultation included</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Red Flags to Watch For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Unusually low prices for rare coins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Poor quality images in listings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Sellers reluctant to provide details</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">No return policy or guarantees</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* TikTok CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-purple-800 rounded-lg">
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
    </div>
  )
}

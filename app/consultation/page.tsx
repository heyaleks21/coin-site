"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, BookOpen, TrendingUp, CheckCircle, Star, Award, MessageSquare } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "",
    experience: "",
    budget: "",
    timeframe: "",
    description: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const consultationTypes = [
    "Collection Building Strategy",
    "Investment Advice",
    "Estate Planning",
    "Collection Organization",
    "Market Analysis",
    "Buying/Selling Guidance",
    "Insurance & Protection",
    "Inheritance Assessment",
  ]

  const experienceLevels = [
    "Complete Beginner",
    "Some Knowledge",
    "Intermediate Collector",
    "Advanced Collector",
    "Professional/Dealer",
  ]

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
  ]

  const timeframes = [
    "Immediate (within 1 week)",
    "Short-term (1-3 months)",
    "Medium-term (3-12 months)",
    "Long-term (1+ years)",
  ]

  const services = [
    {
      title: "Collection Strategy",
      description: "Develop a focused collecting plan based on your interests, budget, and goals",
      icon: BookOpen,
      features: ["Personalized collecting plan", "Market research", "Goal setting", "Timeline development"],
    },
    {
      title: "Investment Guidance",
      description: "Expert advice on coins with strong investment potential and market trends",
      icon: TrendingUp,
      features: ["Market analysis", "Investment recommendations", "Risk assessment", "Portfolio review"],
    },
    {
      title: "Estate Planning",
      description: "Comprehensive planning for coin collection inheritance and legacy preservation",
      icon: Users,
      features: ["Valuation planning", "Succession strategies", "Tax considerations", "Documentation"],
    },
    {
      title: "Expert Mentoring",
      description: "One-on-one guidance from experienced numismatists to accelerate your learning",
      icon: Award,
      features: ["Personal mentorship", "Skill development", "Market insights", "Network access"],
    },
  ]

  const pricingOptions = [
    {
      name: "Phone Consultation",
      price: "$150",
      duration: "1 hour",
      description: "Initial consultation call",
      features: ["Expert advice", "Q&A session", "Follow-up notes", "Resource recommendations"],
      popular: false,
    },
    {
      name: "Comprehensive Review",
      price: "$350",
      duration: "2-3 hours",
      description: "In-depth consultation package",
      features: ["Detailed analysis", "Written report", "Action plan", "30-day follow-up"],
      popular: true,
    },
    {
      name: "Ongoing Mentorship",
      price: "$500",
      duration: "Monthly",
      description: "Regular guidance and support",
      features: ["Monthly consultations", "Email support", "Market updates", "Priority access"],
      popular: false,
    },
  ]

  const expertProfiles = [
    {
      name: "Filip Manevski",
      title: "Founder & Chief Numismatist",
      experience: "30+ years",
      specialties: ["Pre-decimal coins", "Investment strategy", "Estate planning"],
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Aleks Manevski",
      title: "Senior Coin Specialist",
      experience: "15+ years",
      specialties: ["Modern commemoratives", "Market trends", "Collection building"],
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Stefano Dinino",
      title: "Authentication Expert",
      experience: "20+ years",
      specialties: ["Gold coins", "Portfolio management", "Risk assessment"],
      image: "/placeholder.svg?height=200&width=200",
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
            Expert{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Consultation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Get personalized guidance from experienced numismatists. Whether you're starting your collection or planning
            your investment strategy, our experts are here to help.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-amber-600 mr-2" />
              Expert Guidance
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-amber-600 mr-2" />
              Personalized Advice
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-amber-600 mr-2" />
              Strategic Planning
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Consultation Services</h2>
            <p className="text-xl text-gray-600">Comprehensive guidance for every collector</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Expert Profiles */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Experts</h2>
            <p className="text-xl text-gray-600">Experienced professionals ready to guide you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {expertProfiles.map((expert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image
                    src={expert.image || "/placeholder.svg"}
                    alt={expert.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <CardTitle className="text-xl">{expert.name}</CardTitle>
                  <CardDescription className="text-amber-600 font-semibold">{expert.title}</CardDescription>
                  <Badge variant="secondary">{expert.experience}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Specialties:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {expert.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Consultation Pricing</h2>
            <p className="text-xl text-gray-600">Flexible options to meet your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingOptions.map((option, index) => (
              <Card
                key={index}
                className={`relative ${option.popular ? "ring-2 ring-amber-500 shadow-xl" : "hover:shadow-lg"} transition-all`}
              >
                {option.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600 hover:bg-amber-700">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <div className="text-3xl font-bold text-amber-600">{option.price}</div>
                  <CardDescription>{option.description}</CardDescription>
                  <Badge variant="outline">{option.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${option.popular ? "bg-amber-600 hover:bg-amber-700" : ""}`}>
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Consultation Form */}
          <section>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-amber-600" />
                  Book Your Consultation
                </CardTitle>
                <CardDescription>Tell us about your needs and we'll match you with the right expert</CardDescription>
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
                      <Label htmlFor="consultationType">Consultation Type *</Label>
                      <Select
                        value={formData.consultationType}
                        onChange={(value) => handleInputChange("consultationType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onChange={(e) => handleInputChange("budget", e.target.value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select value={formData.timeframe} onChange={(e) => handleInputChange("timeframe", e.target.value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeframes.map((frame) => (
                          <SelectItem key={frame} value={frame}>
                            {frame}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Goals & Questions *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please describe your collecting goals, specific questions, or areas where you need guidance..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">What to Expect:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• We'll match you with the most suitable expert</li>
                      <li>• Receive confirmation within 24 hours</li>
                      <li>• Flexible scheduling to fit your availability</li>
                      <li>• Follow-up resources and recommendations</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg">
                    Request Consultation
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
                  Why Choose Our Consultation?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Personalized Approach</h4>
                      <p className="text-gray-600 text-sm">
                        Every consultation is tailored to your specific needs and goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Proven Track Record</h4>
                      <p className="text-gray-600 text-sm">
                        Our experts have helped hundreds of collectors achieve their goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Ongoing Support</h4>
                      <p className="text-gray-600 text-sm">
                        Continued guidance and support beyond the initial consultation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Confidential & Secure</h4>
                      <p className="text-gray-600 text-sm">
                        Your information and collection details are always kept private
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who Can Benefit?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• New collectors seeking guidance</li>
                  <li>• Experienced collectors looking to refine strategy</li>
                  <li>• Investors interested in numismatic assets</li>
                  <li>• Individuals managing inherited collections</li>
                  <li>• Anyone needing expert advice on coin-related matters</li>
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
                    <h4 className="font-semibold text-gray-900 mb-1">How do I prepare for a consultation?</h4>
                    <p className="text-gray-600 text-sm">
                      Think about your goals and questions. Having a list of coins or areas of interest helps.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Can I choose my expert?</h4>
                    <p className="text-gray-600 text-sm">
                      We match you with the best expert based on your needs, but you can request a specific one.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">What if I need ongoing support?</h4>
                    <p className="text-gray-600 text-sm">
                      We offer mentorship packages for continuous guidance and support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageSquare, Play } from "lucide-react"
import Image from "next/image"
import Navigation from "@/components/Navigation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      detail: "1300 COINS (26467)",
      description: "Mon-Fri, 9am-5pm AEST",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "info@aussiecoins.com.au",
      description: "We aim to respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      detail: "Adelaide, South Australia",
      description: "By appointment only for security",
    },
    {
      icon: Clock,
      title: "Operating Hours",
      detail: "Mon-Fri: 9am - 5pm AEST",
      description: "Closed on weekends and public holidays",
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
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We're here to help with all your numismatic needs. Reach out to us through any of the methods below.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-amber-600 mr-2" />
              Phone Support
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-amber-600 mr-2" />
              Email Us
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-amber-600 mr-2" />
              Visit Us (by appt.)
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <section>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-amber-600" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
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

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Regarding your inquiry..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Type your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-amber-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.detail}</p>
                        <p className="text-gray-500 text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Map of Adelaide, South Australia"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <p className="text-white text-lg font-bold">Adelaide, South Australia</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  Visits by appointment only to ensure personalized service and security.
                </p>
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

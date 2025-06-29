"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Star, Gift, Shield, Users, Package, CheckCircle, ArrowRight, Trophy, MessageCircle } from "lucide-react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function VIPClubPage() {
  const [selectedTickets, setSelectedTickets] = useState(1)

  const memberStats = {
    totalMembers: 847,
    monthlyBoxes: 12,
    exclusiveGiveaways: 24,
    totalSavings: 15420,
  }

  const currentPerks = [
    {
      title: "Monthly Collector's Box",
      description: "Curated rare coins and collectibles worth $50+ delivered monthly",
      icon: <Package className="h-5 w-5" />,
      value: "$50+",
    },
    {
      title: "VIP-Only Giveaways",
      description: "Exclusive monthly giveaways with premium prizes up to $2,000",
      icon: <Trophy className="h-5 w-5" />,
      value: "$2,000",
    },
    {
      title: "Free Authentication",
      description: "Professional coin grading and authentication service included",
      icon: <Shield className="h-5 w-5" />,
      value: "$25/coin",
    },
    {
      title: "Expert Consultations",
      description: "Monthly video calls with certified numismatic experts",
      icon: <MessageCircle className="h-5 w-5" />,
      value: "$100/session",
    },
  ]

  const pricingOptions = [
    {
      tickets: 1,
      price: 19.99,
      savings: 0,
      popular: false,
    },
    {
      tickets: 3,
      price: 54.99,
      savings: 5.0,
      popular: true,
    },
    {
      tickets: 6,
      price: 99.99,
      savings: 19.95,
      popular: false,
    },
    {
      tickets: 12,
      price: 179.99,
      savings: 59.89,
      popular: false,
    },
  ]

  const recentMembers = [
    {
      name: "Sarah M.",
      location: "Melbourne",
      joined: "2 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "David C.",
      location: "Sydney",
      joined: "1 week ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Emma T.",
      location: "Brisbane",
      joined: "2 weeks ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const testimonials = [
    {
      name: "Michael Rodriguez",
      location: "Perth, WA",
      text: "The monthly boxes are incredible! I've received coins I never would have found on my own. The authentication service has saved me from several bad purchases.",
      rating: 5,
      memberSince: "8 months",
    },
    {
      name: "Jennifer Walsh",
      location: "Adelaide, SA",
      text: "Being a VIP member has completely changed my collecting game. The expert consultations helped me focus my collection and make smarter investments.",
      rating: 5,
      memberSince: "1 year",
    },
    {
      name: "Robert Kim",
      location: "Canberra, ACT",
      text: "The VIP giveaways are amazing - I've won two incredible pieces already! Plus the 15% discount pays for itself with just one decent purchase.",
      rating: 5,
      memberSince: "6 months",
    },
  ]

  const selectedOption = pricingOptions.find((option) => option.tickets === selectedTickets)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30">
              <Crown className="h-4 w-4 mr-2" />
              Exclusive Membership
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">VIP Collectors Club</h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join Australia's most exclusive coin collecting community. Get monthly curated boxes, VIP-only giveaways,
              and expert guidance to elevate your collection.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{memberStats.totalMembers}</div>
                <div className="text-sm text-blue-200">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{memberStats.monthlyBoxes}</div>
                <div className="text-sm text-blue-200">Monthly Boxes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{memberStats.exclusiveGiveaways}</div>
                <div className="text-sm text-blue-200">VIP Giveaways</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">
                  ${memberStats.totalSavings.toLocaleString()}
                </div>
                <div className="text-sm text-blue-200">Member Savings</div>
              </div>
            </div>

            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Crown className="h-5 w-5 mr-2" />
              Join VIP Club
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="membership" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="membership">Membership Benefits</TabsTrigger>
              <TabsTrigger value="testimonials">Member Stories</TabsTrigger>
              <TabsTrigger value="faq">How It Works</TabsTrigger>
            </TabsList>

            <TabsContent value="membership" className="space-y-8">
              {/* Current Perks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {currentPerks.map((perk, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="mx-auto mb-3 p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full text-white w-fit">
                        {perk.icon}
                      </div>
                      <CardTitle className="text-lg">{perk.title}</CardTitle>
                      <Badge variant="secondary" className="mx-auto w-fit">
                        Value: {perk.value}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{perk.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Membership Options */}
              <Card className="p-6">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Choose Your Membership</CardTitle>
                  <CardDescription>
                    Select how many months you'd like to join for. Longer commitments save you more!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {pricingOptions.map((option) => (
                      <Card
                        key={option.tickets}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedTickets === option.tickets ? "ring-2 ring-purple-500 bg-purple-50" : ""
                        } ${option.popular ? "border-purple-500" : ""}`}
                        onClick={() => setSelectedTickets(option.tickets)}
                      >
                        {option.popular && (
                          <div className="bg-purple-500 text-white text-xs font-semibold text-center py-1 rounded-t-lg">
                            Most Popular
                          </div>
                        )}
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold">
                            {option.tickets} Month{option.tickets > 1 ? "s" : ""}
                          </div>
                          <div className="text-3xl font-bold text-purple-600 my-2">${option.price}</div>
                          {option.savings > 0 && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Save ${option.savings.toFixed(2)}
                            </Badge>
                          )}
                          <div className="text-sm text-muted-foreground mt-2">
                            ${(option.price / option.tickets).toFixed(2)}/month
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Gift className="h-5 w-5 mr-2 text-purple-600" />
                      Your VIP Membership Includes:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">Monthly collector's box ($50+ value)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">VIP-only giveaway entries</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">Free coin authentication service</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">15% discount on all purchases</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">Monthly expert consultations</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">Priority customer support</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Crown className="h-5 w-5 mr-2" />
                      Join for ${selectedOption?.price}
                      {selectedOption && selectedOption.savings > 0 && (
                        <span className="ml-2 text-yellow-200">(Save ${selectedOption.savings.toFixed(2)})</span>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-3">
                      30-day money-back guarantee • Cancel anytime • Secure payment
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Members
                  </CardTitle>
                  <CardDescription>Join these collectors who recently became VIP members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.location}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {member.joined}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">What Our VIP Members Say</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from real collectors who have transformed their collecting experience with VIP membership.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                        </div>
                        <Badge variant="outline">Member {testimonial.memberSince}</Badge>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Join These Happy Members
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">How VIP Membership Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to know about joining and enjoying your VIP membership benefits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-purple-600" />
                      Monthly Collector's Box
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Every month, we curate a special box containing 3-5 rare coins, collectibles, or numismatic items.
                      Each box has a minimum value of $50, often exceeding $100.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Recent box highlights:</p>
                      <ul className="text-xs text-purple-700 mt-1 space-y-1">
                        <li>• 1966 Round 50c coin (uncirculated)</li>
                        <li>• Limited edition commemorative set</li>
                        <li>• Vintage coin collecting accessories</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-purple-600" />
                      VIP-Only Giveaways
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Exclusive monthly giveaways with premium prizes worth up to $2,000. VIP members get automatic
                      entries plus bonus entries for engagement.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Current VIP giveaway:</p>
                      <p className="text-xs text-purple-700 mt-1">
                        1920 Sovereign Gold Coin (valued at $1,200) - Drawing December 31st
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-purple-600" />
                      Authentication Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Get up to 5 coins professionally authenticated and graded each month. Simply send us photos or
                      mail your coins with our prepaid shipping labels.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Service includes:</p>
                      <ul className="text-xs text-purple-700 mt-1 space-y-1">
                        <li>• Professional grading certificate</li>
                        <li>• Market value assessment</li>
                        <li>• Authenticity verification</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
                      Expert Consultations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Monthly 30-minute video calls with certified numismatic experts. Get personalized advice on
                      collecting strategies, market trends, and investment opportunities.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Popular consultation topics:</p>
                      <ul className="text-xs text-purple-700 mt-1 space-y-1">
                        <li>• Collection focus and strategy</li>
                        <li>• Market timing and investment advice</li>
                        <li>• Authentication and grading questions</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Can I cancel my membership anytime?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! You can cancel your VIP membership at any time. There are no cancellation fees, and you'll
                      continue to receive benefits until the end of your current billing period.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What if I don't like my monthly box?</h4>
                    <p className="text-sm text-muted-foreground">
                      We offer a 30-day satisfaction guarantee. If you're not happy with your first box, we'll provide a
                      full refund, no questions asked.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">How does shipping work?</h4>
                    <p className="text-sm text-muted-foreground">
                      All VIP members receive free express shipping on monthly boxes and all catalog orders. Boxes
                      typically arrive within 3-5 business days of shipping.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Start Your VIP Journey
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Join {memberStats.totalMembers}+ collectors already enjoying VIP benefits
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}

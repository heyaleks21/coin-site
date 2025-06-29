"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Calendar,
  Clock,
  Gift,
  Star,
  Ticket,
  Trophy,
  Users,
  Zap,
  CheckCircle,
  Timer,
  DollarSign,
} from "lucide-react"
import Navigation from "@/components/Navigation"

// Mock data - in real app this would come from your database
const currentGiveaways = [
  {
    id: 1,
    title: "1964 Round 50 Cent Coin",
    description:
      "Extremely rare 1964 Australian Round 50 cent coin in excellent condition. One of the most sought-after coins in Australian numismatics.",
    image: "/placeholder.svg?height=300&width=300&text=1964+50c",
    estimatedValue: 2500,
    ticketPrice: 5,
    totalTickets: 2000,
    soldTickets: 847,
    endDate: "2024-07-15T23:59:59",
    status: "active",
    features: ["Uncirculated condition", "Certificate of authenticity", "Protective case included"],
    rarity: "Extremely Rare",
  },
  {
    id: 2,
    title: "Complete $2 Commemorative Set",
    description:
      "Complete collection of Australian $2 commemorative coins from 1988-2024, including all special releases and limited editions.",
    image: "/placeholder.svg?height=300&width=300&text=$2+Set",
    estimatedValue: 850,
    ticketPrice: 3,
    totalTickets: 1500,
    soldTickets: 234,
    endDate: "2024-07-22T23:59:59",
    status: "active",
    features: ["35+ coins included", "Display album", "Detailed catalog"],
    rarity: "Complete Set",
  },
]

const pastWinners = [
  {
    id: 1,
    title: "1930 Penny Replica Set",
    winner: "Sarah M.",
    location: "Melbourne, VIC",
    date: "2024-06-28",
    image: "/placeholder.svg?height=200&width=200&text=1930+Penny",
    value: 450,
  },
  {
    id: 2,
    title: "ANZAC Commemorative Collection",
    winner: "David K.",
    location: "Brisbane, QLD",
    date: "2024-06-21",
    image: "/placeholder.svg?height=200&width=200&text=ANZAC",
    value: 320,
  },
  {
    id: 3,
    title: "Olympic Games Coin Set",
    winner: "Emma L.",
    location: "Perth, WA",
    date: "2024-06-14",
    image: "/placeholder.svg?height=200&width=200&text=Olympics",
    value: 275,
  },
]

export default function GiveawaysPage() {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({})

  // Calculate time remaining for each giveaway
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {}

      currentGiveaways.forEach((giveaway) => {
        const now = new Date().getTime()
        const endTime = new Date(giveaway.endDate).getTime()
        const difference = endTime - now

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

          newTimeLeft[giveaway.id] = `${days}d ${hours}h ${minutes}m`
        } else {
          newTimeLeft[giveaway.id] = "Ended"
        }
      })

      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleTicketChange = (giveawayId: number, tickets: number) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [giveawayId]: tickets,
    }))
  }

  const calculateTotal = (giveawayId: number) => {
    const giveaway = currentGiveaways.find((g) => g.id === giveawayId)
    const tickets = selectedTickets[giveawayId] || 1
    return giveaway ? giveaway.ticketPrice * tickets : 0
  }

  const getTicketPackages = (ticketPrice: number) => [
    { tickets: 1, price: ticketPrice, savings: 0 },
    { tickets: 5, price: ticketPrice * 4, savings: ticketPrice },
    { tickets: 10, price: ticketPrice * 7, savings: ticketPrice * 3 },
    { tickets: 25, price: ticketPrice * 15, savings: ticketPrice * 10 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-white" />
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Coin Giveaways</h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Win rare and valuable Australian coins! Enter our weekly giveaways for a chance to own numismatic treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              <span className="font-semibold">2,847 participants this week</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5" />
              <span className="font-semibold">$12,500+ in prizes given away</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger value="current" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Current
              </TabsTrigger>
              <TabsTrigger value="winners" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Winners
              </TabsTrigger>
              <TabsTrigger value="how-it-works" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                How It Works
              </TabsTrigger>
            </TabsList>

            {/* Current Giveaways */}
            <TabsContent value="current" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Active Giveaways</h2>
                <p className="text-lg text-gray-600">Enter now for your chance to win these amazing prizes!</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {currentGiveaways.map((giveaway) => (
                  <Card key={giveaway.id} className="overflow-hidden shadow-xl border-0">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center p-8">
                        <Image
                          src={giveaway.image || "/placeholder.svg"}
                          alt={giveaway.title}
                          width={300}
                          height={300}
                          className="max-w-full max-h-full object-contain drop-shadow-lg"
                        />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                          <Timer className="w-4 h-4 mr-1" />
                          {timeLeft[giveaway.id] || "Loading..."}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-amber-500 text-white font-bold px-3 py-1">{giveaway.rarity}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{giveaway.title}</h3>
                        <p className="text-gray-600 mb-4">{giveaway.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              ${giveaway.estimatedValue.toLocaleString()}
                            </div>
                            <div className="text-sm text-green-700">Estimated Value</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">${giveaway.ticketPrice}</div>
                            <div className="text-sm text-blue-700">Per Ticket</div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Tickets Sold</span>
                            <span className="font-semibold">
                              {giveaway.soldTickets.toLocaleString()} / {giveaway.totalTickets.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={(giveaway.soldTickets / giveaway.totalTickets) * 100} className="h-2" />
                        </div>

                        <div className="space-y-2 mb-6">
                          <h4 className="font-semibold text-gray-900">What's Included:</h4>
                          <ul className="space-y-1">
                            {giveaway.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Ticket Selection */}
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Select Ticket Package:</h4>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {getTicketPackages(giveaway.ticketPrice).map((pkg) => (
                            <button
                              key={pkg.tickets}
                              onClick={() => handleTicketChange(giveaway.id, pkg.tickets)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                (selectedTickets[giveaway.id] || 1) === pkg.tickets
                                  ? "border-amber-500 bg-amber-50"
                                  : "border-gray-200 hover:border-amber-300"
                              }`}
                            >
                              <div className="text-center">
                                <div className="font-bold text-lg">
                                  {pkg.tickets} Ticket{pkg.tickets > 1 ? "s" : ""}
                                </div>
                                <div className="text-sm text-gray-600">${pkg.price}</div>
                                {pkg.savings > 0 && (
                                  <div className="text-xs text-green-600 font-semibold">Save ${pkg.savings}!</div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
                          <span className="font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-amber-600">${calculateTotal(giveaway.id)}</span>
                        </div>

                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold">
                          <Ticket className="w-5 h-5 mr-2" />
                          Buy {selectedTickets[giveaway.id] || 1} Ticket
                          {(selectedTickets[giveaway.id] || 1) > 1 ? "s" : ""}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Past Winners */}
            <TabsContent value="winners" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Winners</h2>
                <p className="text-lg text-gray-600">Congratulations to our lucky winners!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {pastWinners.map((winner) => (
                  <Card key={winner.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center p-6">
                      <Image
                        src={winner.image || "/placeholder.svg"}
                        alt={winner.title}
                        width={200}
                        height={200}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{winner.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold">{winner.winner}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(winner.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-green-600">${winner.value}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent"
                >
                  View All Winners
                </Button>
              </div>
            </TabsContent>

            {/* How It Works */}
            <TabsContent value="how-it-works" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600">Simple steps to enter and win amazing coins!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">1. Choose Tickets</h3>
                  <p className="text-gray-600">Select how many tickets you want to purchase for each giveaway.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">2. Secure Payment</h3>
                  <p className="text-gray-600">Complete your purchase using our secure payment system.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">3. Wait for Draw</h3>
                  <p className="text-gray-600">Giveaway ends at the specified time and winners are drawn randomly.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">4. Win & Collect</h3>
                  <p className="text-gray-600">Winners are notified and prizes are shipped free of charge!</p>
                </div>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Eligibility</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Must be 18+ years old</li>
                        <li>• Australian residents only</li>
                        <li>• One entry per ticket purchased</li>
                        <li>• No purchase necessary (free entry available)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Prize Details</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All prizes shipped free within Australia</li>
                        <li>• Winners notified within 24 hours</li>
                        <li>• Prizes include certificate of authenticity</li>
                        <li>• No cash alternative available</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      By participating, you agree to our{" "}
                      <Link href="/terms" className="text-amber-600 hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/giveaway-rules" className="text-amber-600 hover:underline">
                        Giveaway Rules
                      </Link>
                      .
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Win?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of coin enthusiasts competing for rare treasures every week!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-amber-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
              Enter Current Giveaways
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 text-lg font-semibold bg-transparent"
            >
              Join VIP Club
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

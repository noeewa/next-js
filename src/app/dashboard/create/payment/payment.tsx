"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  QrCode, 
  Shield, 
  Clock,
  Copy,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Payment methods
const paymentMethods = [
  { 
    id: "qris", 
    name: "QRIS", 
    description: "Scan QR Code dengan aplikasi banking",
    icon: QrCode
  },
  { 
    id: "transfer", 
    name: "Transfer Bank", 
    description: "Transfer via ATM atau mobile banking",
    icon: CreditCard
  },
]

// Pricing plans
const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 99000,
    period: "bulan",
    features: [
      "1 Chatbot",
      "500 pesan/bulan",
      "1 User",
      "Dasbor dasar",
      "Support email"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 249000,
    period: "bulan",
    popular: true,
    features: [
      "5 Chatbot",
      "5.000 pesan/bulan",
      "5 User",
      "Dasbor lengkap",
      "Priority support",
      "Custom branding"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499000,
    period: "bulan",
    features: [
      "Unlimited Chatbot",
      "Unlimited pesan",
      "Unlimited User",
      "API access",
      "Dedicated support",
      "Custom development"
    ]
  }
]

export default function PaymentPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [selectedPayment, setSelectedPayment] = useState("qris")
  const [isCopied, setIsCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | null>(null)

  const currentPlan = plans.find(p => p.id === selectedPlan)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentStatus("pending")
    setTimeout(() => {
      setPaymentStatus("success")
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 3000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (paymentStatus === "success") {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
            <p className="text-muted-foreground mb-6">
              Terima kasih, proyek Anda sedang diproses.
            </p>
            <Link href="/dashboard">
              <Button className="w-full">
                Ke Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/dashboard/create">
          <Button variant="ghost" size="icon" className="mt-0.5">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Pilih Paket Langganan</h1>
          <p className="text-muted-foreground text-sm">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Plans */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Paket Langganan</h2>
            <p className="text-muted-foreground text-sm">Pilih paket yang paling sesuai</p>
          </div>
          <div className="grid gap-4">
            <RadioGroup
              value={selectedPlan}
              onValueChange={setSelectedPlan}
              className="space-y-4"
            >
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPlan === plan.id 
                      ? "border-primary ring-1 ring-primary" 
                      : ""
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem 
                          value={plan.id} 
                          id={plan.id}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={plan.id} className="font-semibold cursor-pointer">
                              {plan.name}
                            </Label>
                            {plan.popular && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                                Populer
                              </span>
                            )}
                          </div>
                          <p className="text-2xl font-bold mt-1">
                            {formatPrice(plan.price)}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{plan.period}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <ul className="space-y-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Metode Pembayaran</h2>
          <RadioGroup
            value={selectedPayment}
            onValueChange={setSelectedPayment}
            className="grid gap-4 sm:grid-cols-2"
          >
            {paymentMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPayment === method.id 
                    ? "border-primary ring-1 ring-primary" 
                    : ""
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id}
                      className="mt-0.5"
                    />
                    <method.icon className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <Label htmlFor={method.id} className="font-medium cursor-pointer">
                        {method.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paket</span>
                <span className="font-medium">{currentPlan?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Harga</span>
                <span className="font-medium">{formatPrice(currentPlan?.price || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pajak (11%)</span>
                <span className="font-medium">{formatPrice((currentPlan?.price || 0) * 0.11)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">
                  {formatPrice((currentPlan?.price || 0) * 1.11)}
                </span>
              </div>

              <Separator />

              {/* Payment Instructions */}
              {selectedPayment === "transfer" && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Transfer ke:</p>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bank</span>
                      <span className="font-medium">BCA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">No. Rekening</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">1234567890</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => copyToClipboard("1234567890")}
                        >
                          {isCopied ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">A.n</span>
                      <span className="font-medium">PT AI Chatbot</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === "qris" && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Scan QR Code:</p>
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    {/* Mock QR Code */}
                    <div className="w-40 h-40 bg-muted rounded-lg flex items-center justify-center">
                      <QrCode className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Buka aplikasi banking dan scan QR ini
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Pembayaran aman dan terenkripsi</span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePayment}
                disabled={paymentStatus === "pending"}
              >
                {paymentStatus === "pending" ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Bayar Sekarang
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { ArrowRight, Sparkles, MessageCircle, Zap, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Lobby() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">ChatBot Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button>Daftar Gratis</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Buat Chatbot AI{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Tanpa Kode
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jual template chatbot AI yang siap pakai dengan teknologi terdepan. 
            Tingkatkan engagement pelanggan dan otomatisasi layanan dengan mudah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Mulai Gratis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Lihat Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div className="relative h-96 rounded-lg border border-border/50 bg-muted/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Preview Widget Chatbot</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Fitur Unggulan</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Semua alat yang Anda butuhkan untuk membuat dan mengelola chatbot AI profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Setup Instan",
                description: "Buat chatbot dalam hitungan menit tanpa perlu coding"
              },
              {
                icon: Users,
                title: "Manajemen Pengguna",
                description: "Kelola tim dan klien dengan mudah dari satu dashboard"
              },
              {
                icon: Shield,
                title: "Aman & Terpercaya",
                description: "Enkripsi tingkat enterprise untuk semua data Anda"
              },
              {
                icon: MessageCircle,
                title: "AI Cerdas",
                description: "Powered by Groq, OpenAI, dan Cerebras untuk hasil terbaik"
              },
              {
                icon: Sparkles,
                title: "Kustomisasi Lengkap",
                description: "Sesuaikan warna, pesan, dan perilaku chatbot sepenuhnya"
              },
              {
                icon: ArrowRight,
                title: "Integrasi Mudah",
                description: "Embed ke website dengan satu baris kode saja"
              }
            ].map((feature, i) => (
              <Card key={i} className="border border-border/50">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Paket Harga Terjangkau</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "99.000",
              description: "Untuk pemula",
              features: ["1 Chatbot", "500 pesan/bulan", "Support email"]
            },
            {
              name: "Pro",
              price: "249.000",
              description: "Paling populer",
              features: ["5 Chatbot", "5.000 pesan/bulan", "Priority support", "Custom branding"],
              popular: true
            },
            {
              name: "Enterprise",
              price: "Kustom",
              description: "Untuk skala besar",
              features: ["Unlimited Chatbot", "Unlimited pesan", "Dedicated support", "API access"]
            }
          ].map((plan, i) => (
            <Card 
              key={i}
              className={`relative ${plan.popular ? 'border-primary ring-1 ring-primary' : 'border border-border/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Paling Populer
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-3xl font-bold">Rp {plan.price}</span>
                  <span className="text-muted-foreground text-sm">/bulan</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  Mulai Sekarang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Siap Memulai?</h2>
          <p className="text-lg opacity-90">
            Bergabunglah dengan ratusan penjual yang sudah menghasilkan revenue dari template chatbot mereka.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Daftar Gratis Sekarang <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 ChatBot Builder. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}

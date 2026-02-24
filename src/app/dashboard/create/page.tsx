"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Bot, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  FileText,
  ChevronRight,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Steps for project creation
const steps = [
  { id: 1, title: "Informasi Dasar", description: "Nama dan deskripsi proyek" },
  { id: 2, title: "Konfigurasi AI", description: "Pengaturan chatbot" },
  { id: 3, title: "Tampilan Widget", description: "Kustomisasi tampilan" },
]

// AI Provider options
const aiProviders = [
  { 
    id: "groq", 
    name: "Groq", 
    description: "Cepat dan efisien untuk percakapan",
    icon: "⚡"
  },
  { 
    id: "openai", 
    name: "OpenAI", 
    description: "GPT-4 untuk kualitas terbaik",
    icon: "🧠"
  },
  { 
    id: "cerebras", 
    name: "Cerebras", 
    description: "Kecepatan inferensi tertinggi",
    icon: "🚀"
  },
]

// Color options for widget
const colorOptions = [
  { id: "blue", hex: "#3b82f6" },
  { id: "green", hex: "#22c55e" },
  { id: "purple", hex: "#a855f7" },
  { id: "red", hex: "#ef4444" },
  { id: "orange", hex: "#f97316" },
  { id: "pink", hex: "#ec4899" },
]

// Position options
const positionOptions = [
  { id: "bottom-right", label: "Kanan Bawah" },
  { id: "bottom-left", label: "Kiri Bawah" },
  { id: "top-right", label: "Kanan Atas" },
  { id: "top-left", label: "Kiri Atas" },
]

export default function CreateProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    projectName: "",
    description: "",
    // Step 2: AI Config
    aiProvider: "groq",
    aiName: "AI Assistant",
    welcomeMessage: "Halo! Ada yang bisa saya bantu?",
    suggestedQuestions: "",
    // Step 3: Widget
    primaryColor: "#3b82f6",
    position: "bottom-right",
    theme: "light",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // In a real app, this would create the project in the backend
    console.log("Creating project with:", formData)
    router.push("/dashboard/create/payment")
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.projectName.length > 0
      case 2:
        return formData.aiName.length > 0
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Buat Proyek Baru</h1>
          <p className="text-muted-foreground">
            Buat chatbot AI kustom untuk bisnis Anda
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep > step.id 
                      ? "bg-green-500 text-white"
                      : currentStep === step.id 
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`font-medium ${currentStep === step.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Informasi Dasar Proyek"}
            {currentStep === 2 && "Konfigurasi AI"}
            {currentStep === 3 && "Kustomisasi Widget"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Berikan nama dan deskripsi untuk proyek chatbot Anda"}
            {currentStep === 2 && "Atur bagaimana chatbot akan beroperasi"}
            {currentStep === 3 && "Sesuaikan tampilan widget chat"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Nama Proyek *</Label>
                <Input
                  id="projectName"
                  placeholder="Contoh: Customer Service Bot"
                  value={formData.projectName}
                  onChange={(e) => updateFormData("projectName", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Nama ini akan ditampilkan di dashboard Anda
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan tujuan dan fungsi chatbot Anda..."
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 2: AI Config */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Provider AI</Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {aiProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent ${
                        formData.aiProvider === provider.id 
                          ? "border-primary bg-accent" 
                          : "border-transparent"
                      }`}
                      onClick={() => updateFormData("aiProvider", provider.id)}
                    >
                      <span className="text-3xl mb-2">{provider.icon}</span>
                      <span className="font-medium">{provider.name}</span>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {provider.description}
                      </p>
                      {formData.aiProvider === provider.id && (
                        <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aiName">Nama AI</Label>
                  <Input
                    id="aiName"
                    placeholder="Contoh: Assistant"
                    value={formData.aiName}
                    onChange={(e) => updateFormData("aiName", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="suggestedQuestions">Pertanyaan Saran</Label>
                  <Input
                    id="suggestedQuestions"
                    placeholder="Pisahkan dengan koma"
                    value={formData.suggestedQuestions}
                    onChange={(e) => updateFormData("suggestedQuestions", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Contoh: Cara memesan, Kebijakan pengembalian
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Pesan Pembuka</Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="Pesan yang akan ditampilkan saat pengguna pertama kali membuka chat..."
                  value={formData.welcomeMessage}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("welcomeMessage", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Widget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Warna Primer</Label>
                <div className="flex gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                        formData.primaryColor === color.hex ? "ring-2 ring-offset-2 ring-primary" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => updateFormData("primaryColor", color.hex)}
                    />
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Posisi Widget</Label>
                <RadioGroup
                  value={formData.position}
                  onValueChange={(value: string) => updateFormData("position", value)}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {positionOptions.map((pos) => (
                    <div key={pos.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={pos.id} id={pos.id} />
                      <Label htmlFor={pos.id} className="cursor-pointer">
                        {pos.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Tema</Label>
                <RadioGroup
                  value={formData.theme}
                  onValueChange={(value: string) => updateFormData("theme", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="cursor-pointer">Terang</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="cursor-pointer">Gelap</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Kembali
          </Button>
          
          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepValid()}
            >
              Lanjut
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Sparkles className="mr-2 h-4 w-4" />
              Buat Proyek
            </Button>
          )}
        </div>
      </Card>

      {/* Preview Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Pratinjau Widget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            {/* Mock Widget Preview */}
            <div 
              className="absolute bottom-4 right-4 p-4 rounded-lg shadow-lg"
              style={{ backgroundColor: formData.primaryColor }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-medium">{formData.aiName || "AI Assistant"}</p>
                  <p className="text-xs text-white/80">Online</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

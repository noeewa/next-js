/**
 * AI Provider Configuration
 */
export const AI_PROVIDERS = [
  {
    id: 'groq',
    name: 'Groq',
    description: 'Cepat dan efisien untuk percakapan real-time',
    icon: '⚡',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4 untuk kualitas respons terbaik',
    icon: '🧠',
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    description: 'Kecepatan inferensi tertinggi di kelasnya',
    icon: '🚀',
  },
]

/**
 * Widget Color Options
 */
export const WIDGET_COLORS = [
  { id: 'blue', hex: '#3b82f6', name: 'Blue' },
  { id: 'green', hex: '#22c55e', name: 'Green' },
  { id: 'purple', hex: '#a855f7', name: 'Purple' },
  { id: 'red', hex: '#ef4444', name: 'Red' },
  { id: 'orange', hex: '#f97316', name: 'Orange' },
  { id: 'pink', hex: '#ec4899', name: 'Pink' },
]

/**
 * Widget Position Options
 */
export const WIDGET_POSITIONS = [
  { id: 'bottom-right', label: 'Kanan Bawah' },
  { id: 'bottom-left', label: 'Kiri Bawah' },
  { id: 'top-right', label: 'Kanan Atas' },
  { id: 'top-left', label: 'Kiri Atas' },
]

/**
 * Pricing Plans
 */
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99000,
    period: 'bulan',
    features: ['1 Chatbot', '500 pesan/bulan', '1 User', 'Dasbor dasar', 'Support email'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 249000,
    period: 'bulan',
    popular: true,
    features: [
      '5 Chatbot',
      '5.000 pesan/bulan',
      '5 User',
      'Dasbor lengkap',
      'Priority support',
      'Custom branding',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499000,
    period: 'bulan',
    features: [
      'Unlimited Chatbot',
      'Unlimited pesan',
      'Unlimited User',
      'API access',
      'Dedicated support',
      'Custom development',
    ],
  },
]

/**
 * Payment Methods
 */
export const PAYMENT_METHODS = [
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Scan QR Code dengan aplikasi banking',
  },
  {
    id: 'transfer',
    name: 'Transfer Bank',
    description: 'Transfer via ATM atau mobile banking',
  },
]

/**
 * Navigation Items
 */
export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/dashboard/create', label: 'Buat Proyek', icon: 'Plus' },
  { href: '/dashboard/settings', label: 'Pengaturan', icon: 'Settings' },
]

/**
 * Features List
 */
export const FEATURES = [
  {
    title: 'Setup Instan',
    description: 'Buat chatbot dalam hitungan menit tanpa perlu coding',
    icon: 'Zap',
  },
  {
    title: 'Manajemen Pengguna',
    description: 'Kelola tim dan klien dengan mudah dari satu dashboard',
    icon: 'Users',
  },
  {
    title: 'Aman & Terpercaya',
    description: 'Enkripsi tingkat enterprise untuk semua data Anda',
    icon: 'Shield',
  },
  {
    title: 'AI Cerdas',
    description: 'Powered by Groq, OpenAI, dan Cerebras untuk hasil terbaik',
    icon: 'MessageCircle',
  },
  {
    title: 'Kustomisasi Lengkap',
    description: 'Sesuaikan warna, pesan, dan perilaku chatbot sepenuhnya',
    icon: 'Sparkles',
  },
  {
    title: 'Integrasi Mudah',
    description: 'Embed ke website dengan satu baris kode saja',
    icon: 'ArrowRight',
  },
]

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  projects: '/api/projects',
  createProject: '/api/projects/create',
  updateProject: '/api/projects/:id',
  deleteProject: '/api/projects/:id',
  chatbot: '/api/chatbot',
  payment: '/api/payment',
}

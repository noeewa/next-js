# UI Structure - ChatBot Builder

Dokumentasi struktur UI dan komponen yang telah diupdate untuk ChatBot Builder.

## 🎨 Design System

**Style Guidelines:**
- Framework: shadcn/ui + Tailwind CSS v4
- Font: Geist (sans), Geist Mono
- Icons: Lucide React
- Color System: Primary blue dengan neutral colors

## 📁 Routes & Pages

### Landing Page (`/`)
- Hero section dengan CTA buttons
- Features showcase dengan 6 fitur unggulan
- Pricing section dengan 3 paket
- Call-to-action section
- Navigation bar dengan login/register links

### Authentication Routes
- **Login** (`/login`) - Login form dengan Google OAuth option
- **Register** (`/register`) - Registration form dengan validasi

### Dashboard Routes
- **Dashboard** (`/dashboard`) - Overview dengan stats dan project list
- **Create Project** (`/dashboard/create`) - Multi-step form untuk membuat chatbot baru
  - Step 1: Basic Info (nama & deskripsi)
  - Step 2: AI Config (provider & settings)
  - Step 3: Widget Customization
- **Payment** (`/dashboard/create/payment`) - Pricing selection dan payment method
- **Project Detail** (`/dashboard/[projectName]`) - Project management dengan tabs
  - Overview
  - Chat Sessions
  - Knowledge Base
  - Settings
  - Embed Code

## 🔧 Components

### Reusable Components (`/src/components/`)

1. **PageHeader** - Header untuk halaman dengan title, description, dan action button
   ```tsx
   <PageHeader 
     title="Dashboard" 
     description="Kelola chatbot Anda"
     action={<Button>Buat Baru</Button>}
   />
   ```

2. **StatCard** - Card untuk menampilkan statistik dengan icon dan trend
   ```tsx
   <StatCard 
     title="Total Pesan"
     value="1.247"
     icon={MessageSquare}
     trend="+12% bulan ini"
     trendPositive={true}
   />
   ```

3. **EmptyState** - State kosong dengan icon, text, dan action
   ```tsx
   <EmptyState
     icon={Zap}
     title="Belum ada proyek"
     description="Mulai buat chatbot AI pertama Anda"
     action={{ label: "Buat Proyek", href: "/dashboard/create" }}
   />
   ```

4. **SectionHeader** - Header untuk section dengan title dan optional description
   ```tsx
   <SectionHeader 
     title="Paket Langganan"
     description="Pilih paket yang sesuai"
   />
   ```

## 📊 Data Types (`/src/types/project.ts`)

```typescript
- Project
- ChatSession
- Document
- PricingPlan
```

## 🎯 Layout Structure

### Main Layout
- Responsive grid system menggunakan Tailwind
- Mobile-first approach dengan responsive prefixes (md:, lg:)
- Flexbox untuk alignment dan spacing

### Dashboard Layout
- Sidebar navigation (desktop)
- Mobile hamburger menu
- User dropdown menu
- Responsive container padding

## 🎨 Color & Typography

**Color Tokens:**
- Primary: Blue (#3b82f6)
- Background: White/Dark gray
- Text: Foreground/Muted-foreground
- Accent: Primary color variants

**Typography:**
- H1: 3xl font-bold
- H2: 2xl font-bold
- H3: lg font-bold
- Body: base/sm text-foreground
- Muted: text-muted-foreground

## 📱 Responsive Breakpoints

- Mobile: < 640px (default)
- Tablet: md: (768px+)
- Desktop: lg: (1024px+)

## ✨ Key Features

1. **Dark Mode Support** - Semua komponen mendukung dark mode
2. **Accessibility** - Semantic HTML, ARIA roles, keyboard navigation
3. **Performance** - Client components hanya untuk interaktif content
4. **Responsive** - Mobile-first design yang responsive di semua ukuran

## 🚀 Next Steps

1. Tambahkan data persistence (database integration)
2. Implement authentication flow
3. Add loading states dan error handling
4. Create modal/dialog components untuk actions
5. Add form validation
6. Implement real-time updates

---

Last Updated: 2024

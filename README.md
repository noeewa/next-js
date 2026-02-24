# Next.js + shadcn/ui

Proyek Next.js dengan shadcn/ui dan Tailwind CSS.

## Teknologi

- **Next.js 16** - Framework React
- **shadcn/ui** - Komponen UI yang dapat disesuaikan
- **Tailwind CSS 4** - Utility-first CSS
- **JavaScript : TypeScript** - Bahasa pemrograman
- **Groq-sdk** --

## Mulai

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
src/
├── app/           # Next.js App Router
├── components/   # Komponen UI
│   └── ui/       # Komponen shadcn/ui
└── lib/          # Utilities
```

## Menambah Komponen

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Perintah

| Perintah | Deskripsi |
|----------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk produksi |
| `npm run start` | Jalankan production build |
| `npm run lint` | Run ESLint |

## Referensi

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)


## 🏗️ Architecture

```
┌────────────────────┐
│    User Browser    │
└─────────┬──────────┘
          │
     ┌────▼────┐
     │ Next.js │  (App Router)
     │ Frontend│  (page.tsx, layout.tsx)
     └────┬────┘
          │
     ┌────▼─────────────────────┐
     │ Firebase Auth (Client)   │
     │ + Firebase SDK           │
     └────┬─────────────────────┘
          │
     ┌────▼──────────────────────┐
     │ Next.js Route Handler API │
     │ /api/ai/route.ts          │
     └────┬──────────────────────┘
          │
     ┌────▼───────────────┐
     │ AI APIs (Groq /    │
     │ Cerebras / OpenAI) │
     └────────────────────┘
```
## 🏗️ Information Architecture


Marketing Mode (Pre-Auth)
   ├── Landing Page
   ├── Features
   ├── CTA / Register
   └── Public Information

Authentication Mode
   ├── Login (Email / Google)
   ├── Register
   ├── Session Management
   └── Role Detection (User / Admin)

User Product Mode
   ├── Dashboard Overview
   ├── Knowledge Base
   │     ├── Upload Document
   │     ├── Training Status
   │     └── Document Management
   ├── AI Preview
   │     ├── Chat Simulation
   │     └── Context Injection
   ├── Form Builder
   │     ├── Field Builder
   │     ├── Schema Storage
   │     └── Submission Management
   ├── Embed System
   │     ├── Script Generator
   │     ├── Floating Button
   │     └── Iframe Injection
   └── Settings
         ├── Chatbot Config
         ├── Theme / Branding
         └── Account Management

Public Runtime Mode
   ├── Chatbot Embed (Client Website)
   └── Public Form Page

Admin Mode
   ├── User Management
   ├── Platform Analytics
   ├── System Moderation
   └── Global Configuration

## 🏗️ User Flow
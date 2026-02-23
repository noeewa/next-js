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

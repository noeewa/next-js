# Developer Guide - ChatBot Builder

Panduan lengkap untuk mengembangkan dan mengakses fitur di ChatBot Builder.

## 📚 Table of Contents

- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Styling System](#styling-system)
- [Adding New Features](#adding-new-features)
- [Common Patterns](#common-patterns)

## 📁 Project Structure

```
src/
├── app/                          # Next.js 16 App Router
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── register/
│   │   └── page.tsx             # Register page
│   └── dashboard/
│       ├── page.tsx             # Dashboard overview
│       ├── layout.tsx           # Dashboard layout dengan sidebar
│       ├── create/
│       │   ├── page.tsx         # Create project page
│       │   └── payment/
│       │       ├── page.tsx     # Payment page wrapper
│       │       └── payment.tsx  # Payment component
│       └── [projectName]/
│           ├── page.tsx         # Project detail wrapper
│           ├── project.tsx      # Project detail component
│           └── status/
│               └── statusPayment.tsx
│
├── components/
│   ├── ui/                      # shadcn/ui components (auto-generated)
│   ├── page-header.tsx          # Page header component
│   ├── stat-card.tsx            # Stat card component
│   ├── empty-state.tsx          # Empty state component
│   └── section-header.tsx       # Section header component
│
├── lib/
│   ├── utils.ts                 # Utility functions (cn, etc)
│   ├── helpers.ts               # Custom helper functions
│   └── constants.ts             # App constants
│
├── types/
│   ├── type.ts                  # General types
│   └── project.ts               # Project-related types
│
└── config/
    └── site.ts                  # Site configuration & metadata
```

## 🎨 Component Architecture

### Page Components
- **Minimal logic** - Mostly presentational
- **Server Components** - Default (faster, better SEO)
- **Client Components** - Only when interactivity needed (`"use client"`)

### UI Components (shadcn/ui)
- **Reusable** - Used across pages
- **Unstyled** - Tailwind CSS based
- **Accessible** - Built-in ARIA attributes
- **Customizable** - Via className prop

### Custom Components
- **PageHeader** - Standardized page header with title and action
- **StatCard** - Display statistics with trend
- **EmptyState** - Empty state UI with CTA
- **SectionHeader** - Section title and description

## 🎯 Styling System

### Tailwind CSS v4
- No tailwind.config.js (configured in globals.css)
- Design tokens as CSS variables
- Responsive prefixes: `sm:`, `md:`, `lg:`

### Design Tokens
Located in `/src/app/globals.css`:
```css
--primary
--secondary
--muted
--accent
--destructive
--border
--input
--ring
```

### Spacing Scale
```
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
...
```

### Common Tailwind Classes
- **Flexbox**: `flex`, `items-center`, `justify-between`, `gap-4`
- **Grid**: `grid`, `grid-cols-3`, `md:grid-cols-2`, `gap-6`
- **Spacing**: `p-4`, `m-2`, `py-6`, `px-3`
- **Typography**: `text-2xl`, `font-bold`, `text-muted-foreground`
- **Colors**: `bg-primary`, `text-foreground`, `border-border`

## 🚀 Adding New Features

### Step 1: Create Component
```tsx
// src/components/my-component.tsx
"use client"

import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <div className="p-6 rounded-lg border">
      {/* Component content */}
    </div>
  )
}
```

### Step 2: Add Page/Route
```tsx
// src/app/my-page/page.tsx
import { MyComponent } from "@/components/my-component"

export default function MyPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <MyComponent />
    </div>
  )
}
```

### Step 3: Update Navigation
Add to `/src/lib/constants.ts`:
```typescript
export const NAV_ITEMS = [
  // ... existing items
  { href: '/my-page', label: 'My Page', icon: 'Icon' },
]
```

## 📝 Common Patterns

### Page Layout Pattern
```tsx
export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Page Title"
        description="Optional description"
        action={<Button>Action</Button>}
      />
      
      {/* Content sections */}
    </div>
  )
}
```

### Card Pattern
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Form Pattern
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="field">Label</Label>
    <Input id="field" placeholder="..." />
  </div>
  <Button type="submit">Submit</Button>
</form>
```

### Responsive Grid
```tsx
{/* 1 column mobile, 2 tablet, 3 desktop */}
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Items */}
</div>
```

## 🔄 Data Flow

### Current Flow (Prototype)
1. Mock data hardcoded in components
2. No database/API yet
3. Client-side state with React hooks

### Future Implementation
1. Add database integration
2. Create API routes (`/api/*`)
3. Use SWR for data fetching
4. Implement proper auth

## 🧪 Testing Components Locally

```bash
# Start dev server
npm run dev

# Navigate to routes
http://localhost:3000
http://localhost:3000/login
http://localhost:3000/dashboard
http://localhost:3000/dashboard/create
```

## 📦 Dependencies

**Core:**
- Next.js 16
- React 19
- TypeScript

**UI:**
- shadcn/ui
- Tailwind CSS v4
- Lucide React (icons)

**Future:**
- Database (Supabase/Neon)
- Auth.js
- SWR (data fetching)

## ⚡ Performance Tips

1. **Use Server Components** by default
2. **Split large pages** into smaller components
3. **Lazy load** non-critical components
4. **Optimize images** with Next.js Image
5. **Use React Compiler** (Next.js 16+)

## 🐛 Debugging

**Check console:**
```bash
npm run dev  # Look for TypeScript/build errors
```

**Check component props:**
```tsx
console.log("[DEBUG]", { props, state })
```

**Check styling:**
- Inspect in DevTools
- Check Tailwind class conflicts
- Verify CSS variable values

## 📚 Resources

- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)

---

Last Updated: 2024

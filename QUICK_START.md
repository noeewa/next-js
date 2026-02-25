# Quick Start Guide - ChatBot Builder

Panduan cepat untuk memulai development di ChatBot Builder.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Start Development Server
```bash
npm run dev
# Server running at http://localhost:3000
```

### 3. Explore the Application
- **Landing:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Dashboard:** http://localhost:3000/dashboard
- **Create Project:** http://localhost:3000/dashboard/create
- **Payment:** http://localhost:3000/dashboard/create/payment
- **Project Detail:** http://localhost:3000/dashboard/1

## 📚 Project Structure Quick Reference

```
src/
├── app/              # Next.js routes
├── components/       # React components
├── lib/              # Utilities & helpers
├── types/            # TypeScript types
└── config/           # Configuration
```

## 🎨 Key Files to Know

### Layout & Styling
- `src/app/globals.css` - Global styles & design tokens
- `src/app/layout.tsx` - Root layout
- `src/app/dashboard/layout.tsx` - Dashboard layout

### Pages
- `src/app/page.tsx` - Landing page
- `src/app/login/page.tsx` - Login
- `src/app/register/page.tsx` - Register
- `src/app/dashboard/page.tsx` - Dashboard

### Components
- `src/components/page-header.tsx` - Page header
- `src/components/stat-card.tsx` - Stats card
- `src/components/empty-state.tsx` - Empty state
- `src/components/ui/*` - shadcn components

### Configuration
- `src/lib/constants.ts` - App constants
- `src/lib/helpers.ts` - Helper functions
- `src/config/site.ts` - Site config

## 🛠️ Common Tasks

### Add a New Component
```bash
# Create component file
touch src/components/my-component.tsx

# Example:
export function MyComponent() {
  return <div className="p-4">Hello</div>
}
```

### Add a New Page
```bash
# Create page directory and file
mkdir src/app/my-page
touch src/app/my-page/page.tsx

# Example:
import { MyComponent } from "@/components/my-component"

export default function MyPage() {
  return <MyComponent />
}
```

### Update Constants
Edit `src/lib/constants.ts` dan add/modify constants:
```typescript
export const MY_CONSTANT = "value"
```

### Add Helper Function
Edit `src/lib/helpers.ts` dan tambah function:
```typescript
export const myHelper = (param: string) => {
  // implementation
}
```

## 📝 Styling Quick Reference

### Using Tailwind Classes
```tsx
// Spacing
<div className="p-4 m-2 gap-6">

// Grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

// Flexbox
<div className="flex items-center justify-between">

// Typography
<h1 className="text-3xl font-bold text-foreground">

// Colors
<div className="bg-primary text-primary-foreground">

// Responsive
<div className="hidden md:block lg:flex">
```

### Using shadcn Components
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<Button>Click me</Button>
<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>
<Input placeholder="..." />
<Label htmlFor="id">Label</Label>
```

## 🔍 Debugging Tips

### Check Component Props
```tsx
console.log("[DEBUG]", { props, state })
```

### Check Tailwind Classes
- Open DevTools Inspector
- Check computed styles
- Verify class names are correct

### Check TypeScript Errors
```bash
npm run dev  # Check terminal for errors
```

### Common Issues

**Tailwind classes not working?**
- Check class name spelling
- Verify config in globals.css
- Clear .next directory: `rm -rf .next && npm run dev`

**Component not showing?**
- Check import path is correct
- Verify component export
- Check parent container has proper layout

**Styling looks off?**
- Check for competing CSS rules
- Verify dark mode setting
- Check z-index stacking
- Look for margin/padding conflicts

## 📚 Learning Resources

### Documentation
- `UI_STRUCTURE.md` - UI architecture overview
- `DEVELOPER_GUIDE.md` - Detailed development guide
- `UI_UPDATES_SUMMARY.md` - What was updated
- `CHANGELOG.md` - Version history

### External Resources
- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 💡 Best Practices

### Component Structure
```tsx
"use client"  // Only if needed

import { ReactNode } from "react"
import { Icon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MyComponentProps {
  title: string
  children: ReactNode
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  )
}
```

### Use Server Components Default
```tsx
// Good - Server Component
export default function Page() {
  return <div>Content</div>
}
```

### Use Client Only When Needed
```tsx
// Use only for interactivity
"use client"

import { useState } from "react"

export function Interactive() {
  const [state, setState] = useState("")
  return <input onChange={(e) => setState(e.target.value)} />
}
```

### Proper TypeScript Typing
```tsx
import { LucideIcon } from "lucide-react"

interface CardProps {
  title: string
  icon?: LucideIcon
  variant?: "default" | "secondary"
}

export function Card({ title, icon: Icon, variant = "default" }: CardProps) {
  return <div>{title}</div>
}
```

## 🎯 Next Development Steps

1. **Learn the current structure** - Read DEVELOPER_GUIDE.md
2. **Explore components** - Open component files and understand props
3. **Make a small change** - Try updating a button text or color
4. **Create a new component** - Practice creating reusable components
5. **Check the preview** - See changes in browser immediately

## ❓ FAQ

**Q: Where do I add database code?**
A: Create `/src/app/api/route.ts` for API endpoints

**Q: How do I handle forms?**
A: Use shadcn Input, Label, Button components and handle with useCallback

**Q: How do I add dark mode?**
A: Already supported! Built into design system

**Q: How do I fetch data?**
A: Currently using mock data. Will use API routes + SWR later

**Q: How do I handle authentication?**
A: Currently design only. Auth.js integration planned

## 📞 Need Help?

1. Check DEVELOPER_GUIDE.md untuk technical details
2. Look at existing pages untuk examples
3. Check Tailwind docs untuk styling questions
4. Check shadcn/ui docs untuk component usage

---

**Ready to code?** Start with `npm run dev` dan open the pages in your browser!

**Happy coding! 🚀**

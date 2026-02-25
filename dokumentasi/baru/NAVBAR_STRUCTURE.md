# Navbar Structure Documentation

## Overview
Project sekarang menggunakan **GitHub-style navbar** dengan dua layer:
1. **Global App Navbar** - Sticky top navbar di seluruh aplikasi
2. **Project Navigation** - Conditional navbar yang hanya muncul di route `/dashboard/[projectId]`

## Architecture

### 1. AppNavbar Component
**File**: `src/components/app-navbar.tsx`

Navbar global yang sticky di atas halaman. Menampilkan:
- **Left**: Logo + Brand name
- **Center**: Breadcrumb dinamis (hanya desktop)
- **Right**: User profile dropdown + mobile menu toggle

**Props**: None (menggunakan `usePathname()` untuk routing)

**Features**:
- Responsive design (logo hidden pada mobile, mobile menu support)
- User dropdown menu dengan opsi: Settings, Billing, Logout
- Mobile menu yang collapsible
- Sticky positioning (z-50)

**Usage**:
```tsx
import { AppNavbar } from "@/components/app-navbar"

// Di dashboard/layout.tsx
<AppNavbar />
```

### 2. ProjectNav Component
**File**: `src/components/project-nav.tsx`

Project-specific navbar yang ditampilkan hanya ketika user berada di project detail page.

**Props**:
```tsx
interface ProjectNavProps {
  projectName: string
  projectId: string
  status: "active" | "draft" | "inactive"
  isActive: boolean
  onToggleStatus?: () => void
}
```

**Features**:
- Back button untuk kembali ke dashboard
- Project name + status badge
- Action buttons: Toggle (Active/Inactive), Edit
- Tab navigation untuk sections:
  - Overview
  - Conversations
  - Analytics
  - Integrations
  - Settings
- Sticky positioning (top-16, z-40)

**Usage**:
```tsx
import { ProjectNav } from "@/components/project-nav"

export default function ProjectPage() {
  const [isActive, setIsActive] = useState(true)
  
  return (
    <>
      <ProjectNav
        projectName="Customer Service Bot"
        projectId="1"
        status="active"
        isActive={isActive}
        onToggleStatus={() => setIsActive(!isActive)}
      />
      <div className="pt-6">
        {/* Project content */}
      </div>
    </>
  )
}
```

## Layout Structure

### Dashboard Layout (`src/app/dashboard/layout.tsx`)
```
┌─────────────────────────────────────┐
│         AppNavbar (sticky)          │ ← z-50
├─────────────────────────────────────┤
│                                     │
│     Dashboard Content               │
│     (max-w-7xl container)          │
│                                     │
└─────────────────────────────────────┘
```

### Project Detail Layout
```
┌─────────────────────────────────────┐
│         AppNavbar (sticky)          │ ← z-50
├─────────────────────────────────────┤
│      ProjectNav (sticky)            │ ← z-40, top-16
├─────────────────────────────────────┤
│                                     │
│  Project Content (Tabs + Stats)    │
│  (pt-6 untuk spacing)              │
│                                     │
└─────────────────────────────────────┘
```

## Routing & Conditional Rendering

### AppNavbar Breadcrumb Logic
Menggunakan `usePathname()` untuk menentukan breadcrumb yang ditampilkan:

```tsx
const getBreadcrumb = () => {
  if (pathname === "/dashboard") return "Dashboard"
  if (pathname.includes("/dashboard/create")) {
    if (pathname.includes("/payment")) return "Buat Proyek > Pembayaran"
    return "Buat Proyek"
  }
  if (pathname.includes("/dashboard/") && !pathname.includes("/create")) {
    return "Proyek"
  }
  return null
}
```

### ProjectNav Tab Navigation
Tabs aktif ditentukan dari URL segment:

```tsx
const getActiveTab = () => {
  if (pathname.includes("/settings")) return "settings"
  if (pathname.includes("/analytics")) return "analytics"
  if (pathname.includes("/conversations")) return "conversations"
  if (pathname.includes("/integrations")) return "integrations"
  return "overview"
}
```

Ini memungkinkan navigation yang clean dengan URL yang shareable.

## Styling & Design

### Colors
- **Navbar Background**: `bg-background/95 backdrop-blur`
- **Navbar Border**: `border-b border-border/40`
- **Status Badges**: 
  - Active: Green
  - Draft: Yellow
  - Inactive: Red

### Spacing
- **Navbar Height**: 40px (h-10 user menu area)
- **ProjectNav Height**: ~70-80px (header + tabs)
- **Container Padding**: `py-6 px-4 sm:px-6 lg:px-8`

### Z-Index Stack
- AppNavbar: `z-50` (topmost)
- ProjectNav: `z-40` (below AppNavbar)
- Mobile Menu: default/visible

### Responsive
- **Desktop**: Full navbar visible
- **Tablet**: Breadcrumb masih visible, dimulai dari md breakpoint
- **Mobile**: Menu collapsed, hamburger icon visible

## Billing Context
Seperti diminta, billing akan dikenakan **per project**. Struktur navbar memudahkan:

1. User dapat melihat list project di dashboard
2. Setiap project memiliki status (active/draft/inactive)
3. Status mempengaruhi billing calculation
4. Per-project tabs (integrations, settings) memudahkan feature management

## Future Enhancements
- [ ] Add breadcrumb component untuk lebih complex navigation
- [ ] Project favorites/pinning di navbar
- [ ] Quick search projects dari navbar
- [ ] Project settings shortcut di ProjectNav
- [ ] Real-time activity indicator per project

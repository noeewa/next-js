# Navbar Visual Guide

## Global Layout Structure

```
═══════════════════════════════════════════════════════════════════════════
║                           APP NAVBAR (z-50)                            ║
║ ┌─────────────────────────────────────────────────────────────────────┐ ║
║ │ ✨ ChatBot Builder        /Dashboard        👤 User ▼             │ ║
║ └─────────────────────────────────────────────────────────────────────┘ ║
═══════════════════════════════════════════════════════════════════════════
║                                                                         ║
║ MAIN CONTENT AREA (if in /dashboard route)                            ║
║ ┌─────────────────────────────────────────────────────────────────────┐ ║
║ │ Dashboard                                                           │ ║
║ │ Kelola dan pantau semua chatbot AI Anda                            │ ║
║ │                                                                     │ ║
║ │ [Stats Cards - 3 cols]                                             │ ║
║ │ [Project List]                                                     │ ║
║ └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                         ║
═══════════════════════════════════════════════════════════════════════════
```

## Project Detail Layout Structure

```
═══════════════════════════════════════════════════════════════════════════
║                           APP NAVBAR (z-50)                            ║
║ ┌─────────────────────────────────────────────────────────────────────┐ ║
║ │ ✨ ChatBot Builder        /Proyek        👤 User ▼                 │ ║
║ └─────────────────────────────────────────────────────────────────────┘ ║
═══════════════════════════════════════════════════════════════════════════
║                      PROJECT NAV (z-40, sticky top-16)                 ║
║ ┌─────────────────────────────────────────────────────────────────────┐ ║
║ │ ← Customer Service Bot 🟢 Aktif  | [Matikan] [Edit]               │ ║
║ │                                                                     │ ║
║ │ Overview | Percakapan | Analytics | Integrasi | Pengaturan        │ ║
║ └─────────────────────────────────────────────────────────────────────┘ ║
═══════════════════════════════════════════════════════════════════════════
║                                                                         ║
║ PROJECT CONTENT                                                        ║
║ ┌─────────────────────────────────────────────────────────────────────┐ ║
║ │ [Stats Cards - 4 cols]                                             │ ║
║ │                                                                     │ ║
║ │ Tab Content:                                                        │ ║
║ │ - Overview: Project Info & Welcome Message                         │ ║
║ │ - Conversations: Recent Chat Sessions                              │ ║
║ │ - Analytics: Charts & Metrics                                      │ ║
║ │ - Integrations: Connected Services                                 │ ║
║ │ - Settings: Project Configuration                                  │ ║
║ └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                         ║
═══════════════════════════════════════════════════════════════════════════
```

## AppNavbar Component Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│ NAVBAR (h-16, sticky top-0 z-50)                                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [✨]                            [/Dashboard]        [👤 JD] [≡]   │
│ Logo + Brand              Breadcrumb (desktop only)  User   Menu    │
│                                                                      │
│  Desktop: "✨ ChatBot Builder"                                      │
│  Mobile:  "✨"                                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### User Menu Dropdown
```
┌─────────────────────────────────┐
│ ┌─────────────────────────────┐ │
│ │ John Doe                    │ │
│ │ john@example.com            │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ ⚙️  Pengaturan                  │
│ 💳 Tagihan                      │
├─────────────────────────────────┤
│ 🚪 Keluar                       │
└─────────────────────────────────┘
```

### Mobile Menu Dropdown
```
┌──────────────────────┐
│ Dashboard            │
│ Pengaturan           │
│ Keluar               │
└──────────────────────┘
```

## ProjectNav Component Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│ PROJECT NAV (sticky top-16 z-40)                                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Header Section:                                                     │
│  [←] Customer Service Bot [🟢 Aktif]    [Matikan] [Edit]           │
│  ↑                                        ↑                         │
│  Back Button                              Action Buttons            │
│                                                                      │
│  Tabs Section:                                                       │
│  Overview │ Percakapan │ Analytics │ Integrasi │ Pengaturan        │
│  ^^^^^^^^                                                            │
│  Active Tab (underline = primary color)                             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Status Badge Styling

### Active Status
```
🟢 [Aktif]
Green background: bg-green-100 dark:bg-green-950
Green text: text-green-700 dark:text-green-400
```

### Draft Status
```
🟡 [Draft]
Yellow background: bg-yellow-100 dark:bg-yellow-950
Yellow text: text-yellow-700 dark:text-yellow-400
```

### Inactive Status
```
🔴 [Nonaktif]
Red background: bg-red-100 dark:bg-red-950
Red text: text-red-700 dark:text-red-400
```

## Responsive Behavior

### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────────────┐
│ ✨ ChatBot Builder    /Dashboard    👤 User ▼          │
└─────────────────────────────────────────────────────────┘
Full navbar with breadcrumb visible
All text labels shown
```

### Tablet (768px - 1023px)
```
┌──────────────────────────────────────────────┐
│ ✨ ChatBot Builder   [breadcrumb]  👤 User   │
└──────────────────────────────────────────────┘
Breadcrumb still visible on md breakpoint
Logo shows full brand name
```

### Mobile (<768px)
```
┌──────────────────────────────────┐
│ ✨                    👤 User [≡]│
└──────────────────────────────────┘
Hamburger menu replaces breadcrumb
Logo brand name hidden (shows icon only)
Mobile menu expands below navbar
```

## Z-Index Stack

```
z-50: AppNavbar (global, always on top)
  │
  └─ z-40: ProjectNav (project detail pages)
      │
      └─ z-10: Mobile Menu (AppNavbar)
          │
          └─ default: Content, Cards, etc
```

## Navigation Flow

### Dashboard Route
```
User clicks "Dashboard"
        ↓
        ├─ AppNavbar shows breadcrumb "/ Dashboard"
        ├─ Main content shows project list
        └─ ProjectNav is NOT shown
```

### Project Detail Route
```
User clicks project in list
        ↓
        ├─ AppNavbar shows breadcrumb "/ Proyek"
        ├─ ProjectNav shows with project info
        ├─ Default tab is "Overview"
        └─ Main content shows tab content
        
User clicks "Percakapan" tab
        ↓
        ├─ ProjectNav updates active tab underline
        ├─ URL changes to /dashboard/[projectId]/conversations
        └─ Main content shows conversations
```

### Create Project Route
```
User clicks "Buat Proyek Baru"
        ↓
        ├─ AppNavbar shows breadcrumb "/ Buat Proyek"
        ├─ ProjectNav is NOT shown
        ├─ Shows create form step 1
        │
        └─ When clicking next → Payment
           ├─ AppNavbar shows breadcrumb "/ Buat Proyek > Pembayaran"
           └─ Shows pricing plans
```

## Key Features

### 1. Sticky Navigation
- AppNavbar stays at top during scroll
- ProjectNav stays below AppNavbar during scroll
- Allows quick access to navigation at any time

### 2. Breadcrumb Context
- Shows current page in navigation hierarchy
- Updates dynamically based on route
- Hidden on mobile for space efficiency

### 3. Per-Project Tabs
- Each project has its own tab navigation
- Tabs represent different sections of functionality
- URL-based tabs enable bookmarking and sharing

### 4. Status Management
- Clear visual indication of project status
- Single toggle button to change status
- Affects billing calculation per the requirements

### 5. Mobile Responsive
- All features work on mobile
- Smart hiding of non-essential elements
- Touch-friendly button sizes

## Component Integration

### Using AppNavbar
```tsx
// In dashboard/layout.tsx
import { AppNavbar } from '@/components/app-navbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto w-full py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
```

### Using ProjectNav
```tsx
// In dashboard/[projectId]/page.tsx
import { ProjectNav } from '@/components/project-nav'

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

---

**Note**: This visual guide represents the current UI state. All components are fully responsive and adjust to different screen sizes.

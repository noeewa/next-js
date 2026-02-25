# Routing Guide - ChatBot Builder

Dokumentasi lengkap struktur routing dan navigasi di ChatBot Builder.

## 📍 Route Structure

```
/                                    # Landing page
├── /login                          # Login page
├── /register                       # Register page
└── /dashboard                      # Dashboard (protected)
    ├── /                           # Dashboard overview
    ├── /create                     # Create project
    │   └── /payment                # Payment & pricing
    ├── /[projectName]              # Project detail
    │   └── /status
    │       └── /statusPayment.tsx  # Payment status (component)
    ├── /billing                    # Billing (future)
    ├── /clients                    # Clients/Team (future)
    └── /settings                   # Settings (future)
```

## 🎯 Page Details

### Public Routes (No Auth Required)

#### `/` - Landing Page
- **File:** `src/app/page.tsx`
- **Purpose:** Marketing page untuk new users
- **Components:** Hero section, Features, Pricing, CTA
- **Navigation:** Links to login/register/dashboard
- **Features:**
  - Sticky navbar dengan logo dan auth buttons
  - Hero section dengan gradient text
  - Features grid (6 items)
  - Pricing cards (3 plans)
  - Call-to-action section
  - Footer dengan copyright

#### `/login` - Login Page
- **File:** `src/app/login/page.tsx`
- **Purpose:** User authentication
- **Components:** Email input, password input, Google OAuth button
- **Features:**
  - Centered card layout
  - Email & password fields
  - Forgot password link
  - Google OAuth integration
  - Register link di footer

#### `/register` - Register Page
- **File:** `src/app/register/page.tsx`
- **Purpose:** User account creation
- **Components:** Name inputs, email, password, checkbox
- **Features:**
  - First name & last name fields
  - Email input
  - Password dengan validation hint
  - Confirm password field
  - Terms & privacy checkbox
  - Google OAuth button
  - Login link

---

### Protected Routes (Auth Required)

#### `/dashboard` - Dashboard Layout
- **File:** `src/app/dashboard/layout.tsx`
- **Purpose:** Main layout untuk semua dashboard pages
- **Components:** Sidebar, Mobile menu, User dropdown
- **Features:**
  - **Desktop:** Fixed sidebar (collapsible)
  - **Mobile:** Hamburger menu dengan overlay
  - **Navigation:** Dashboard, Create Project, Settings
  - **User Menu:** Settings, Logout
  - **Responsive:** Proper padding & layout

#### `/dashboard` - Dashboard Overview
- **File:** `src/app/dashboard/page.tsx`
- **Purpose:** Central hub untuk manage projects
- **Components:** Stats cards, project list, empty state
- **Features:**
  - Page header dengan title
  - 3 stat cards: Total Chatbot, Messages, Users
  - Project list dengan status badges
  - Empty state dengan CTA untuk create project
  - Info card dengan tips

**Project Card Details:**
- Project name
- Creation date
- Message count
- User count
- Status badge (Active/Draft)
- Hover effect dengan shadow & border change

#### `/dashboard/create` - Create Project
- **File:** `src/app/dashboard/create/page.tsx`
- **Purpose:** Multi-step form untuk create new chatbot
- **Components:** Step indicator, form, navigation buttons
- **Features:**
  - Step 1: Basic Info
    - Project name (required)
    - Description (optional)
  - Step 2: AI Config
    - AI Provider selection (Groq, OpenAI, Cerebras)
    - AI name
    - Welcome message
    - Suggested questions
  - Step 3: Widget Customization
    - Primary color picker (6 colors)
    - Widget position (4 positions)
    - Theme selection (light/dark)
  - Widget preview card
  - Form validation per step
  - Navigation: Back, Next, Create Project

#### `/dashboard/create/payment` - Payment & Pricing
- **File:** `src/app/dashboard/create/payment/payment.tsx`
- **Purpose:** Select pricing plan dan payment method
- **Components:** Plan cards, payment methods, order summary
- **Features:**
  - **Plan Selection:**
    - 3 plans: Starter, Pro, Enterprise
    - Price display
    - Features list
    - Popular badge
  - **Payment Methods:**
    - QRIS option
    - Bank transfer option
  - **Order Summary:**
    - Plan name & price
    - Tax calculation (11%)
    - Total amount
    - Payment instructions
  - **Success State:**
    - Success message
    - Redirect to dashboard

**Plan Details:**
```
Starter: Rp 99.000/bulan
- 1 Chatbot
- 500 messages
- 1 User
- Basic dashboard
- Email support

Pro: Rp 249.000/bulan (Popular)
- 5 Chatbots
- 5.000 messages
- 5 Users
- Full dashboard
- Priority support
- Custom branding

Enterprise: Rp 499.000/bulan
- Unlimited Chatbots
- Unlimited messages
- Unlimited Users
- API access
- Dedicated support
- Custom development
```

#### `/dashboard/[projectName]` - Project Detail
- **File:** `src/app/dashboard/[projectName]/project.tsx`
- **Purpose:** Manage individual chatbot project
- **Components:** Header, stats cards, tabs
- **Features:**
  - **Header:**
    - Back button
    - Project name
    - Status badge
    - Toggle active/inactive
    - Edit button
  - **Stats:** 4 cards showing metrics
  - **Tabs:**
    1. Overview - Project info & settings
    2. Chat Sessions - Recent conversations
    3. Knowledge Base - Document management
    4. Settings - AI configuration
    5. Embed Code - Widget integration code

**Tab Details:**

**Overview:**
- AI Provider info
- AI Name
- Primary color
- Widget position
- Theme
- Welcome message

**Chat Sessions:**
- User list dengan avatar
- Last message preview
- Time of last message
- Click to view full conversation

**Knowledge Base:**
- Document list
- File size, chunks, status
- Upload new document button
- Delete document option

**Settings:**
- AI Name input
- Welcome message textarea
- Save changes button

**Embed Code:**
- Code snippet
- Copy to clipboard button
- Platform info (works everywhere)
- Preview widget button

---

## 🔀 Route Transitions

### Navigation Flow

**Anonymous User:**
```
/ (Landing)
├── /login → (auth success) → /dashboard
└── /register → (auth success) → /dashboard
```

**Authenticated User:**
```
/dashboard (Overview)
├── /dashboard/create → /dashboard/create/payment → /dashboard
├── /dashboard/[projectName] → (tabs) → /dashboard
└── (sidebar) /dashboard/settings
```

---

## 📱 Responsive Behavior

### Desktop (lg: 1024px+)
- Fixed sidebar (left)
- Main content area
- Full navigation visible
- All sections accessible

### Tablet (md: 768px+)
- Collapsible sidebar
- Responsive grid
- Touch-friendly buttons
- Readable text sizes

### Mobile (< 768px)
- Hamburger menu
- Full-width content
- Stack layout
- Optimized touch targets
- Proper text sizes

---

## 🔐 Route Protection

**Current Status:** Not implemented (prototype phase)

**Future Implementation:**
- Auth middleware
- Session validation
- Redirect to login if not authenticated
- Persist auth state

---

## 🔗 Internal Links

### From Landing to Auth
```tsx
<Link href="/login">Masuk</Link>
<Link href="/register">Daftar</Link>
<Link href="/dashboard">Dashboard</Link>
```

### From Dashboard
```tsx
<Link href="/dashboard">Dashboard</Link>
<Link href="/dashboard/create">Create Project</Link>
<Link href={`/dashboard/${projectId}`}>Project Detail</Link>
```

### From Project Detail
```tsx
<Link href="/dashboard">Back to Dashboard</Link>
```

---

## 📊 URL Patterns

### Dynamic Routes
```
/dashboard/[projectName]    # Project detail page
```

**Current Usage:**
- Static mock data (projectName = "1")
- Future: Dynamic project ID from database

### Query Parameters
```
/dashboard/[projectName]?tab=chat    # (Future)
/dashboard?page=2                     # (Future)
```

---

## 🚀 Adding New Routes

### Step 1: Create Folder
```bash
mkdir -p src/app/new-route
```

### Step 2: Create Page
```tsx
// src/app/new-route/page.tsx
export default function NewRoutePage() {
  return <div>Content</div>
}
```

### Step 3: Add Link
```tsx
<Link href="/new-route">New Route</Link>
```

### Step 4: Update Navigation (if needed)
```typescript
// src/lib/constants.ts
NAV_ITEMS.push({
  href: "/new-route",
  label: "New Route",
  icon: "Icon"
})
```

---

## 📝 Notes

- All routes currently use mock data
- No actual authentication implemented
- Links are hardcoded navigation
- Future: Will integrate database & API

---

## 🔄 API Routes (Future)

```
/api/projects              # GET: list, POST: create
/api/projects/[id]         # GET: detail, PUT: update, DELETE: delete
/api/projects/[id]/chat    # GET: chat history
/api/payment               # POST: process payment
```

---

Last Updated: 2024

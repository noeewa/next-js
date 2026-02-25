# Setup Verification Checklist

After the navbar refactor, use this checklist to verify everything is working correctly.

## Pre-Flight Checks

### Environment Setup
- [ ] Node.js installed (v16+)
- [ ] npm/yarn/pnpm installed
- [ ] Project dependencies installed (`npm install`)
- [ ] Environment variables configured (.env.local)

### Browser Ready
- [ ] Chrome/Firefox/Safari open
- [ ] DevTools available for debugging
- [ ] Mobile device emulator (Chrome DevTools or physical device)

---

## Component Verification

### ✅ AppNavbar Component

#### File Check
- [ ] File exists: `src/components/app-navbar.tsx`
- [ ] File size: ~140 lines (approximately)
- [ ] Imports include: lucide-react, next/link, next/navigation

#### Visual Check
1. Go to `http://localhost:3000/dashboard`
2. Navbar should appear at top
3. [ ] Logo "✨ ChatBot Builder" visible on left
4. [ ] Breadcrumb "/ Dashboard" visible in center (desktop)
5. [ ] User avatar "JD" visible on right
6. [ ] Navbar is sticky (doesn't scroll away)
7. [ ] Mobile: Logo text hidden, hamburger menu visible

#### Functionality Check
1. Click user avatar dropdown
2. [ ] Dropdown menu appears with Pengaturan, Tagihan, Keluar
3. [ ] Each menu item is clickable
4. Mobile hamburger menu
5. [ ] Click menu icon, should show mobile menu
6. [ ] Mobile menu has Dashboard, Pengaturan, Keluar
7. [ ] Can close mobile menu by clicking outside

### ✅ ProjectNav Component

#### File Check
- [ ] File exists: `src/components/project-nav.tsx`
- [ ] File size: ~160 lines (approximately)
- [ ] Imports include: lucide-react, next/link, Tabs component

#### Visual Check
1. Go to `http://localhost:3000/dashboard` and click a project
2. [ ] ProjectNav appears below AppNavbar
3. [ ] Shows project name "Customer Service Bot"
4. [ ] Status badge shows "🟢 Aktif" (green)
5. [ ] Back arrow button visible
6. [ ] Edit button visible
7. [ ] Toggle button (Matikan) visible
8. [ ] Tabs visible: Overview, Percakapan, Analytics, Integrasi, Pengaturan
9. [ ] ProjectNav is sticky (stays below navbar when scrolling)

#### Functionality Check
1. [ ] Click back button → goes to dashboard
2. [ ] Click toggle button → status changes
3. [ ] Click different tabs → tabs highlight changes
4. [ ] Tab content updates when clicking tabs

---

## Layout Verification

### Dashboard Layout

#### File Check
- [ ] File updated: `src/app/dashboard/layout.tsx`
- [ ] File size: ~20 lines (was 280+)
- [ ] Contains: AppNavbar import
- [ ] Does NOT contain: Sidebar, sidebar state, collapse logic

#### Visual Check
1. Go to `/dashboard`
2. [ ] AppNavbar visible at top
3. [ ] Page content below navbar
4. [ ] Content has proper padding/spacing
5. [ ] Container max-width appears to be max-w-7xl
6. [ ] Mobile: content takes full width with side padding
7. [ ] Tablet: content layout adjusts properly
8. [ ] Desktop: content centered with max width

### Project Detail Layout

#### File Check
- [ ] File updated: `src/app/dashboard/[projectName]/page.tsx`
- [ ] Contains: ProjectNav integration
- [ ] Contains: State for isActive

#### Visual Check
1. Go to `/dashboard` → click a project
2. [ ] AppNavbar visible
3. [ ] ProjectNav visible below navbar
4. [ ] Project content visible below ProjectNav
5. [ ] Stats cards visible and properly aligned
6. [ ] Tabs content shows correctly

---

## Responsive Design Verification

### Mobile View (<768px)

1. Open DevTools → Toggle device toolbar → iPhone SE
2. [ ] Logo brand name "ChatBot Builder" hidden
3. [ ] Logo icon visible
4. [ ] Hamburger menu appears
5. [ ] No sidebar visible
6. [ ] Content full width with padding
7. [ ] All buttons remain clickable
8. [ ] ProjectNav tabs are readable

### Tablet View (768px - 1024px)

1. Open DevTools → Responsive → iPad Air
2. [ ] Logo shows full "ChatBot Builder"
3. [ ] Breadcrumb visible
4. [ ] All navbar elements visible
5. [ ] Content layout adjusts properly
6. [ ] ProjectNav tabs fit on screen

### Desktop View (>1024px)

1. Open DevTools → Responsive → resize to full width
2. [ ] Full navbar visible
3. [ ] Breadcrumb clearly shown
4. [ ] Content centered with max-w-7xl
5. [ ] Comfortable spacing on sides

---

## Navigation Verification

### Breadcrumb Logic
1. Go to `/dashboard`
   - [ ] Breadcrumb shows "/ Dashboard"
2. Go to `/dashboard/create`
   - [ ] Breadcrumb shows "/ Buat Proyek"
3. Go to `/dashboard/create/payment`
   - [ ] Breadcrumb shows "/ Buat Proyek > Pembayaran"
4. Go to `/dashboard/1` (project detail)
   - [ ] Breadcrumb shows "/ Proyek"

### Tab Navigation
1. Go to project detail page
2. [ ] Default tab is "Overview"
3. [ ] Click "Percakapan" tab
   - [ ] Content changes
   - [ ] URL updates
   - [ ] Tab underline updates
4. [ ] Click "Analytics" tab
   - [ ] Same verification
5. Repeat for all tabs

### Back Navigation
1. Go to `/dashboard` → click project
2. Click back button in ProjectNav
3. [ ] Goes back to `/dashboard`

---

## Styling & Color Verification

### Status Badges

#### Active Status (Green)
1. Check project with "Aktif" status
2. [ ] Badge background: light green
3. [ ] Badge text: dark green
4. [ ] Looks good in both light and dark mode

#### Draft Status (Yellow)
1. Create or find draft project
2. [ ] Badge background: light yellow
3. [ ] Badge text: dark yellow
4. [ ] Consistent styling

#### Inactive Status (Red)
1. If available, check inactive project
2. [ ] Badge background: light red
3. [ ] Badge text: dark red

### Z-Index Stacking
1. Go to project detail page
2. [ ] AppNavbar appears on top
3. [ ] ProjectNav appears below AppNavbar
4. [ ] No overlap issues
5. [ ] Mobile menu appears above navbar

### Dark Mode
If dark mode is available in settings:
1. Toggle dark mode
2. [ ] AppNavbar adapts colors
3. [ ] ProjectNav adapts colors
4. [ ] Status badges visible in dark mode
5. [ ] All text readable

---

## Performance Verification

### Page Load
1. Clear browser cache
2. Go to `/dashboard`
3. [ ] Page loads in < 2 seconds
4. [ ] No console errors
5. [ ] No layout shift

### Navigation
1. Click between navbar items
2. [ ] No lag or delay
3. [ ] Transitions smooth
4. [ ] No excessive re-renders

### Mobile Performance
1. Open DevTools → Network
2. Go to `/dashboard`
3. [ ] Check file sizes reasonable
4. [ ] No missing resources
5. [ ] Fast load time

---

## Browser Compatibility

### Chrome/Chromium
1. [ ] Open in Chrome
2. [ ] All features work
3. [ ] Styling correct

### Firefox
1. [ ] Open in Firefox
2. [ ] All features work
3. [ ] Styling correct

### Safari
1. [ ] Open in Safari
2. [ ] All features work
3. [ ] Styling correct

---

## Console Check

Open browser DevTools → Console tab:

1. Go to `/dashboard`
   - [ ] No errors
   - [ ] No warnings
   
2. Click user menu
   - [ ] No errors
   - [ ] No warnings
   
3. Go to project detail
   - [ ] No errors
   - [ ] No warnings
   
4. Click navbar items
   - [ ] No errors
   - [ ] No warnings

---

## Documentation Verification

### Files Exist
- [ ] NAVBAR_STRUCTURE.md exists
- [ ] NAVBAR_VISUAL_GUIDE.md exists
- [ ] NAVBAR_UPDATE_SUMMARY.md exists
- [ ] IMPLEMENTATION_COMPLETE.md exists
- [ ] DOCS_INDEX.md exists
- [ ] This file (SETUP_VERIFICATION.md) exists

### Documentation Quality
- [ ] DOCS_INDEX.md is readable and helpful
- [ ] Code examples in guides are correct
- [ ] Visual diagrams are clear
- [ ] Instructions are accurate

---

## Functionality Test Cases

### Test Case 1: Dashboard Navigation
1. Start at `/dashboard`
2. [ ] AppNavbar shows
3. [ ] Can see project list
4. [ ] Can click "Buat Proyek Baru" button
5. [ ] Goes to `/dashboard/create`

### Test Case 2: Project Detail Navigation
1. Go to `/dashboard`
2. [ ] Click a project card
3. [ ] ProjectNav appears
4. [ ] Can click different tabs
5. [ ] Tab content updates
6. [ ] Click back button
7. [ ] Returns to dashboard

### Test Case 3: Mobile Navigation
1. Open mobile view
2. [ ] AppNavbar hamburger works
3. [ ] Can open/close mobile menu
4. [ ] Can navigate from mobile menu
5. [ ] All buttons are touch-friendly

### Test Case 4: Status Toggle
1. Go to project detail
2. [ ] Can click Matikan button
3. [ ] Status changes
4. [ ] Badge color updates

### Test Case 5: User Menu
1. Click user avatar
2. [ ] Menu appears
3. [ ] All options visible
4. [ ] Can click outside to close

---

## Known Limitations

- [ ] User menu is mock (doesn't actually log out)
- [ ] Project data is mock (not connected to backend)
- [ ] Tab routes go to mock content (not actual feature pages)
- [ ] Status toggle is UI-only (not saved to database)

These are expected for the prototype and will be implemented in next phase.

---

## Post-Verification Actions

### If Everything Works ✅
1. Commit changes to git
2. Create a PR with documentation
3. Share DOCS_INDEX.md with team
4. Update team on completion

### If Something Doesn't Work ❌
1. Check browser console for errors
2. Compare your setup with DEVELOPER_GUIDE.md
3. Verify all files exist in correct locations
4. Check that AppNavbar and ProjectNav are imported correctly
5. Clear next cache: `rm -rf .next`
6. Reinstall dependencies: `npm install`
7. Restart dev server

---

## Success Criteria

### ✅ All items checked?

You have successfully:
- ✅ Implemented top navbar (GitHub-style)
- ✅ Created project-specific navigation
- ✅ Verified responsive design
- ✅ Confirmed all functionality
- ✅ Reviewed documentation

### 🎉 Ready for next phase!

Next steps:
1. Read IMPLEMENTATION_COMPLETE.md
2. Plan next features
3. Connect real data
4. Implement backend features

---

## Contact & Support

For issues or questions:
1. Check DOCS_INDEX.md for relevant guide
2. Review NAVBAR_STRUCTURE.md for architecture
3. Check DEVELOPER_GUIDE.md for setup help

---

**Last Updated**: 2024

**Estimated Time to Verify**: 15-20 minutes

**Status**: Ready for verification

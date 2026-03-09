# Mission Control Life Dashboard - Design & Development Guidelines

## Project Overview
A premium, dark-themed personal dashboard application with glassmorphism styling, built for comprehensive life management and system monitoring. The application prioritizes usability, spacing consistency, and high contrast readability across desktop and mobile devices.

---

## General Development Guidelines

### Code Quality
* Keep files modular and focused - separate concerns into individual components
* Use TypeScript for type safety across all components
* Prefer functional components with hooks over class components
* Implement proper error boundaries and loading states
* Keep component files under 300 lines - split into smaller components when needed

### Layout & Positioning
* Use flexbox and CSS Grid for layouts - avoid absolute positioning unless absolutely necessary
* Implement responsive design with mobile-first approach
* Use Tailwind CSS utility classes for styling
* Maintain consistent spacing using the defined spacing scale (4px increments)

### State Management
* Use Context API for global state (ThemeContext, SidebarContext)
* Keep local state in components when possible
* Implement proper cleanup in useEffect hooks
* Use custom hooks for reusable logic

### Performance
* Lazy load routes and heavy components
* Optimize images and use appropriate formats
* Minimize re-renders with proper memoization
* Keep animations at 60fps using CSS transitions

---

## Design System

### Visual Identity
* **Theme**: Dark mode primary (near-black backgrounds)
* **Style**: Glassmorphism with backdrop blur effects
* **Aesthetic**: Premium "mission-control" interface
* **Readability**: High contrast text (white/95% to white/40%)

### Color Palette

#### Primary Colors
```css
Cyan (#06b6d4)     - Primary actions, links, highlights
Purple (#a855f7)   - Secondary actions, accents
Orange (#f97316)   - Warnings, highlights, CTAs
```

#### Accent Colors
```css
Green (#22c55e)    - Success states, positive metrics
Red (#ef4444)      - Error states, destructive actions
Yellow (#eab308)   - Warning states, caution
Pink (#ec4899)     - Special highlights (Component Library)
```

#### Neutral Colors
```css
Background: #0f0f19           - Main application background
Cards: rgba(255,255,255,0.05) - Glassmorphic card backgrounds
Borders: rgba(255,255,255,0.10) - Subtle borders
```

### Gradient Combinations
```css
Primary:   from-cyan-500 to-purple-500    (Main actions, buttons)
Special:   from-purple-500 to-pink-500    (Highlights)
Warning:   from-orange-500 to-red-500     (Important actions)
Success:   from-green-500 to-emerald-500  (Confirmations)
```

### Typography Scale
```css
text-4xl (36px) - H1 Page titles
text-3xl (30px) - H2 Section headers
text-2xl (24px) - H3 Subsection headers
text-xl (20px)  - H4 Card titles
text-lg (18px)  - H5 Labels
text-base       - Body text
text-sm         - Secondary text, labels
text-xs         - Helper text, captions
```

### Text Opacity Hierarchy
```css
text-white/95 - Primary headings
text-white/90 - Subheadings
text-white/80 - Body text
text-white/70 - Labels
text-white/60 - Secondary text
text-white/50 - Muted text
text-white/40 - Disabled text
```

### Spacing Scale
```css
space-1 (4px)   - Tight spacing
space-2 (8px)   - Small gaps
space-3 (12px)  - Default gaps
space-4 (16px)  - Medium gaps
space-6 (24px)  - Large gaps
space-8 (32px)  - Section spacing
space-12 (48px) - Page spacing
```

### Border Radius
```css
rounded-lg   (8px)  - Small elements, badges
rounded-xl   (12px) - Buttons, inputs
rounded-2xl  (16px) - Cards, panels, modals
rounded-full        - Circular elements, avatars
```

### Glassmorphism Effect
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### Blur Levels
```css
blur(12px) - Subtle blur for light overlays
blur(24px) - Standard glassmorphism
blur(40px) - Heavy blur for modals
```

### Transitions & Animations
```css
.smooth-transition {
  transition: all 0.2s ease-in-out;
}
```

* All interactive elements should have smooth transitions
* Hover states should scale slightly (1.02-1.05) or change opacity
* Keep animations subtle and professional
* Target 60fps performance

---

## Component Guidelines

### Buttons

#### Primary Button
* **Purpose**: Main call-to-action
* **Visual**: Gradient background (cyan to purple)
* **Usage**: One per section for primary action
```tsx
className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition"
```

#### Secondary Button
* **Purpose**: Supporting actions
* **Visual**: Glass effect with border
* **Usage**: Alternative actions, cancel buttons
```tsx
className="px-6 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 smooth-transition"
```

#### Icon Button
* **Purpose**: Icon-only actions
* **Visual**: Square or circular, glass background
* **Usage**: Toolbars, compact actions
```tsx
className="p-2 rounded-lg hover:bg-white/5 text-white/60 smooth-transition"
```

#### Destructive Button
* **Purpose**: Delete, remove actions
* **Visual**: Red color scheme
* **Usage**: Confirmation dialogs
```tsx
className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 smooth-transition"
```

### Cards

#### Glass Card (Base)
* **Purpose**: Primary container for content
* **Visual**: Glassmorphic with backdrop blur
* **Usage**: All major content sections
```tsx
className="glass-card p-6 rounded-2xl"
```

#### Stat Card
* **Purpose**: Display metrics and KPIs
* **Visual**: Icon + label + value
* **Layout**: Horizontal flex with icon on left
```tsx
<div className="glass-card p-6 rounded-2xl">
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-cyan-500/20">
      {/* Icon */}
    </div>
    <div>
      <p className="text-sm text-white/60">Label</p>
      <p className="text-2xl text-white/95">Value</p>
    </div>
  </div>
</div>
```

#### Interactive Card
* **Purpose**: Clickable cards with hover effects
* **Visual**: Scale on hover, cursor pointer
* **Usage**: Project cards, article cards
```tsx
className="glass-card p-6 rounded-2xl smooth-transition hover:scale-[1.02] cursor-pointer"
```

### Forms & Inputs

#### Text Input
* **States**: Default, Focus, Error, Disabled
* **Visual**: Glass background with focus border
```tsx
className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50 smooth-transition"
```

#### Error State
```tsx
className="w-full px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/50 text-white/90"
```

#### Helper Text
```tsx
<p className="text-xs mt-2 text-white/50">Helper message</p>
```

#### Error Message
```tsx
<p className="text-xs mt-2 text-red-400">Error message</p>
```

### Modals

#### Modal Structure
```tsx
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="glass-card rounded-2xl p-8 w-full max-w-lg bg-[#0f0f19]/95" 
         style={{ backdropFilter: 'blur(40px)' }}>
      {/* Modal content */}
    </div>
  </div>
)}
```

#### Modal Header
* Include title and close button
* Use flex justify-between for layout

#### Modal Actions
* Primary action on right
* Cancel/secondary on left
* Use full width on mobile

### Alerts & Feedback

#### Alert Types
```tsx
// Success
className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"

// Error
className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"

// Warning
className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"

// Info
className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
```

#### Badges
* Use color/20 for background
* Use color/400 for text
* Add dot indicator for status
```tsx
<span className="px-3 py-1 rounded-lg text-sm bg-cyan-500/20 text-cyan-400">
  Active
</span>
```

#### Loading States
* Use Lucide Loader icon with animate-spin
* Display skeleton screens for content loading
* Show progress bars for uploads/processes

### Navigation

#### Icon Navigation Bar
* Vertical bar on far left (64px width)
* 7 main navigation items with color-coded icons
* Active state with gradient background
* Tooltips on hover

#### Left Sidebar
* Collapsible with context-aware menu items
* Shows sub-navigation for active section
* Toggle button in header
* 256px expanded, 64px collapsed

#### Right Sidebar
* Active timers section
* Quick task list
* Persistent across routes

---

## Layout Structure

### Three-Column Layout
```
[Icon Nav] [Left Sidebar] [Main Content] [Right Sidebar]
  64px        256px           flex-1          320px
```

### Grid Patterns
```tsx
// 2 columns
className="grid grid-cols-1 md:grid-cols-2 gap-6"

// 3 columns
className="grid grid-cols-1 md:grid-cols-3 gap-6"

// 4 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

### Responsive Breakpoints
* Mobile: < 768px (single column)
* Tablet: 768px - 1024px (2 columns)
* Desktop: > 1024px (full layout)

---

## Routing Guidelines

### React Router Setup
* Use 'react-router' package (NOT 'react-router-dom')
* Implement Data mode with createBrowserRouter
* Use RouterProvider in App.tsx
* Define routes in routes.tsx

### Route Structure
```tsx
{
  path: '/section',
  children: [
    { index: true, element: <Navigate to="/section/overview" /> },
    { path: 'overview', element: <Overview /> },
    { path: 'subsection', element: <Subsection /> }
  ]
}
```

### Navigation Patterns
* Use Link from 'react-router' for internal links
* Maintain breadcrumb context
* Update sidebar active states based on location
* Support browser back/forward buttons

---

## Data & State Management

### Context Usage
* ThemeContext: Dark/light mode toggle
* SidebarContext: Sidebar expand/collapse state

### Local State
* Form inputs and validation
* Modal open/close states
* Accordion expand/collapse
* Filter and sort preferences

### Data Structures
* Use TypeScript interfaces for all data
* Implement proper typing for API responses
* Create mock data for development
* Use placeholder content realistically

---

## Charts & Data Visualization

### Chart Library
* Use Recharts for all charts
* Customize with glassmorphic theme
* Support dark mode
* Add interactive tooltips

### Available Charts
* Area Chart - Trends over time
* Bar Chart - Comparisons
* Line Chart - Data progression
* Stacked Bar Chart - Multi-series data
* Donut Chart - Proportions
* Radial Progress - Completion status
* Heatmap - Activity patterns

### Chart Styling
* Use accent colors from palette
* Add gradient fills where appropriate
* Keep axes and labels readable (white/50)
* Include hover states and tooltips

---

## Accessibility Guidelines

### Text Contrast
* Maintain WCAG AA standards minimum
* Use high opacity (90%+) for primary text
* Ensure buttons have clear focus states

### Keyboard Navigation
* All interactive elements should be keyboard accessible
* Implement focus traps in modals
* Use proper semantic HTML

### Screen Reader Support
* Use proper ARIA labels
* Include sr-only text for icon buttons
* Maintain logical heading hierarchy

---

## File Organization

```
/src/app
  ├── App.tsx              # Main app entry
  ├── Layout.tsx           # Three-column layout
  ├── routes.tsx           # Route definitions
  ├── /components
  │   ├── Header.tsx
  │   ├── IconNavBar.tsx
  │   ├── Sidebar.tsx
  │   ├── RightSidebar.tsx
  │   ├── /charts          # Chart components
  │   ├── /health          # Health section
  │   ├── /life            # Mind Command
  │   ├── /projects        # Projects & Tasks
  │   ├── /systems         # System Monitor
  │   └── /ui              # Reusable UI components
  ├── /pages
  │   ├── /components      # Component Library
  │   └── /newsfeed        # Newsfeed pages
  └── /contexts
      ├── ThemeContext.tsx
      └── SidebarContext.tsx
```

---

## Testing & Quality Assurance

### Manual Testing Checklist
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Verify dark mode styling
- [ ] Check all navigation flows
- [ ] Test form validation
- [ ] Verify modal behavior
- [ ] Check loading states
- [ ] Test hover interactions
- [ ] Verify sidebar collapse/expand

### Code Review Points
- [ ] No console errors
- [ ] Proper TypeScript types
- [ ] Consistent naming conventions
- [ ] Proper component organization
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] Responsive design verified

---

## Best Practices Summary

1. **Always use glassmorphic styling** for cards and containers
2. **Implement smooth transitions** on all interactive elements
3. **Use gradient backgrounds** for primary actions
4. **Maintain text opacity hierarchy** for visual clarity
5. **Keep spacing consistent** using the 4px scale
6. **Design mobile-first** then enhance for desktop
7. **Use semantic HTML** for accessibility
8. **Leverage Tailwind utilities** over custom CSS
9. **Test across breakpoints** before completing features
10. **Document component usage** in Component Library

---

## Component Library Reference

All components are documented with live examples in the Component Library section (`/components`). Reference this for:
* Component code snippets
* Usage examples
* Design tokens
* Color palette
* Typography scale
* Spacing system
* Layout patterns

Visit `/components` in the application for the complete interactive reference.

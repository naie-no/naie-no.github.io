# NAIE Website Redesign - Development Plan

## Design Guidelines

### Design References
- **Current site**: https://naie.no/ - Norwegian AI Ethics Association
- **Style**: Clean, Professional, Nordic Minimalism with modern tech feel

### Color Palette
- Primary: #1B2A4A (Deep Navy - headers, primary elements)
- Secondary: #2D5F8A (Steel Blue - accents, links)
- Accent: #4ECDC4 (Teal/Mint - CTAs, highlights)
- Background: #F8FAFB (Light Gray-Blue)
- Surface: #FFFFFF (White - cards)
- Text Primary: #1A1A2E (Near Black)
- Text Secondary: #6B7280 (Gray)
- Success: #10B981 (Green - for stats)
- Warning: #F59E0B (Amber)

### Typography
- Headings: Inter, font-weight 700
- Subheadings: Inter, font-weight 600
- Body: Inter, font-weight 400
- Navigation: Inter, font-weight 500

### Key Component Styles
- **Buttons**: Rounded-lg, primary teal accent, hover darken
- **Cards**: White bg, subtle shadow, rounded-xl, hover lift
- **Navigation**: Sticky, white bg with blur backdrop, clean borders
- **Sections**: Generous padding (py-16 to py-24), alternating bg

### Layout
- Max-width container: 1200px
- Section spacing: 80-96px vertical
- Card grid: 3 columns desktop, 2 tablet, 1 mobile
- Hero: Full-width with gradient overlay

### Images to Generate
1. **hero-ai-ethics-abstract.jpg** - Abstract visualization of AI ethics, neural networks with balanced scales, blue and teal tones, professional and modern (Style: minimalist, 1024x576)
2. **pillar-bias.jpg** - Abstract representation of bias detection in AI, data patterns with magnifying glass concept, blue tones (Style: minimalist, 1024x1024)
3. **pillar-responsible-ai.jpg** - Abstract representation of responsible AI, human and machine collaboration, teal tones (Style: minimalist, 1024x1024)
4. **pillar-sustainability.jpg** - Abstract representation of AI sustainability, green technology and nature integration, green-blue tones (Style: minimalist, 1024x1024)

---

## Development Tasks

### Files to Create (8 files max)

1. **src/pages/Index.tsx** - Homepage with hero, pillars, milestones, articles
2. **src/components/Navigation.tsx** - Responsive navigation with all menu items and language switcher
3. **src/components/Footer.tsx** - Footer with links, CC license, social
4. **src/pages/OmOss.tsx** - About Us page with board members, mission
5. **src/pages/Aktiviteter.tsx** - Activities overview + sub-sections (Bias, Ansvarlig AI, Bærekraft)
6. **src/pages/Resultater.tsx** - Results page
7. **src/pages/Ressurser.tsx** - Resources, News, Press & Events, For Organizations, Contact combined into secondary pages
8. **src/App.tsx** - Updated routing

### Content Structure
- Norwegian as primary language
- All content from existing naie.no site
- Professional, clean layout
- Mobile-responsive design
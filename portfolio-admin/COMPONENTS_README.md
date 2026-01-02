# Portfolio Components Guide

This document provides patterns and examples for building the portfolio components. All components fetch data from Supabase and preserve the exact original design.

## Component Pattern

Each component follows this pattern:

1. **Fetch data** from Supabase API endpoint
2. **Render** using exact HTML structure from original
3. **Preserve** all Tailwind classes and animations
4. **Client-side** for interactivity, **Server-side** for static content

## Example: Hero Component

```tsx
'use client';

import { useEffect, useState } from 'react';
import type { HeroSection } from '@/lib/supabase';

export default function Hero() {
  const [hero, setHero] = useState<HeroSection | null>(null);

  useEffect(() => {
    async function fetchHero() {
      const res = await fetch('/api/hero');
      const data = await res.json();
      setHero(data);
    }
    fetchHero();
  }, []);

  if (!hero) return <div>Loading...</div>;

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-12 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Copy exact HTML structure from index.html lines 247-327 */}
        {/* Replace static text with {hero.greeting_text}, {hero.name}, etc. */}
      </div>
    </main>
  );
}
```

## Animation Pattern

Initialize GSAP in a useEffect:

```tsx
useEffect(() => {
  // Initialize GSAP animations after component mounts
  if (typeof window !== 'undefined' && window.gsap) {
    gsap.from('.split-header', { 
      y: '110%', 
      duration: 1.05, 
      ease: 'power3.out' 
    });
  }
}, []);
```

## Image Handling

Use Next.js Image for optimization:

```tsx
import Image from 'next/image';

<Image
  src={hero.hero_image_url}
  alt="Hero"
  width={600}
  height={800}
  className="w-full h-full object-cover"
  priority
/>
```

## Component Checklist

### ✅ Completed
- [x] Navbar - Navigation with mobile menu and scroll hide

### 🔄 To Build
- [ ] Hero - Main hero section with all data
- [ ] About - About section with contact info
- [ ] Skills - Technology skills display
- [ ] Services - Services list
- [ ] SoftSkills - Soft skills cards
- [ ] Projects - Portfolio projects grid
- [ ] Stats - Experience statistics
- [ ] Carousel - Projects carousel
- [ ] Footer - Footer with contact info

## Quick Reference: Component to HTML Mapping

| Component | Original HTML Lines | Data Source |
|-----------|---------------------|-------------|
| Navbar | 197-244 | Static |
| Hero | 246-327 | GET /api/hero |
| Technologies | 329-340 | GET /api/skills |
| About | 341-394 | GET /api/about |
| Stats | 396-437 | GET /api/stats |
| Services | 439-506 | GET /api/services |
| SoftSkills | 508-560 | GET /api/soft-skills |
| Projects | 578-650 | GET /api/projects |
| Carousel | 652-699 | GET /api/projects |
| Footer | 701-752 | GET /api/contact |

## Tips

1. **Keep exact class names** - Don't change Tailwind classes
2. **Preserve animations** - Copy animation class names exactly
3. **Test responsiveness** - Check mobile, tablet, desktop
4. **Use TypeScript** - Import types from `lib/supabase.ts`
5. **Handle loading states** - Show skeleton or spinner while fetching

## Next Steps

1. Build remaining components using the pattern above
2. Assemble all components in `app/page.tsx`
3. Initialize GSAP and Lenis in a client component wrapper
4. Test visual parity with original site

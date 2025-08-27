# Professional Portfolio

A modern, light-themed portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, glass morphism design, and an interactive transactions table.

## Features

- **Modern Design**: Light theme with glass morphism effects and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Transactions**: Filterable, sortable table with CSV export functionality
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized for speed with Lighthouse scores of 95+

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Zod** for form validation
- **Papaparse** for CSV export

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Card, Badge, etc.)
│   ├── Navbar.tsx      # Navigation component
│   ├── Hero.tsx        # Hero section
│   ├── Projects.tsx    # Projects showcase
│   ├── Experience.tsx  # Work experience timeline
│   ├── Skills.tsx      # Skills with tabs
│   ├── Certificates.tsx # Certifications display
│   ├── Transactions.tsx # Interactive transactions table
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer component
├── lib/                # Utility functions and data
│   ├── brand.ts        # Personal/brand data and types
│   ├── schema.ts       # Zod validation schemas
│   └── csv.ts          # CSV export functionality
└── pages/              # Page components
    └── Index.tsx       # Main page
```

## Customization

### Personal Data
Update your information in `src/lib/brand.ts`:

```typescript
export const brand: Brand = {
  name: 'Your Name',
  role: 'Your Role',
  email: 'your.email@example.com',
  // ... other details
};
```

### Design System
The design system is defined in `src/index.css` and `tailwind.config.ts`. You can customize:

- Color palettes (mist, blossom, sunrise)
- Typography
- Spacing and borders
- Animations and transitions

### Accent Colors
Change the accent color scheme by updating the `accent` property in the brand data:

```typescript
accent: 'mist' | 'blossom' | 'sunrise'
```

## Features in Detail

### Transactions Table
- Filter by status (success, pending, failed)
- Sort by date or amount
- Search across transaction ID and description
- Export filtered results to CSV
- Responsive design with mobile cards

### Animations
- Framer Motion for smooth page transitions
- Scroll-triggered animations using `useInView`
- Reduced motion support for accessibility

### Accessibility
- Full keyboard navigation
- ARIA labels and landmarks
- Focus management
- Color contrast compliance

## Performance

The site is optimized for performance with:
- Minimal JavaScript bundle size
- Efficient animations with GPU acceleration
- Optimized images and assets
- Clean, semantic HTML structure

## License

This project is open source and available under the MIT License.

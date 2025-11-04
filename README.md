# Espinosa's Hand Carwash

A modern, responsive website for Espinosa's Hand Carwash built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for md and lg screens
- **Modern UI**: Clean, professional design using shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **React Router**: Client-side routing for seamless navigation
- **Accessibility**: Skip-to-content links and proper semantic HTML

## Design System

### Brand Colors

- **Primary**: #133e87 (headers, nav, CTAs)
- **Cream**: #f3f3e0 (backgrounds/content)
- **Accent**: #eff7ff (subtle bg/borders)
- **Dark**: #030c2e (text/footer/high-contrast)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 100-900
- **Responsive Sizing**: Mobile-first approach

## Pages

- **Home**: Hero section, stats, about, services, how it works, testimonials, store, FAQ, quality guarantee, contact
- **About**: Company story, values, team, statistics
- **Services**: Service catalog with search and filtering
- **Locations**: Branch locations with contact information and maps

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd MO-IT161-Group3
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SkipToContent.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── accordion.tsx
│       ├── select.tsx
│       └── dialog.tsx
├── lib/
│   ├── tokens.ts
│   └── utils.ts
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   └── Locations.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **React Router DOM**: Routing
- **Lucide React**: Icons
- **Radix UI**: Accessible component primitives

## Design Tokens

The project uses a comprehensive design token system defined in `src/lib/tokens.ts`:

- **Colors**: Brand colors with variations
- **Typography**: Font families, sizes, weights, and spacing
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corner values
- **Shadows**: Box shadow definitions
- **Breakpoints**: Responsive breakpoints
- **Animation**: Transition durations and timing functions

## Customization

### Adding New Colors

Add new colors to the `colors` object in `src/lib/tokens.ts` and they will be available in Tailwind classes.

### Adding New Components

Create new components in the `src/components/` directory following the existing patterns.

### Modifying Styles

Update the design tokens in `src/lib/tokens.ts` or add custom styles in `src/index.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

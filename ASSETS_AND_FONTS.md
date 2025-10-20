# Assets and Fonts Documentation

This document lists all the assets and fonts used in the Espinosa's Hand Carwash project.

## 📁 Assets Structure

```
src/assets/
├── images/
│   ├── logos/
│   │   ├── brand/
│   │   │   └── SVG/
│   │   │       └── espinosa-logo.svg
│   │   └── payments/
│   │       ├── Gcash.svg
│   │       ├── Mastercard.svg
│   │       ├── Maya.svg
│   │       ├── QR_Ph_Logo.svg
│   │       └── Visa.svg
│   ├── products/
│   │   ├── car-shampoo.png
│   │   ├── car-wax.png
│   │   ├── detailing-kit.png
│   │   ├── interior-cleaner.png
│   │   ├── microfiber-towel.png
│   │   ├── tire-gel.png
│   │   └── wheel-brush.png
│   └── services/
│       ├── basic-wash.jpg
│       ├── engine-bay-clean.jpg
│       ├── full-detailing.jpg
│       ├── hero-background.jpg
│       ├── interior-deepclean.jpg
│       ├── premium-wash.jpg
│       ├── service-basics.jpg
│       ├── service-detailing.jpg
│       ├── service-premium.jpg
│       └── wax-application.jpg
```

## 🎨 Brand Assets

### Logo
- **File**: `src/assets/images/logos/brand/SVG/espinosa-logo.svg`
- **Usage**: Main brand logo used in header and footer
- **Component**: `src/components/ui/Logo.tsx`

## 💳 Payment Method Logos

All payment logos are SVG format for crisp display at any size:

- **Visa**: `src/assets/images/logos/payments/Visa.svg`
- **Mastercard**: `src/assets/images/logos/payments/Mastercard.svg`
- **GCash**: `src/assets/images/logos/payments/Gcash.svg`
- **QR Ph**: `src/assets/images/logos/payments/QR_Ph_Logo.svg`
- **Maya**: `src/assets/images/logos/payments/Maya.svg`

**Component**: `src/components/ui/PaymentLogo.tsx`

## 🚗 Service Images

High-quality JPG images showcasing car wash services:

- **Basic Wash**: `src/assets/images/services/basic-wash.jpg`
- **Premium Wash**: `src/assets/images/services/premium-wash.jpg`
- **Full Detailing**: `src/assets/images/services/full-detailing.jpg`
- **Wax Application**: `src/assets/images/services/wax-application.jpg`
- **Interior Deep Clean**: `src/assets/images/services/interior-deepclean.jpg`
- **Engine Bay Clean**: `src/assets/images/services/engine-bay-clean.jpg`
- **Hero Background**: `src/assets/images/services/hero-background.jpg`

**Usage**: Service cards, hero sections, and service showcases

## 🛍️ Product Images

PNG images of car care products:

- **Car Shampoo**: `src/assets/images/products/car-shampoo.png`
- **Car Wax**: `src/assets/images/products/car-wax.png`
- **Detailing Kit**: `src/assets/images/products/detailing-kit.png`
- **Interior Cleaner**: `src/assets/images/products/interior-cleaner.png`
- **Microfiber Towel**: `src/assets/images/products/microfiber-towel.png`
- **Tire Gel**: `src/assets/images/products/tire-gel.png`
- **Wheel Brush**: `src/assets/images/products/wheel-brush.png`

**Usage**: Product cards and shopping sections

## 🔗 External Assets

### Map Assets (Leaflet)
- **Marker Icon**: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png`
- **Marker Shadow**: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png`
- **Map Tiles**: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`

## 🔤 Typography & Fonts

### Google Fonts Used

The project uses three Google Fonts loaded via CDN:

1. **Inter** (Primary UI Font)
   - **URL**: `https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap`
   - **Usage**: General UI elements, buttons, forms
   - **Weights**: 100-900

2. **Oxanium** (Display Font)
   - **URL**: `https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap`
   - **Usage**: Headings, hero text, brand elements
   - **Weights**: 200-800

3. **Open Sans** (Body Text)
   - **URL**: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap`
   - **Usage**: Body text, navigation, professional elements
   - **Weights**: 300-800

### Font Usage in CSS

```css
/* Primary UI Font */
font-family: 'open-sans', system-ui, sans-serif;

/* Display Font */
font-family: 'oxanium', system-ui, sans-serif;

/* Inter Font */
font-family: 'inter', system-ui, sans-serif;
```

## 📱 Responsive Images

All images are optimized for:
- **Desktop**: High resolution for crisp display
- **Mobile**: Compressed for fast loading
- **Retina**: 2x resolution support

## 🎯 Asset Guidelines

### Image Optimization
- **Services**: JPG format for photographic content
- **Products**: PNG format for product shots with transparency
- **Logos**: SVG format for scalability
- **Compression**: Optimized for web delivery

### Font Loading
- **Strategy**: `display=swap` for better performance
- **Fallbacks**: System fonts as fallbacks
- **Loading**: Preloaded for critical fonts

## 🔧 Asset Management

### Adding New Assets
1. Place images in appropriate subdirectory under `src/assets/images/`
2. Use descriptive filenames with hyphens
3. Optimize images for web delivery
4. Update this documentation

### Font Changes
1. Update Google Fonts imports in `src/index.css`
2. Update font-family declarations
3. Test across all components
4. Update this documentation

## 📊 Asset Statistics

- **Total Images**: 20 files
- **Brand Assets**: 1 logo
- **Payment Logos**: 5 SVG files
- **Service Images**: 7 JPG files
- **Product Images**: 7 PNG files
- **Fonts**: 3 Google Fonts
- **External Assets**: 3 Leaflet assets

---

*Last updated: January 2025*
*Project: Espinosa's Hand Carwash - MO-IT161-Group3*

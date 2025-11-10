# Favicon Setup Guide

This document explains how to add proper favicon files for the Espinosa's Hand Carwash website.

## Current Setup

- ✅ `favicon.svg` - Modern SVG favicon (works in all modern browsers)
- ✅ `index.html` - Updated with proper favicon links

## Required Image Files

To complete the favicon setup, you need to create the following image files from the logo:

### 1. PNG Favicons (for older browser support)
- `favicon-16x16.png` - 16x16 pixels
- `favicon-32x32.png` - 32x32 pixels

### 2. Apple Touch Icon
- `apple-touch-icon.png` - 180x180 pixels (for iOS devices)

### 3. PWA Icons (for manifest.json)
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

### 4. Microsoft Tile
- `mstile-150x150.png` - 150x150 pixels (for Windows tiles)

## How to Generate These Files

### Option 1: Online Tools (Easiest)
1. Go to https://realfavicongenerator.net/
2. Upload `public/favicon.svg` or your logo image
3. Configure settings:
   - iOS: 180x180
   - Android: 192x192 and 512x512
   - Windows: 150x150
4. Download the generated files
5. Place all files in the `public/` directory

### Option 2: Image Editing Software
1. Open your logo in Photoshop, GIMP, or similar
2. Export/resize to each required size
3. Save as PNG files with the exact names listed above
4. Place in `public/` directory

### Option 3: Command Line (if you have ImageMagick)
```bash
# Convert SVG to PNG at different sizes
convert -background none -resize 16x16 favicon.svg favicon-16x16.png
convert -background none -resize 32x32 favicon.svg favicon-32x32.png
convert -background none -resize 180x180 favicon.svg apple-touch-icon.png
convert -background none -resize 192x192 favicon.svg icon-192.png
convert -background none -resize 512x512 favicon.svg icon-512.png
convert -background none -resize 150x150 favicon.svg mstile-150x150.png
```

## Testing

After adding the files:
1. Clear browser cache
2. Check favicon appears in browser tab
3. Test on mobile devices (iOS/Android)
4. Verify PWA installation shows correct icon

## Notes

- The SVG favicon (`favicon.svg`) will work in modern browsers even without PNG files
- PNG files provide better compatibility with older browsers
- All icons should use the brand color (#1a472a) as background if needed
- Icons should be square and centered


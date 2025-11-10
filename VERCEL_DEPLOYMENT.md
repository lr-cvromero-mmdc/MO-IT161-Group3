# Vercel Deployment Guide

This guide explains how to deploy the Espinosa's Hand Carwash website to Vercel.

---

## 🚀 Quick Setup

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel:**
   - Go to: https://vercel.com
   - Sign up with GitHub (recommended for automatic deployments)

2. **Import Your Repository:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `chrstphrpond/carwash-website`
   - Vercel will auto-detect Vite settings

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm ci` (auto-detected)
   - **Root Directory:** `./` (default)

4. **Environment Variables (Optional):**
   - Add any environment variables if needed:
     - `VITE_APP_NAME` (optional, has default)
     - `VITE_ENABLE_ANALYTICS` (optional)
     - `VITE_GA_TRACKING_ID` (if using analytics)

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete
   - Your site will be live at: `https://carwash-website-*.vercel.app`

---

## 📍 Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Enter your domain (e.g., `espinosacarwash.com`)
3. Click "Add"

### Step 2: Configure DNS

Vercel will provide DNS records. Add them to your domain registrar:

**For Root Domain (espinosacarwash.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.espinosacarwash.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for DNS Propagation

- Usually takes 5-30 minutes
- Vercel will automatically issue SSL certificate

---

## ⚙️ Configuration

### Automatic Deployments

Vercel automatically deploys when you:
- ✅ Push to `main` branch → **Production** deployment
- ✅ Push to other branches → **Preview** deployment
- ✅ Open a Pull Request → **Preview** deployment

### Manual Deployment

1. Go to your project dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on any deployment

---

## 🔄 Build Configuration

The project uses `vercel.json` for configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ All routes redirect to `index.html` (SPA routing)
- ✅ Static assets are cached properly
- ✅ Build output is optimized

---

## 📊 Deployment Status

Check deployment status:
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Deployment URL:** Shown after each deployment
- **Build Logs:** Available in each deployment

---

## 🐛 Troubleshooting

### Issue: 404 on routes

**Solution:** The `vercel.json` rewrite rules should handle this. If not, ensure:
1. `vercel.json` is in the root directory
2. Rewrite rule is configured correctly
3. Build completed successfully

### Issue: Assets not loading

**Solution:** 
1. Check that `vite.config.ts` uses `/` as base path (not `/carwash-website/`)
2. Verify build output in `dist/` folder
3. Check browser console for 404 errors

### Issue: Build fails

**Check:**
1. Build logs in Vercel dashboard
2. Local build: `npm run build`
3. TypeScript errors: `npm run type-check` (if available)

---

## ✅ Advantages of Vercel

1. **Automatic Deployments:** Every push = new deployment
2. **Preview Deployments:** Test PRs before merging
3. **Better Performance:** Global CDN, edge caching
4. **No Base Path Issues:** Works with `/` root path
5. **Easy Custom Domains:** One-click SSL certificates
6. **Analytics:** Built-in performance monitoring
7. **Instant Rollbacks:** One-click revert to previous version

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

---

## 📝 Next Steps

After deployment:

1. ✅ Test all routes (Home, About, Services, etc.)
2. ✅ Verify images load correctly
3. ✅ Test booking flow
4. ✅ Check mobile responsiveness
5. ✅ Set up custom domain (optional)

---

**Last Updated:** November 7, 2025


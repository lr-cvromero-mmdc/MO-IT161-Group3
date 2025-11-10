# GitHub Pages Deployment Guide

This guide explains how to deploy the Espinosa's Hand Carwash website to GitHub Pages.

---

## 🚀 Quick Setup

### Step 1: Enable GitHub Pages

1. Go to your repository: `https://github.com/chrstphrpond/carwash-website`
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. Click **Save**

### Step 2: Deploy

The deployment will happen automatically when you push to the `main` branch, or you can trigger it manually:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

---

## 📍 Deployment URL

After deployment, your site will be available at:

**Project Pages (Default):**
```
https://chrstphrpond.github.io/carwash-website/
```

**Note:** If you're using a custom domain, see the Custom Domain section below.

---

## ⚙️ Configuration

### Base Path

The application is configured to use `/carwash-website/` as the base path for GitHub Pages.

**To change the base path:**

1. Edit `.github/workflows/deploy.yml`:
   ```yaml
   env:
     VITE_BASE_PATH: /your-path/
   ```

2. Or set it in `.env` file:
   ```env
   VITE_BASE_PATH=/your-path/
   ```

**For custom domain (root path):**
```yaml
env:
  VITE_BASE_PATH: /
```

---

## 🌐 Custom Domain Setup

### Option 1: Using GitHub Pages Custom Domain

1. In repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `espinosacarwash.com`)
3. Update `vite.config.ts` or set `VITE_BASE_PATH=/` in workflow
4. Add a `CNAME` file in `public/` directory:
   ```
   espinosacarwash.com
   ```

### Option 2: Using Subdomain

If using a subdomain like `carwash.yourdomain.com`:
1. Set `VITE_BASE_PATH=/` in workflow
2. Configure DNS CNAME record pointing to `chrstphrpond.github.io`

---

## 🔄 Automatic Deployment

The workflow automatically deploys when:
- ✅ Code is pushed to `main` branch
- ✅ Manual trigger via GitHub Actions UI

### Workflow Steps

1. **Build** - Compiles TypeScript and builds production bundle
2. **Upload** - Uploads `dist/` folder as artifact
3. **Deploy** - Deploys to GitHub Pages

---

## 📝 Environment Variables

The deployment workflow sets:
- `VITE_APP_NAME`: "Espinosa's Hand Carwash"
- `VITE_BASE_PATH`: `/carwash-website/`

To add more environment variables, edit `.github/workflows/deploy.yml`:
```yaml
env:
  VITE_APP_NAME: "Espinosa's Hand Carwash"
  VITE_BASE_PATH: /carwash-website/
  VITE_ENABLE_ANALYTICS: true
  VITE_GA_TRACKING_ID: G-XXXXXXXXXX
```

---

## 🐛 Troubleshooting

### Issue: 404 errors on routes

**Solution:** Ensure `VITE_BASE_PATH` matches your GitHub Pages URL structure.

### Issue: Assets not loading

**Solution:** Check that all asset paths use relative paths or the configured base path.

### Issue: Deployment fails

**Check:**
1. GitHub Actions logs for errors
2. Build succeeds locally: `npm run build`
3. `dist/` folder is generated correctly

### Issue: Site shows blank page

**Solution:**
1. Check browser console for errors
2. Verify base path is correct
3. Ensure React Router is configured for the base path

---

## ✅ Verification Checklist

After deployment:

- [ ] Site loads at GitHub Pages URL
- [ ] All routes work (Home, About, Services, etc.)
- [ ] Images and assets load correctly
- [ ] Navigation works properly
- [ ] Mobile responsive design works
- [ ] No console errors

---

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

## 📊 Deployment Status

Check deployment status:
- **Actions Tab**: View workflow runs and logs
- **Settings → Pages**: View deployment history
- **Repository → Environments**: View deployment environments

---

**Last Updated:** November 7, 2025


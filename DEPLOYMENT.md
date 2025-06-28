# 🚀 Deployment Guide

This guide provides instructions for deploying the WEB3 PORTFOLIO application to various free hosting platforms.

## 🌐 GitHub Pages (Current)

The application is currently deployed on GitHub Pages at: https://garvnet.github.io/gavi-portfolio/

### Automatic Deployment
```bash
npm run deploy
```

### Manual Deployment
1. Build the project: `npm run build`
2. Push to GitHub: `git push origin main`
3. GitHub Pages will automatically deploy from the `main` branch

## ⚡ Vercel (Recommended)

Vercel provides excellent performance and automatic deployments.

### Steps:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository: `garvnet/gavi-portfolio`
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"

### Configuration:
- The `vercel.json` file is already configured
- Automatic deployments on every push to `main`
- Custom domain support available

## 🎯 Netlify

Netlify is another excellent free hosting option.

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Click "New site from Git"
4. Choose your repository: `garvnet/gavi-portfolio`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Configuration:
- The `netlify.toml` file is already configured
- Automatic deployments on every push to `main`
- Custom domain support available

## 🔥 Firebase Hosting

Firebase provides Google's infrastructure for hosting.

### Steps:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📱 Surge.sh

Surge is a simple static site hosting service.

### Steps:
1. Install Surge: `npm install -g surge`
2. Build: `npm run build`
3. Deploy: `surge dist`

## 🔧 Environment Variables

For production deployments, you may want to set these environment variables:

```env
NODE_ENV=production
VITE_APP_TITLE=WEB3 PORTFOLIO
```

## 📊 Performance Optimization

The application is already optimized with:
- Code splitting and lazy loading
- Optimized bundle sizes
- Proper caching headers
- Gzip compression
- CDN distribution

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Fails**: Check Node.js version (requires 16+)
2. **Assets Not Loading**: Verify base path in `vite.config.ts`
3. **Routing Issues**: Ensure SPA fallback is configured
4. **Performance**: Check bundle sizes and optimize if needed

### Performance Monitoring:

- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Check bundle analyzer for optimization opportunities

## 🌍 Custom Domains

All platforms support custom domains:
- GitHub Pages: Settings → Pages → Custom domain
- Vercel: Project settings → Domains
- Netlify: Site settings → Domain management

## 📈 Analytics

Consider adding analytics to track usage:
- Google Analytics
- Vercel Analytics
- Netlify Analytics

---

**Choose the platform that best fits your needs!** 
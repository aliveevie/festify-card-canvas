# Vercel Deployment Guide

This is a **Vite + React** project, not a Next.js project.

## Vercel Configuration

The project includes a `vercel.json` file that explicitly tells Vercel this is a Vite project:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Environment Variables

Set these in your Vercel dashboard:

- `NEXT_PUBLIC_PROJECT_ID` - Your WalletConnect Project ID

## Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Troubleshooting

If you see "No Next.js version detected" error:

1. Make sure the `vercel.json` file is in your project root
2. Verify the framework is set to "vite" in Vercel dashboard
3. Check that `next-themes` dependency has been removed from package.json
4. Redeploy the project

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

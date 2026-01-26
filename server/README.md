# ChainGPT Image Generation Server

Express server for ChainGPT AI image generation and NFT minting.

## Deployment to Vercel

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Make sure you have a Vercel account

### Steps to Deploy

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Or for production:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables:**
   After deployment, set your environment variables in Vercel dashboard:
   - Go to your project settings → Environment Variables
   - Add `API_KEY` with your ChainGPT API key value
   - Redeploy after adding environment variables

### Environment Variables Required
- `API_KEY`: Your ChainGPT API key (required)

### API Endpoints
Once deployed, your API will be available at:
- `https://your-project.vercel.app/api/images/generate`
- `https://your-project.vercel.app/api/images/generate-nft`
- `https://your-project.vercel.app/api/images/mint-nft`
- `https://your-project.vercel.app/health`

### Update Frontend
After deployment, update your `.env.local` file:
```
VITE_API_URL=https://your-project.vercel.app
```

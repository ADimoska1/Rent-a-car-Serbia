# How to Find Your Vercel URL

After setting up environment variables, you need to find your Vercel deployment URL to configure the frontend.

## Method 1: From Overview Page (Easiest)

1. In Vercel Dashboard, click **"Overview"** in the top navigation bar
2. At the top of the page, you'll see your project's URL
3. It will look like: `https://rent-a-car-serbia.vercel.app` or `https://rent-a-car-serbia-[your-username].vercel.app`
4. Copy this URL

## Method 2: From Deployments Page

1. Click **"Deployments"** in the top navigation bar
2. Find your latest deployment (should be at the top)
3. Click on the deployment
4. You'll see the URL in the deployment details

## Method 3: From Project Settings

1. Go to **Settings** → **Domains**
2. Your default Vercel domain will be listed there

## After Finding Your URL

Once you have your Vercel URL (e.g., `https://rent-a-car-serbia.vercel.app`), you need to:

### Option 1: Add to Vercel Environment Variables (Recommended)

1. Go back to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add:
   - **Name:** `VITE_BACKEND_API_URL`
   - **Value:** `https://your-project-url.vercel.app/api/send-sms`
   - Select **Production**, **Preview**, and **Development**
4. Click **Save**
5. **Redeploy** your project (go to Deployments → click "..." → Redeploy)

### Option 2: Add to Local .env File (For Development)

Create or update `.env` file in your project root:

```env
VITE_BACKEND_API_URL=https://your-project-url.vercel.app/api/send-sms
```

Then restart your dev server.

## Important Notes

- Replace `your-project-url` with your actual Vercel URL
- The API endpoint is `/api/send-sms` (don't forget this!)
- After adding the environment variable, you need to **redeploy** for it to take effect
- For local development, you can use `http://localhost:3000/api/send-sms` if running `vercel dev`

## Quick Checklist

- ✅ Found Vercel URL
- ✅ Added `VITE_BACKEND_API_URL` to Vercel environment variables
- ✅ Redeployed the project
- ✅ Tested SMS sending

Your SMS should now work! 🎉


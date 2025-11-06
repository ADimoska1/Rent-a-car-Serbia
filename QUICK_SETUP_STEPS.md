# Quick Setup Steps - Almost Done! 🚀

Your Vercel URL: `rentacarserbia.vercel.app`

## Step 1: Add Environment Variable in Vercel

1. In Vercel Dashboard, go to **Settings** → **Environment Variables**
2. Click **"Add New"** button
3. Add this variable:
   - **Name:** `VITE_BACKEND_API_URL`
   - **Value:** `https://rentacarserbia.vercel.app/api/send-sms`
   - **Environments:** Select all three (Production, Preview, Development)
4. Click **"Save"**

## Step 2: Redeploy Your Project

After adding the environment variable, you need to redeploy:

1. Go to **"Deployments"** in the top navigation
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete

## Step 3: Update Local .env File (For Development)

Create or update `.env` file in your project root:

```env
VITE_BACKEND_API_URL=https://rentacarserbia.vercel.app/api/send-sms
```

Then restart your dev server if it's running.

## Step 4: Test SMS

1. Submit a test reservation on your website
2. Check your phone for SMS
3. Check admin phone (+381628952938) for notification
4. Check Vercel logs: **Functions** → `api/send-sms.js` → **Logs**

## ✅ You're Done!

After redeploying, SMS will work automatically! 🎉

## Troubleshooting

If SMS doesn't work:
1. Check Vercel logs for errors
2. Verify all 4 environment variables are set:
   - `TWILIO_ACCOUNT_SID` ✅
   - `TWILIO_AUTH_TOKEN` ✅
   - `TWILIO_PHONE_NUMBER` ✅
   - `VITE_BACKEND_API_URL` ✅ (NEW - add this one!)
3. Make sure you redeployed after adding the variable


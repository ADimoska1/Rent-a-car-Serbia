# Vercel Serverless Function Setup for SMS

This guide will help you set up SMS sending using Vercel serverless functions and Twilio.

## ✅ What's Already Created

- ✅ `api/send-sms.js` - Serverless function for sending SMS
- ✅ `vercel.json` - Vercel configuration
- ✅ Frontend code is ready to call the API

## 📋 Step-by-Step Setup

### Step 1: Install Twilio Package

Run this command in your project root:

```bash
npm install twilio
```

### Step 2: Get Your Twilio Credentials

1. Go to [Twilio Console](https://console.twilio.com/)
2. Copy your credentials:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click to reveal)
   - **Phone Number** (from "Phone Numbers" → "Manage" → "Active numbers")

### Step 3: Set Up Environment Variables in Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

   ```
   Name: TWILIO_ACCOUNT_SID
   Value: [Your Account SID from Twilio]
   ```

   ```
   Name: TWILIO_AUTH_TOKEN
   Value: [Your Auth Token from Twilio]
   ```

   ```
   Name: TWILIO_PHONE_NUMBER
   Value: [Your Twilio phone number, e.g., +1234567890]
   ```

5. Select **Production**, **Preview**, and **Development** for each variable
6. Click **Save**

#### Option B: Using Vercel CLI

```bash
vercel env add TWILIO_ACCOUNT_SID
vercel env add TWILIO_AUTH_TOKEN
vercel env add TWILIO_PHONE_NUMBER
```

### Step 4: Update Frontend Environment Variable

Update your `.env` file (or add to Vercel environment variables):

```env
# Your Vercel deployment URL (replace with your actual URL)
VITE_BACKEND_API_URL=https://your-project-name.vercel.app/api/send-sms
```

**For local development**, you can also use:
```env
VITE_BACKEND_API_URL=http://localhost:3000/api/send-sms
```

### Step 5: Deploy to Vercel

#### Option A: Using Vercel CLI

1. Install Vercel CLI (if not installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

#### Option B: Using GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy

### Step 6: Test the SMS Function

1. Submit a reservation on your website
2. Check your phone for the SMS
3. Check the admin phone (+381628952938) for the notification

## 🔧 Local Development

To test locally with Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run Vercel dev:
   ```bash
   vercel dev
   ```

3. This will start a local server that mimics Vercel's serverless functions

4. Update your `.env`:
   ```env
   VITE_BACKEND_API_URL=http://localhost:3000/api/send-sms
   ```

## 📝 Environment Variables Summary

### In Vercel Dashboard:
- `TWILIO_ACCOUNT_SID` - Your Twilio Account SID
- `TWILIO_AUTH_TOKEN` - Your Twilio Auth Token
- `TWILIO_PHONE_NUMBER` - Your Twilio phone number

### In Your Frontend `.env`:
- `VITE_BACKEND_API_URL` - Your Vercel API URL

## 🧪 Testing

1. **Test the API directly:**
   ```bash
   curl -X POST https://your-project.vercel.app/api/send-sms \
     -H "Content-Type: application/json" \
     -d '{"phone":"+381628952938","message":"Test message"}'
   ```

2. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `api/send-sms.js`
   - View logs to see if SMS was sent

3. **Check Twilio logs:**
   - Go to Twilio Console → Monitor → Logs → Messaging
   - See all sent SMS messages

## 🚨 Troubleshooting

### SMS not sending?

1. **Check environment variables:**
   - Make sure all three Twilio variables are set in Vercel
   - Make sure they're available for Production, Preview, and Development

2. **Check phone number format:**
   - Must include country code (e.g., +381628952938)
   - No spaces or dashes

3. **Check Twilio account:**
   - Verify your Twilio account is active
   - Check if you have credits/balance
   - Verify your phone number is verified (for trial accounts)

4. **Check Vercel logs:**
   - Go to Vercel Dashboard → Functions → View logs
   - Look for error messages

5. **Check CORS:**
   - The function includes CORS headers
   - If issues persist, check browser console for CORS errors

### Function timeout?

- The function is set to max 10 seconds (in `vercel.json`)
- SMS sending should be fast (< 2 seconds)
- If timing out, check Twilio credentials

### "Method not allowed" error?

- Make sure you're using POST request
- Check the API URL is correct

## 💰 Twilio Pricing

- **Free Trial**: $15.50 free credit
- **SMS Cost**: ~$0.0075 per SMS (US) or ~$0.05-0.10 (International)
- **Trial Limitations**: Can only send to verified phone numbers

## ✅ After Setup

Once everything is set up:
1. ✅ SMS will be sent to customer's phone
2. ✅ SMS will be sent to admin phone (+381628952938)
3. ✅ Both SMS are sent automatically on reservation
4. ✅ You can monitor all SMS in Twilio dashboard

## 🎉 You're Done!

After deploying to Vercel and setting up environment variables, SMS will work automatically!

Need help? Check:
- Vercel Docs: https://vercel.com/docs
- Twilio Docs: https://www.twilio.com/docs/sms
- Vercel Functions: https://vercel.com/docs/functions


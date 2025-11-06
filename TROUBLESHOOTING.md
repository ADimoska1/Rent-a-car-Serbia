# Troubleshooting: Notifications Not Sending

If you see "notifications could not be sent", follow these steps:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (Press F12)
2. Go to the **Console** tab
3. Submit a reservation again
4. Look for debug messages starting with 🔍, 📤, ✅, or ❌

## Step 2: Check What's Missing

### For SMS:
Look for this in console:
- `🔍 SMS Debug - Backend API URL: ...`
- If it shows `/api/send-sms` → Environment variable not set
- If it shows `https://rentacarserbia.vercel.app/api/send-sms` → Good!

### For Email:
Look for:
- `🔍 Email Debug - Service ID: Set/Not set`
- If any show "Not set" → EmailJS not configured

## Step 3: Fix the Issues

### Fix SMS (Backend API URL)

**If you're testing locally:**
1. Create `.env` file in project root:
   ```env
   VITE_BACKEND_API_URL=https://rentacarserbia.vercel.app/api/send-sms
   ```
2. Restart your dev server (`npm run dev`)

**If you're on Vercel:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Make sure `VITE_BACKEND_API_URL` is set to: `https://rentacarserbia.vercel.app/api/send-sms`
3. **Redeploy** your project (important!)

### Fix Email (EmailJS)

1. Set up EmailJS account (see `EMAIL_SMS_SETUP.md`)
2. Add to `.env` file (local) or Vercel environment variables:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Restart dev server or redeploy

## Step 4: Verify Vercel Function is Working

Test the API directly:

1. Open browser or use curl:
   ```
   https://rentacarserbia.vercel.app/api/send-sms
   ```

2. Or test with a POST request (use Postman or browser console):
   ```javascript
   fetch('https://rentacarserbia.vercel.app/api/send-sms', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       phone: '+381628952938',
       message: 'Test message'
     })
   }).then(r => r.json()).then(console.log)
   ```

3. Check Vercel logs:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `api/send-sms.js`
   - View logs for errors

## Common Issues

### Issue 1: "Backend API URL not configured"
**Solution:** Add `VITE_BACKEND_API_URL` to environment variables

### Issue 2: "SMS API error: 500"
**Solution:** Check Vercel function logs - likely Twilio credentials missing

### Issue 3: "CORS error"
**Solution:** The function includes CORS headers, but check if there's a network issue

### Issue 4: "Email service not configured"
**Solution:** Set up EmailJS and add credentials

## Quick Checklist

- [ ] `VITE_BACKEND_API_URL` is set in Vercel
- [ ] `TWILIO_ACCOUNT_SID` is set in Vercel
- [ ] `TWILIO_AUTH_TOKEN` is set in Vercel
- [ ] `TWILIO_PHONE_NUMBER` is set in Vercel
- [ ] Project has been redeployed after adding variables
- [ ] Browser console shows the correct API URL
- [ ] Vercel function logs show no errors

## Still Not Working?

1. Check browser console for specific error messages
2. Check Vercel function logs
3. Verify Twilio account is active and has credits
4. Test the API endpoint directly
5. Make sure phone numbers include country code (+381...)


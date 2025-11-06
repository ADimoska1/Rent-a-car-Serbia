# Vercel Project Removal & Re-Add Checklist

## ⚠️ BEFORE REMOVING THE PROJECT

### Step 1: Save Your Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables and copy these values:

#### Frontend Environment Variables (for Vercel):
```
VITE_EMAILJS_SERVICE_ID = _______________________
VITE_EMAILJS_TEMPLATE_ID = _______________________
VITE_EMAILJS_PUBLIC_KEY = _______________________
VITE_BACKEND_API_URL = https://rentacarserbia.vercel.app/api/send-sms
VITE_SMS_ENABLED = true
```

#### Backend Environment Variables (for Serverless Function):
```
TWILIO_ACCOUNT_SID = _______________________
TWILIO_AUTH_TOKEN = _______________________
TWILIO_PHONE_NUMBER = _______________________
```

### Step 2: Note Your Project Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (or `vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: (leave empty unless you changed it)

### Step 3: Note Your Domain

- **Production Domain**: `rentacarserbia.vercel.app`
- **Custom Domain** (if any): _______________________

---

## 🗑️ REMOVE THE PROJECT

1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll to the bottom
5. Click **Delete Project** or **Remove Project**
6. Confirm deletion

---

## ➕ RE-ADD THE PROJECT

### Step 1: Create New Project

1. In Vercel Dashboard, click **Add New Project**
2. Import your Git repository
3. Select the same repository (Rent-a-car-Serbia)
4. Vercel should auto-detect it's a Vite project
5. Click **Deploy**

### Step 2: Wait for Initial Deployment

- Wait for the build to complete (1-2 minutes)
- Note the new deployment URL (it might be different)

### Step 3: Add Environment Variables

Go to **Settings** → **Environment Variables** and add ALL the variables you saved above:

#### Add Frontend Variables:
1. Click **Add New**
2. Name: `VITE_EMAILJS_SERVICE_ID`
3. Value: (paste your saved value)
4. Select: ✅ Production, ✅ Preview, ✅ Development
5. Click **Save**

Repeat for:
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_BACKEND_API_URL` = `https://rentacarserbia.vercel.app/api/send-sms` (update with new URL if different)
- `VITE_SMS_ENABLED` = `true`

#### Add Backend Variables:
1. Click **Add New**
2. Name: `TWILIO_ACCOUNT_SID`
3. Value: (paste your saved value)
4. Select: ✅ Production, ✅ Preview, ✅ Development
5. Click **Save**

Repeat for:
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

### Step 4: Update VITE_BACKEND_API_URL

After deployment, update `VITE_BACKEND_API_URL` to match your new deployment URL:
- Go to Environment Variables
- Edit `VITE_BACKEND_API_URL`
- Change to: `https://your-new-url.vercel.app/api/send-sms`
- Save

### Step 5: Redeploy

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 6: Verify

1. Visit your new deployment URL
2. Check that the dark theme is showing
3. Test a reservation to verify email/SMS work
4. Check Vercel Functions logs to ensure SMS API is working

---

## ✅ Verification Checklist

After re-adding, verify:

- [ ] Dark theme is showing (not the old light theme)
- [ ] Navigation menu works
- [ ] Car selection shows horizontal cards
- [ ] Booking form works
- [ ] Email notifications work (test with a reservation)
- [ ] SMS notifications work (check both customer and admin phones)
- [ ] Environment variables are all set correctly
- [ ] Vercel Functions are working (check logs)

---

## 🆘 If Something Goes Wrong

1. **Check Build Logs**: Go to Deployments → Latest → Build Logs
2. **Check Function Logs**: Go to Functions → api/send-sms.js → Logs
3. **Verify Environment Variables**: Make sure all are set for Production
4. **Check Twilio Console**: Verify SMS are being sent
5. **Check EmailJS Dashboard**: Verify emails are being sent

---

## 📝 Quick Reference

**Your Current Project URL**: `rentacarserbia.vercel.app`

**After Re-adding, your new URL will be**: `_______________________.vercel.app`

Update this after re-adding!


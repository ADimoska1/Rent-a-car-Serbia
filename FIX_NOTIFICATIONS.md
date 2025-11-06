# Fix Email & SMS Notifications

## 🔴 Current Issues

1. **EmailJS Error**: Template ID not found
2. **CORS Error**: Vercel function needs to be redeployed with CORS fix

---

## ✅ Fix 1: EmailJS Template ID

### Step 1: Check Your EmailJS Dashboard

1. Go to [https://dashboard.emailjs.com/admin/templates](https://dashboard.emailjs.com/admin/templates)
2. Find your template (or create a new one)
3. Copy the **Template ID** (it looks like: `template_xxxxxxx`)

### Step 2: Update Your .env File

Create or update `.env` in your project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx  # ← Update this with your actual template ID
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# SMS Configuration
VITE_BACKEND_API_URL=https://rentacarserbia.vercel.app/api/send-sms
VITE_SMS_ENABLED=true
```

### Step 3: Get Your EmailJS Credentials

If you don't have them:

1. **Service ID**: Go to [Email Services](https://dashboard.emailjs.com/admin/integration)
2. **Template ID**: Go to [Templates](https://dashboard.emailjs.com/admin/templates)
3. **Public Key**: Go to [Account → General](https://dashboard.emailjs.com/admin)

### Step 4: Restart Your Dev Server

After updating `.env`:
```bash
# Stop your dev server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ Fix 2: CORS Error (Deploy Updated Code)

The CORS fix is already in your code, but it needs to be deployed to Vercel.

### Option A: Push to Git (Recommended)

1. **Commit your changes:**
   ```bash
   git add -A
   git commit -m "Fix CORS headers in SMS API"
   git push origin main
   ```

2. **Wait for Vercel to auto-deploy** (1-2 minutes)

3. **Test again** - CORS should be fixed

### Option B: If You're Removing/Re-adding Project

Follow the `VERCEL_REMOVAL_CHECKLIST.md` guide, and the CORS fix will be included in the new deployment.

---

## 🧪 Test After Fixing

1. **Test Email:**
   - Submit a reservation
   - Check console for "✅ Email sent successfully"
   - Check your email inbox

2. **Test SMS:**
   - Submit a reservation
   - Check console for "✅ SMS sent successfully"
   - Check your phone (+38971298158)
   - Check admin phone (+381628952938)

---

## 🔍 Verify EmailJS Template Variables

Make sure your EmailJS template has these variables (or adjust the code):

- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{flight_number}}`
- `{{car_name}}`
- `{{car_price}}`
- `{{pick_up_location}}`
- `{{pick_up_date}}`
- `{{pick_up_time}}`
- `{{drop_off_location}}`
- `{{drop_off_date}}`
- `{{drop_off_time}}`
- `{{rental_days}}`
- `{{total_price}}`
- `{{additional_options}}`

See `EMAIL_SMS_SETUP.md` for the full template example.

---

## 🆘 Still Not Working?

### EmailJS Issues:
- ✅ Check template ID is correct
- ✅ Check service ID is correct
- ✅ Check public key is correct
- ✅ Verify template variables match
- ✅ Check EmailJS dashboard for error logs

### SMS/CORS Issues:
- ✅ Make sure you pushed the latest code to Git
- ✅ Wait for Vercel deployment to complete
- ✅ Check Vercel Functions logs for errors
- ✅ Verify Twilio environment variables are set in Vercel
- ✅ Test the API directly: `curl -X POST https://rentacarserbia.vercel.app/api/send-sms -H "Content-Type: application/json" -d '{"phone":"+381628952938","message":"Test"}'`


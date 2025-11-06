# Fix Gmail EmailJS Authentication (412 Error)

## 🔴 Error: "Gmail_API: Request had insufficient authentication scopes"

This means your Gmail service in EmailJS needs to be re-authenticated.

## ✅ Step-by-Step Fix

### Step 1: Go to EmailJS Dashboard

1. Open [https://dashboard.emailjs.com/admin/integration](https://dashboard.emailjs.com/admin/integration)
2. You should see your Gmail service listed

### Step 2: Reconnect Gmail Service

1. **Click on your Gmail service** (or find the "Reconnect" button)
2. Click **"Reconnect"** or **"Authorize"** button
3. You'll be redirected to Google's login page
4. **Log in with the Gmail account** you want to use for sending emails
5. **IMPORTANT**: When Google asks for permissions, click **"Allow"** for ALL permissions:
   - ✅ Send email on your behalf
   - ✅ Read email (if asked)
   - ✅ Manage email settings (if asked)
6. You'll be redirected back to EmailJS

### Step 3: Verify Connection

1. Check that the service status shows **"Connected"** or **"Active"** (green)
2. Note your **Service ID** (it might be the same or different)

### Step 4: Update Your .env File (if Service ID changed)

If the Service ID changed, update your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx  # Use the new Service ID if it changed
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Step 5: Restart Your Dev Server

```bash
# Stop your dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 6: Test Email

1. Go to your website
2. Submit a test reservation
3. Check the browser console - you should see "✅ Email sent successfully"
4. Check the email inbox you used in the reservation

---

## 🧪 Test Email in EmailJS Dashboard First

Before testing on your website, test directly in EmailJS:

1. Go to [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Click on your template
3. Click the **"Test"** button
4. Fill in test data:
   - `customer_name`: Test User
   - `customer_email`: your-email@gmail.com
   - `car_name`: Test Car
   - etc.
5. Click **"Send Test Email"**
6. Check your inbox

**If this works**, then your EmailJS is configured correctly and the issue is in your code.
**If this doesn't work**, the Gmail service needs to be reconnected.

---

## 🔄 Alternative: Switch to Outlook (More Reliable)

If Gmail continues to have issues, switch to Outlook:

1. Go to [EmailJS Services](https://dashboard.emailjs.com/admin/integration)
2. Click **"Add New Service"**
3. Select **"Outlook"** or **"Office 365"**
4. Follow the authorization steps
5. Update your `.env` with the new Service ID

---

## 🆘 Still Not Working?

### Check These:

1. **Gmail Account Status**
   - Make sure your Gmail account is active
   - Check if 2-factor authentication is enabled (might need app password)
   - Make sure the account isn't locked or restricted

2. **EmailJS Service Status**
   - Go to [EmailJS Status](https://status.emailjs.com)
   - Check if there are any service issues

3. **Template Variables**
   - Make sure your template has all the required variables
   - Check that variable names match exactly (case-sensitive)

4. **Environment Variables**
   - Double-check your `.env` file has correct values
   - Make sure there are no extra spaces
   - Restart dev server after changing `.env`

5. **Try a Different Email Service**
   - Outlook/Office 365 (more reliable)
   - SendGrid (via EmailJS)
   - SMTP service

---

## 📝 Quick Checklist

- [ ] Gmail service reconnected in EmailJS
- [ ] Service shows as "Connected" or "Active"
- [ ] Service ID copied to `.env` file
- [ ] Template ID is correct in `.env`
- [ ] Public Key is correct in `.env`
- [ ] Dev server restarted after updating `.env`
- [ ] Test email sent successfully from EmailJS dashboard
- [ ] Test reservation submitted on website
- [ ] Email received in inbox

---

## 💡 Pro Tips

1. **Use Outlook instead of Gmail** - More reliable for automated emails
2. **Test in EmailJS dashboard first** - Easier to debug
3. **Check spam folder** - Emails might go to spam initially
4. **Use a dedicated email** - Don't use your personal Gmail for production


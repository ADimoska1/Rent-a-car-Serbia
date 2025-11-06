# Fix EmailJS Gmail Authentication Error (412)

## 🔴 Error: "Request had insufficient authentication scopes"

This means your Gmail service in EmailJS needs to be re-authenticated with proper permissions.

## ✅ Solution: Reconnect Gmail Service

### Step 1: Go to EmailJS Dashboard

1. Go to [https://dashboard.emailjs.com/admin/integration](https://dashboard.emailjs.com/admin/integration)
2. Find your **Gmail** service
3. Click on it to edit

### Step 2: Reconnect Gmail

1. Click **"Reconnect"** or **"Authorize"** button
2. You'll be redirected to Google's authorization page
3. **IMPORTANT**: Make sure to grant ALL requested permissions:
   - ✅ Send email on your behalf
   - ✅ Read email (if requested)
   - ✅ Manage email settings (if requested)
4. Click **"Allow"** to grant permissions
5. You'll be redirected back to EmailJS

### Step 3: Verify Service is Connected

1. Check that the service shows as **"Connected"** or **"Active"**
2. The status should be green/active
3. Note your **Service ID** (you might need to update it)

### Step 4: Test Email

1. Go to EmailJS dashboard → **Email Templates**
2. Click on your template
3. Click **"Test"** button
4. Fill in test data and send
5. Check if email is received

---

## 🔄 Alternative: Use a Different Email Service

If Gmail continues to have issues, you can switch to:

### Option 1: Outlook/Office 365
- More reliable for automated emails
- Better for production use

### Option 2: SendGrid (Recommended for Production)
- More professional
- Better deliverability
- Free tier: 100 emails/day

### Option 3: SMTP Service
- Use any SMTP server
- More control
- Requires SMTP credentials

---

## 📝 Update Your .env After Reconnecting

After reconnecting, make sure your `.env` has the correct Service ID:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx  # Update if changed
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🆘 Still Having Issues?

1. **Try disconnecting and reconnecting** the Gmail service completely
2. **Check Gmail account** - make sure it's not locked or restricted
3. **Use a different Gmail account** if the current one has restrictions
4. **Switch to Outlook** - often more reliable for EmailJS
5. **Check EmailJS status** - [status.emailjs.com](https://status.emailjs.com)

---

## 💡 Pro Tip

For production, consider using:
- **SendGrid** (via EmailJS or directly)
- **Mailgun**
- **AWS SES**

These are more reliable than Gmail for automated emails.


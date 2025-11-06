# Environment Variables Setup

## Frontend Environment Variables (.env file)

Create a `.env` file in your project root with the following variables:

```env
# EmailJS Configuration
# Get these from https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# SMS Backend API URL
# For Vercel deployment, use your Vercel URL:
VITE_BACKEND_API_URL=https://your-project-name.vercel.app/api/send-sms
# For local development with Vercel CLI:
# VITE_BACKEND_API_URL=http://localhost:3000/api/send-sms
```

## Vercel Environment Variables (for Serverless Function)

**IMPORTANT:** These must be set in Vercel Dashboard, NOT in .env file!

Go to Vercel Dashboard → Your Project → Settings → Environment Variables and add:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

**Important:** 
- Never commit the `.env` file to git (it's already in .gitignore)
- Restart your development server after creating/updating `.env`
- For production, set these variables in your hosting platform's environment settings
- **Twilio credentials go in Vercel, not in .env file** (for security)

See `VERCEL_SMS_SETUP.md` for detailed Vercel setup instructions.
See `EMAIL_SMS_SETUP.md` for EmailJS setup instructions.


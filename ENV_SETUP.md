# Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
# EmailJS Configuration
# Get these from https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# SMS Configuration (optional)
# Set to 'true' if you have SMS service configured
VITE_SMS_ENABLED=false
```

**Important:** 
- Never commit the `.env` file to git (it's already in .gitignore)
- Restart your development server after creating/updating `.env`
- For production, set these variables in your hosting platform's environment settings

See `EMAIL_SMS_SETUP.md` for detailed setup instructions.


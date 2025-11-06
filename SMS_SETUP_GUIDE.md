# SMS Setup Guide - How to Actually Send SMS

Currently, the SMS system is set up but **not actually sending SMS** - it's only logging to the console. To receive real SMS messages, you need to set up an SMS service.

## Why SMS isn't working yet

The code is ready, but SMS requires a **backend API** because:
1. SMS services (Twilio, etc.) require API keys that must be kept secret
2. You can't expose API keys in frontend code (security risk)
3. SMS services need server-side authentication

## Quick Setup Options

### Option 1: Twilio (Recommended - Most Popular)

**Step 1: Sign up for Twilio**
1. Go to [https://www.twilio.com](https://www.twilio.com)
2. Sign up for a free account (includes $15.50 free credit)
3. Verify your phone number

**Step 2: Get Twilio Credentials**
1. Go to Twilio Console Dashboard
2. Copy your:
   - **Account SID**
   - **Auth Token**
   - **Phone Number** (you'll get a free trial number)

**Step 3: Create Backend API**

You have two options:

#### A. Use a Serverless Function (Easiest - No Server Needed!)

**Option A1: Vercel Serverless Function**

Create `api/send-sms.js`:
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilio = require('twilio')(accountSid, authToken);

  const { phone, message } = req.body;

  try {
    const result = await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

**Option A2: Netlify Function**

Create `netlify/functions/send-sms.js`:
```javascript
const twilio = require('twilio');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { phone, message } = JSON.parse(event.body);
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, sid: result.sid })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
```

#### B. Create a Simple Node.js Backend

1. Create a new folder `backend/`
2. Install dependencies:
```bash
cd backend
npm init -y
npm install express twilio cors
```

3. Create `backend/server.js`:
```javascript
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/send-sms', async (req, res) => {
  try {
    const { phone, message } = req.body;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SMS API running on port ${PORT}`);
});
```

4. Create `backend/.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
PORT=3001
```

5. Run backend:
```bash
node server.js
```

**Step 4: Update Frontend**

Update your `.env` file:
```env
VITE_BACKEND_API_URL=http://localhost:3001/api/send-sms
```

Or if using serverless:
```env
VITE_BACKEND_API_URL=https://your-domain.com/api/send-sms
```

### Option 2: Use EmailJS SMS (If Available)

Some EmailJS paid plans include SMS. Check your EmailJS dashboard.

### Option 3: Use Other SMS Services

- **Vonage (Nexmo)**: Similar to Twilio
- **AWS SNS**: Amazon's SMS service
- **MessageBird**: European provider
- **ClickSend**: Affordable option

## Testing Without Backend (Development)

For now, you can check the browser console (F12) to see the SMS messages that would be sent. They're logged there for testing.

## Quick Test Setup (5 minutes)

**Fastest way to test SMS:**

1. **Sign up for Twilio** (2 minutes)
   - Get free $15.50 credit
   - Get trial phone number

2. **Use Twilio's Test API** (for testing only):
   - Update `src/services/notifications.js`
   - Use Twilio's test credentials (they work without backend for testing)

3. **Or use a free SMS testing service:**
   - TextBelt (free, limited)
   - SMS Gateway API (free tier)

## Current Status

✅ **Code is ready** - SMS function is implemented
✅ **Sends to both numbers** - Customer + Admin (+381628952938)
❌ **Not actually sending** - Needs backend API + SMS service

## Next Steps

1. Choose an SMS service (Twilio recommended)
2. Set up backend API (serverless or Node.js)
3. Add API URL to `.env` file
4. Test with a real phone number

## Need Help?

- Twilio Docs: https://www.twilio.com/docs/sms
- Twilio Quickstart: https://www.twilio.com/docs/sms/quickstart
- Free Twilio Trial: https://www.twilio.com/try-twilio

Once you set up the backend API, SMS will work immediately! 🚀


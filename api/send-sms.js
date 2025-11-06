// Vercel Serverless Function for sending SMS via Twilio
// This file should be in the /api folder at the root of your project

const twilio = require('twilio');

// CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

module.exports = async function handler(req, res) {
  // Set CORS headers immediately
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  // Handle preflight requests (OPTIONS) - must return early
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, message } = req.body;

    // Validate input
    if (!phone || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and message are required' 
      });
    }

    // Get Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    // Validate Twilio credentials
    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Twilio credentials not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'SMS service not configured. Please set Twilio environment variables in Vercel.' 
      });
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Send SMS
    const result = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phone
    });

    console.log(`SMS sent successfully to ${phone}:`, result.sid);

    return res.status(200).json({ 
      success: true, 
      message: 'SMS sent successfully',
      sid: result.sid 
    });

  } catch (error) {
    console.error('Error sending SMS:', error);
    
    // Return user-friendly error message
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to send SMS',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}


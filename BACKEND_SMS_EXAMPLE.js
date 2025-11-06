// Backend SMS API Example (Node.js/Express)
// This is an example of how to implement SMS sending on your backend
// You'll need to set up a backend server (Node.js, Python, etc.) to use this

// Example using Express.js and Twilio

const express = require('express');
const twilio = require('twilio');
const app = express();

app.use(express.json());

// Twilio configuration (get from Twilio dashboard)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

const client = twilio(accountSid, authToken);

// SMS endpoint
app.post('/api/send-sms', async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and message are required' 
      });
    }

    // Send SMS using Twilio
    const result = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phone
    });

    console.log(`SMS sent to ${phone}:`, result.sid);

    res.json({ 
      success: true, 
      message: 'SMS sent successfully',
      sid: result.sid 
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SMS API server running on port ${PORT}`);
});

// Alternative: Using other SMS services
// 
// 1. Vonage (Nexmo):
// const Vonage = require('@vonage/server-sdk');
// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET
// });
// 
// await vonage.sms.send({
//   to: phone,
//   from: 'YourBrand',
//   text: message
// });
//
// 2. AWS SNS:
// const AWS = require('aws-sdk');
// const sns = new AWS.SNS();
// 
// await sns.publish({
//   PhoneNumber: phone,
//   Message: message
// }).promise();


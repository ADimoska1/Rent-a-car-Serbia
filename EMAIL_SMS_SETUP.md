# Email and SMS Notification Setup Guide

This guide will help you set up email and SMS notifications for car reservations.

## 📧 Email Notifications (EmailJS)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### Step 2: Set Up Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

### Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
Car Rental Reservation Confirmation - {{car_name}}
```

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #D4AF37; color: #1a1a1a; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; }
    .details { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #D4AF37; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CITY CAR RENT PRIME</h1>
      <h2>Reservation Confirmation</h2>
    </div>
    
    <div class="content">
      <p>Dear {{customer_name}},</p>
      
      <p>Thank you for your car rental reservation! We have received your booking and will contact you soon to confirm the details.</p>
      
      <div class="details">
        <h3>Reservation Details:</h3>
        <p><strong>Car:</strong> {{car_name}}</p>
        <p><strong>Price per day:</strong> €{{car_price}}</p>
        <p><strong>Rental period:</strong> {{rental_days}} day(s)</p>
        <p><strong>Total price:</strong> €{{total_price}}</p>
      </div>
      
      <div class="details">
        <h3>Pick-up Information:</h3>
        <p><strong>Location:</strong> {{pick_up_location}}</p>
        <p><strong>Date:</strong> {{pick_up_date}}</p>
        <p><strong>Time:</strong> {{pick_up_time}}</p>
      </div>
      
      <div class="details">
        <h3>Drop-off Information:</h3>
        <p><strong>Location:</strong> {{drop_off_location}}</p>
        <p><strong>Date:</strong> {{drop_off_date}}</p>
        <p><strong>Time:</strong> {{drop_off_time}}</p>
      </div>
      
      <div class="details">
        <h3>Additional Options:</h3>
        <p>{{additional_options}}</p>
      </div>
      
      <div class="details">
        <h3>Contact Information:</h3>
        <p><strong>Name:</strong> {{customer_name}}</p>
        <p><strong>Email:</strong> {{customer_email}}</p>
        <p><strong>Phone:</strong> {{customer_phone}}</p>
        <p><strong>Flight Number:</strong> {{flight_number}}</p>
      </div>
      
      <p>We will contact you within 24 hours to confirm your reservation and provide further instructions.</p>
      
      <p>Best regards,<br>
      City Car Rent Prime Team</p>
    </div>
    
    <div class="footer">
      <p>This is an automated confirmation email. Please do not reply to this email.</p>
      <p>For inquiries, contact us at info@carrentalserbia.com or +381 12 345 6789</p>
    </div>
  </div>
</body>
</html>
```

4. Save the template and copy your **Template ID**

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Restart your development server

### Step 6: Test Email

1. Submit a test reservation
2. Check your email for the confirmation
3. Check EmailJS dashboard for delivery status

## 📱 SMS Notifications

### Option 1: EmailJS SMS (If Available)

Some EmailJS plans include SMS. Check your EmailJS dashboard for SMS service availability.

### Option 2: Twilio (Recommended for Production)

**Note:** Twilio requires a backend API for security (API keys should not be exposed in frontend).

#### Backend Setup (Node.js Example):

```javascript
// backend/routes/sms.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

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
```

#### Frontend Update:

Update `src/services/notifications.js` to call your backend:

```javascript
export const sendReservationSMS = async (bookingData) => {
  try {
    const smsMessage = `Hello ${bookingData.customerInfo.firstName}, your car rental reservation for ${bookingData.selectedCar?.name} from ${bookingData.pickUpDate} to ${bookingData.dropOffDate} has been received. Total: €${bookingData.totalPrice}. We'll contact you soon. - City Car Rent`

    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: bookingData.customerInfo.phone,
        message: smsMessage
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, message: 'Failed to send SMS', error };
  }
}
```

### Option 3: Other SMS Services

- **Vonage (Nexmo)**: Similar to Twilio
- **AWS SNS**: Amazon's SMS service
- **MessageBird**: European SMS provider
- **ClickSend**: Affordable SMS API

All require backend implementation for security.

## 🚀 Installation

1. Install EmailJS package:
```bash
npm install @emailjs/browser
```

2. Configure environment variables (see Step 5 above)

3. Test the notifications by submitting a reservation

## 📝 Email Template Variables

The following variables are available in your EmailJS template:

- `{{customer_name}}` - Full name
- `{{customer_email}}` - Email address
- `{{customer_phone}}` - Phone number
- `{{flight_number}}` - Flight number (if provided)
- `{{car_name}}` - Selected car name
- `{{car_price}}` - Price per day
- `{{pick_up_location}}` - Pick-up location
- `{{pick_up_date}}` - Pick-up date
- `{{pick_up_time}}` - Pick-up time
- `{{drop_off_location}}` - Drop-off location
- `{{drop_off_date}}` - Drop-off date
- `{{drop_off_time}}` - Drop-off time
- `{{rental_days}}` - Number of rental days
- `{{total_price}}` - Total price
- `{{additional_options}}` - Selected additional options

## 🔒 Security Notes

1. **Never expose API keys in frontend code**
2. **Use environment variables** for all sensitive data
3. **For SMS in production**, always use a backend API
4. **Validate phone numbers** before sending SMS
5. **Rate limit** your API endpoints to prevent abuse

## 🧪 Testing

1. Use test email addresses for development
2. Test with different phone number formats
3. Verify email delivery in EmailJS dashboard
4. Check spam folders if emails don't arrive
5. Test error handling (invalid email, network errors)

## 📊 Monitoring

- Check EmailJS dashboard for email delivery status
- Monitor SMS delivery via your SMS provider dashboard
- Set up error logging for failed notifications
- Track notification success rates

## 💡 Tips

- **Free tier limits**: EmailJS free tier allows 100 emails/month
- **SMS costs**: SMS typically costs $0.01-0.05 per message
- **International SMS**: Check pricing for international numbers
- **Template testing**: Test email templates in EmailJS dashboard first
- **Fallback**: Always have a fallback if notifications fail

## 🆘 Troubleshooting

**Emails not sending:**
- Check EmailJS service configuration
- Verify template variables match
- Check spam folder
- Verify environment variables are set

**SMS not sending:**
- Verify backend API is running
- Check SMS service credentials
- Verify phone number format
- Check SMS service balance/limits

For more help, check the EmailJS documentation: https://www.emailjs.com/docs/


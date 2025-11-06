// Email and SMS notification service
// Using EmailJS for email notifications

import emailjs from '@emailjs/browser'

// Initialize EmailJS (you'll get these from EmailJS dashboard)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'

// Initialize EmailJS with public key
if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'your_public_key') {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

// SMS service configuration (using Twilio via backend or EmailJS SMS)
const SMS_ENABLED = import.meta.env.VITE_SMS_ENABLED === 'true'
// Admin phone number to receive notifications
const ADMIN_PHONE = '+381628952938'

/**
 * Send email notification with reservation details
 */
export const sendReservationEmail = async (bookingData) => {
  try {
    // Prepare email template parameters
    const templateParams = {
      to_name: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
      to_email: bookingData.customerInfo.email,
      customer_name: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
      customer_email: bookingData.customerInfo.email,
      customer_phone: bookingData.customerInfo.phone,
      flight_number: bookingData.customerInfo.flightNumber || 'Not provided',
      car_name: bookingData.selectedCar?.name || 'N/A',
      car_price: bookingData.selectedCar?.pricePerDay || 0,
      pick_up_location: bookingData.pickUpLocation,
      pick_up_date: bookingData.pickUpDate,
      pick_up_time: bookingData.pickUpTime,
      drop_off_location: bookingData.dropOffLocation,
      drop_off_date: bookingData.dropOffDate,
      drop_off_time: bookingData.dropOffTime,
      rental_days: bookingData.days || 0,
      total_price: bookingData.totalPrice || 0,
      additional_options: formatAdditionalOptions(bookingData.additionalOptions),
      message: `Thank you for your reservation! We will contact you soon to confirm your booking.`
    }

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === 'your_service_id' ||
        !EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID === 'your_template_id' ||
        !EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'your_public_key') {
      console.warn('EmailJS not configured. Please set up environment variables.')
      return { success: false, message: 'Email service not configured' }
    }

    // Send email using EmailJS
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      console.log('✅ Email sent successfully:', response)
      return { success: true, message: 'Email sent successfully' }
    } catch (emailError) {
      console.error('❌ EmailJS Error:', emailError)
      // If template not found or other EmailJS error
      if (emailError.text) {
        console.error('EmailJS Error Details:', emailError.text)
        return { success: false, message: 'Email template not found. Please check EmailJS template ID.' }
      }
      return { success: false, message: 'Failed to send email: ' + emailError.message }
    }
  } catch (error) {
    console.error('❌ Error in sendReservationEmail:', error)
    return { success: false, message: 'Failed to send email', error: error.message }
  }
}

/**
 * Send SMS notification to customer and admin
 * Sends SMS to both the customer's phone and the admin phone number
 */
export const sendReservationSMS = async (bookingData) => {
  try {
    // Customer SMS message
    const customerMessage = `Hello ${bookingData.customerInfo.firstName}, your car rental reservation for ${bookingData.selectedCar?.name} from ${bookingData.pickUpDate} to ${bookingData.dropOffDate} has been received. Total: €${bookingData.totalPrice}. We'll contact you soon. - City Car Rent`

    // Admin SMS message with full reservation details
    const adminMessage = `NEW RESERVATION:\nCustomer: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}\nPhone: ${bookingData.customerInfo.phone}\nEmail: ${bookingData.customerInfo.email}\nCar: ${bookingData.selectedCar?.name}\nPeriod: ${bookingData.pickUpDate} to ${bookingData.dropOffDate}\nPick-up: ${bookingData.pickUpLocation} at ${bookingData.pickUpTime}\nDrop-off: ${bookingData.dropOffLocation} at ${bookingData.dropOffTime}\nTotal: €${bookingData.totalPrice} for ${bookingData.days} day(s)`

    const results = {
      customer: { success: false, message: '' },
      admin: { success: false, message: '' }
    }

    // Send SMS to customer
    try {
      results.customer = await sendSingleSMS(bookingData.customerInfo.phone, customerMessage)
    } catch (error) {
      console.error('Error sending SMS to customer:', error)
      results.customer = { success: false, message: error.message }
    }

    // Send SMS to admin (background - always send)
    try {
      results.admin = await sendSingleSMS(ADMIN_PHONE, adminMessage)
    } catch (error) {
      console.error('Error sending SMS to admin:', error)
      results.admin = { success: false, message: error.message }
    }

    // Return success if at least one SMS was sent
    const overallSuccess = results.customer.success || results.admin.success
    return {
      success: overallSuccess,
      message: overallSuccess ? 'SMS notifications sent' : 'Failed to send SMS',
      details: results
    }
  } catch (error) {
    console.error('Error sending SMS:', error)
    return { success: false, message: 'Failed to send SMS', error }
  }
}

/**
 * Send a single SMS message
 * This function handles the actual SMS sending logic
 */
const sendSingleSMS = async (phoneNumber, message) => {
  try {
    // Option 1: Use backend API (recommended for production)
    const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || '/api/send-sms'
    
    console.log('🔍 SMS Debug - Backend API URL:', BACKEND_API_URL)
    console.log('🔍 SMS Debug - Phone:', phoneNumber)
    console.log('🔍 SMS Debug - Message length:', message.length)
    
    // Always try to call the backend API if URL is set
    if (BACKEND_API_URL && BACKEND_API_URL !== '/api/send-sms') {
      console.log('📤 Attempting to send SMS via backend API...')
      
      // Call your backend API
      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          message: message
        })
      })

      console.log('📥 SMS API Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ SMS API Error:', errorText)
        throw new Error(`SMS API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ SMS sent successfully:', result)
      return { success: true, message: 'SMS sent successfully', data: result }
    }

    // Option 2: Use EmailJS SMS (if available)
    if (SMS_ENABLED) {
      // This would require EmailJS SMS service setup
      // const smsParams = {
      //   to_number: phoneNumber,
      //   message: message
      // }
      // const response = await emailjs.send(
      //   EMAILJS_SMS_SERVICE_ID,
      //   EMAILJS_SMS_TEMPLATE_ID,
      //   smsParams
      // )
      // return { success: true, message: 'SMS sent via EmailJS' }
    }

    // For development/testing - log the SMS that would be sent
    console.log(`📱 SMS to ${phoneNumber}:`, message)
    console.log('⚠️ SMS not actually sent - Backend API URL not configured or using default path')
    console.log('💡 Tip: Set VITE_BACKEND_API_URL in your .env file or Vercel environment variables')
    return { success: false, message: 'SMS service not configured - backend API URL required' }
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error)
    return { success: false, message: error.message, error }
  }
}

/**
 * Format additional options for email
 */
const formatAdditionalOptions = (options) => {
  if (!options || Object.keys(options).length === 0) {
    return 'None'
  }

  const optionNames = {
    babySeat: 'Baby Seat',
    childSeat: 'Child Seat (2+)',
    kidBooster: 'Kid Booster',
    petTransport: 'Pet Transport',
    gps: 'GPS',
    snowChains: 'Snow Chains',
    fullInsurance: 'Full Insurance',
    additionalDriver: 'Additional Driver',
    borderCrossing: 'Border Crossing'
  }

  const selected = Object.keys(options)
    .filter(key => options[key])
    .map(key => optionNames[key] || key)
    .join(', ')

  return selected || 'None'
}

/**
 * Send both email and SMS notifications
 */
export const sendReservationNotifications = async (bookingData) => {
  const results = {
    email: { success: false, message: '' },
    sms: { success: false, message: '' }
  }

  // Send email
  try {
    results.email = await sendReservationEmail(bookingData)
  } catch (error) {
    results.email = { success: false, message: error.message }
  }

  // Send SMS - TEMPORARILY DISABLED (uncomment when ready to test SMS)
  // try {
  //   results.sms = await sendReservationSMS(bookingData)
  // } catch (error) {
  //   results.sms = { success: false, message: error.message }
  // }
  results.sms = { success: false, message: 'SMS temporarily disabled' }

  return results
}


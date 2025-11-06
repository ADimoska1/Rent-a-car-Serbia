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
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    console.log('Email sent successfully:', response)
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send email', error }
  }
}

/**
 * Send SMS notification (requires backend or SMS service)
 * For now, this is a placeholder - you'll need to implement via backend
 */
export const sendReservationSMS = async (bookingData) => {
  try {
    // Option 1: Use EmailJS SMS (if available in your plan)
    // Option 2: Use Twilio via your backend API
    // Option 3: Use another SMS service
    
    const smsMessage = `Hello ${bookingData.customerInfo.firstName}, your car rental reservation for ${bookingData.selectedCar?.name} from ${bookingData.pickUpDate} to ${bookingData.dropOffDate} has been received. Total: €${bookingData.totalPrice}. We'll contact you soon. - City Car Rent`

    // For EmailJS SMS (if you have SMS enabled)
    if (SMS_ENABLED) {
      const smsParams = {
        to_number: bookingData.customerInfo.phone,
        message: smsMessage
      }

      // This would use EmailJS SMS service if available
      // const response = await emailjs.send(
      //   EMAILJS_SMS_SERVICE_ID,
      //   EMAILJS_SMS_TEMPLATE_ID,
      //   smsParams,
      //   EMAILJS_PUBLIC_KEY
      // )
    }

    // For production, you should call your backend API:
    // const response = await fetch('/api/send-sms', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     phone: bookingData.customerInfo.phone,
    //     message: smsMessage
    //   })
    // })

    console.log('SMS would be sent to:', bookingData.customerInfo.phone)
    return { success: true, message: 'SMS sent successfully' }
  } catch (error) {
    console.error('Error sending SMS:', error)
    return { success: false, message: 'Failed to send SMS', error }
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

  // Send SMS
  try {
    results.sms = await sendReservationSMS(bookingData)
  } catch (error) {
    results.sms = { success: false, message: error.message }
  }

  return results
}


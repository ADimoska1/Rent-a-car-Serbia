import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookingForm from './components/BookingForm'
import AdditionalServices from './components/AdditionalServices'
import ContactInfo from './components/ContactInfo'
import Footer from './components/Footer'

function App() {
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleBookingComplete = (bookingData) => {
    setBookingComplete(true)
    console.log('Booking completed:', bookingData)
    // Here you would typically send this data to a backend
    // For now, we'll just show an alert (already in BookingForm)
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <div id="about" className="py-12 bg-dark-bg">
          <BookingForm onBookingComplete={handleBookingComplete} />
        </div>
        <AdditionalServices />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  )
}

export default App


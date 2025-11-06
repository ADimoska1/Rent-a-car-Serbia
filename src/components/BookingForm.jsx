import { useState, useEffect } from 'react'
import { cars, locations, additionalOptions, getCarImage } from '../cars'
import { sendReservationNotifications } from '../services/notifications'

function BookingForm({ onBookingComplete }) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickUpLocation: 'Galerija',
    pickUpDate: '',
    pickUpTime: '12:00',
    dropOffLocation: 'Galerija',
    dropOffDate: '',
    dropOffTime: '12:00',
    selectedCar: null,
    additionalOptions: {},
    customerInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      flightNumber: ''
    }
  })

  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time24 = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        const ampm = hour < 12 ? 'AM' : 'PM'
        const time12 = `${hour12}:${String(minute).padStart(2, '0')} ${ampm}`
        times.push({ value: time24, label: time12 })
      }
    }
    return times
  }

  const calculateDays = () => {
    if (!bookingData.pickUpDate || !bookingData.dropOffDate) return 0
    const pickUp = new Date(bookingData.pickUpDate)
    const dropOff = new Date(bookingData.dropOffDate)
    const diffTime = Math.abs(dropOff - pickUp)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }

  const calculateTotalPrice = () => {
    if (!bookingData.selectedCar) return 0
    const days = calculateDays()
    let total = bookingData.selectedCar.pricePerDay * days

    Object.keys(bookingData.additionalOptions).forEach(optionId => {
      if (bookingData.additionalOptions[optionId]) {
        const option = additionalOptions.find(opt => opt.id === optionId)
        if (option) {
          if (option.unit === 'day') {
            total += option.price * days
          } else {
            total += option.price
          }
        }
      }
    })

    const pickUpHour = parseInt(bookingData.pickUpTime.split(':')[0])
    const dropOffHour = parseInt(bookingData.dropOffTime.split(':')[0])
    if (pickUpHour >= 23 || pickUpHour < 6) total += 10
    if (dropOffHour >= 23 || dropOffHour < 6) total += 10

    return total
  }

  const handleNext = () => {
    if (step === 1 && bookingData.selectedCar) {
      setStep(2)
    } else if (step === 2 && bookingData.pickUpDate && bookingData.dropOffDate) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const completeBookingData = {
      ...bookingData,
      totalPrice: calculateTotalPrice(),
      days: calculateDays()
    }

    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]')
    const originalText = submitButton?.textContent
    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = 'Sending...'
    }

    try {
      // Send email and SMS notifications
      const results = await sendReservationNotifications(completeBookingData)
      
      // Check results
      const emailSuccess = results.email.success
      const smsSuccess = results.sms.success

      if (onBookingComplete) {
        onBookingComplete(completeBookingData)
      }

      // Show success message
      let message = 'Reservation sent successfully!'
      if (emailSuccess) {
        message += '\n✓ Confirmation email sent to your email address.'
      }
      if (smsSuccess) {
        message += '\n✓ Confirmation SMS sent to your phone.'
      }
      if (!emailSuccess && !smsSuccess) {
        message = 'Reservation received! However, notifications could not be sent. We will contact you manually.'
      }

      alert(message)
    } catch (error) {
      console.error('Error submitting reservation:', error)
      alert('Reservation received! We will contact you soon. (Note: Notification service error)')
    } finally {
      // Reset button
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = originalText || 'Send Reservation'
      }
    }
  }

  const toggleOption = (optionId) => {
    setBookingData(prev => ({
      ...prev,
      additionalOptions: {
        ...prev.additionalOptions,
        [optionId]: !prev.additionalOptions[optionId]
      }
    }))
  }

  // Animation on step change
  useEffect(() => {
    const element = document.getElementById('booking-content')
    if (element) {
      element.classList.add('animate-fade-in')
    }
  }, [step])

  const getOptionIcon = (optionId) => {
    const icons = {
      babySeat: '👶',
      childSeat: '🧒',
      kidBooster: '🚗',
      petTransport: '🐾',
      gps: '📡',
      snowChains: '❄️',
      fullInsurance: '🛡️',
      additionalDriver: '👥',
      borderCrossing: '🚩'
    }
    return icons[optionId] || '✓'
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div id="booking-content" className="bg-dark-bg">
        {/* Step 1: Choose a car */}
        {step === 1 && (
          <div className="space-y-8 animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-golden uppercase mb-6">
              Choose a car
            </h3>
            <CarSelection
              selectedCar={bookingData.selectedCar}
              onSelectCar={(car) => setBookingData(prev => ({ ...prev, selectedCar: car }))}
            />
            {bookingData.selectedCar && (
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-3 bg-dark-golden text-dark-bg rounded-lg font-semibold hover:bg-dark-golden-hover transition transform hover:scale-105"
              >
                Next: Choose locations and dates →
              </button>
            )}
          </div>
        )}

        {/* Step 2: Choose locations and dates */}
        {step === 2 && (
          <div className="space-y-8 animate-slide-up">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-golden uppercase mb-6">
                Choose locations and dates
              </h3>
              <button
                onClick={() => setStep(1)}
                className="text-white hover:text-dark-golden transition"
              >
                ← Back
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white mb-4">Pick-up</label>
                <select
                  value={bookingData.pickUpLocation}
                  onChange={(e) => setBookingData(prev => ({ ...prev, pickUpLocation: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc} className="bg-dark-card">{loc}</option>
                  ))}
                </select>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingData.pickUpDate}
                    onChange={(e) => setBookingData(prev => ({ ...prev, pickUpDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Time</label>
                  <select
                    value={bookingData.pickUpTime}
                    onChange={(e) => setBookingData(prev => ({ ...prev, pickUpTime: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                  >
                    {generateTimeOptions().map(time => (
                      <option key={time.value} value={time.value} className="bg-dark-card">{time.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white mb-4">Drop-off</label>
                <select
                  value={bookingData.dropOffLocation}
                  onChange={(e) => setBookingData(prev => ({ ...prev, dropOffLocation: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc} className="bg-dark-card">{loc}</option>
                  ))}
                </select>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingData.dropOffDate}
                    onChange={(e) => setBookingData(prev => ({ ...prev, dropOffDate: e.target.value }))}
                    min={bookingData.pickUpDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Time</label>
                  <select
                    value={bookingData.dropOffTime}
                    onChange={(e) => setBookingData(prev => ({ ...prev, dropOffTime: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                  >
                    {generateTimeOptions().map(time => (
                      <option key={time.value} value={time.value} className="bg-dark-card">{time.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!bookingData.pickUpDate || !bookingData.dropOffDate}
              className="w-full md:w-auto px-8 py-3 bg-dark-golden text-dark-bg rounded-lg font-semibold hover:bg-dark-golden-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition transform hover:scale-105"
            >
              Next: Additional options →
            </button>
          </div>
        )}

        {/* Step 3: Additional options */}
        {step === 3 && (
          <div className="space-y-8 animate-slide-up">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-golden uppercase">
                Choose additional options
              </h3>
              <button
                onClick={() => setStep(2)}
                className="text-white hover:text-dark-golden transition"
              >
                ← Back
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {additionalOptions.map(option => (
                <label
                  key={option.id}
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer transition transform hover:scale-105 ${
                    bookingData.additionalOptions[option.id]
                      ? 'border-dark-golden bg-dark-golden/10'
                      : 'border-dark-border bg-dark-card hover:border-dark-golden/50'
                  }`}
                >
                  <div className="text-4xl mb-3">{getOptionIcon(option.id)}</div>
                  <input
                    type="checkbox"
                    checked={bookingData.additionalOptions[option.id] || false}
                    onChange={() => toggleOption(option.id)}
                    className="sr-only"
                  />
                  <span className="font-medium text-white text-center mb-2">{option.name}</span>
                  <span className="text-gray-400 text-sm">
                    {option.price > 0 ? `€${option.price}${option.unit === 'day' ? '/day' : ''}` : '0 €/day'}
                  </span>
                </label>
              ))}
            </div>
            <div className="bg-dark-card border border-dark-border p-6 rounded-lg">
              <p className="text-white text-lg">
                <strong>Total price for {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}:</strong>{' '}
                <span className="text-3xl font-bold text-dark-golden ml-2">€{calculateTotalPrice()}</span>
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full md:w-auto px-8 py-3 bg-dark-golden text-dark-bg rounded-lg font-semibold hover:bg-dark-golden-hover transition transform hover:scale-105"
            >
              Next: Enter your data →
            </button>
          </div>
        )}

        {/* Step 4: Enter your data */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-golden uppercase">
                Enter your data
              </h3>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-white hover:text-dark-golden transition"
              >
                ← Back
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.customerInfo.firstName}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, firstName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.customerInfo.lastName}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, lastName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={bookingData.customerInfo.phone}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={bookingData.customerInfo.email}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, email: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Flight number (optional)
                </label>
                <input
                  type="text"
                  value={bookingData.customerInfo.flightNumber}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, flightNumber: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-dark-golden focus:border-dark-golden transition"
                />
              </div>
            </div>
            <div className="bg-dark-card border border-dark-border p-6 rounded-lg">
              <p className="text-white mb-4">
                <strong>Total price for {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}:</strong>{' '}
                <span className="text-2xl font-bold text-dark-golden">€{calculateTotalPrice()}</span>
              </p>
              <p className="text-xs text-gray-400">
                For short term rent (1-2 days), prices may vary based on vehicle availability. Prices may vary seasonally, for international travel, or daily mileage exceeding 200km. Specific car models are not guaranteed and may be substituted with a similar vehicle. For vehicle pickup and return between 11:00 PM and 6:00 AM, a 10€ fee applies. If deep cleaning is required upon the vehicle's return, a 80€ fee applies.
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-dark-card border-2 border-dark-border text-white rounded-lg font-semibold hover:border-dark-golden hover:text-dark-golden transition transform hover:scale-105 uppercase"
            >
              Send Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function CarSelection({ selectedCar, onSelectCar }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [hoveredCarImage, setHoveredCarImage] = useState(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const categories = ['ALL', 'ECONOMY', 'STANDARD', 'PREMIUM', 'VAN']
  
  const filteredCars = selectedCategory === 'ALL' 
    ? cars 
    : cars.filter(car => car.category?.toUpperCase() === selectedCategory)

  const getSeats = (car) => car.features.find(f => f.includes('Seat')) || '5 Seats'
  const getTransmission = (car) => car.features.find(f => f.includes('Manual') || f.includes('Automatic')) || 'Manual'
  const getFuel = (car) => car.features.find(f => f.includes('km')) || '10km/l'
  
  // Handle 360 view on image hover
  const handleImageHover = (carId, isHovering) => {
    if (isHovering) {
      setHoveredCarImage(carId)
      setRotationAngle(0)
    } else {
      setHoveredCarImage(null)
      setRotationAngle(0)
    }
  }

  const handleImageMove = (e, car) => {
    if (hoveredCarImage === car.id && car.images360 && car.images360.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      const totalImages = car.images360.length
      const imageIndex = Math.floor(percentage * totalImages)
      setRotationAngle(Math.min(imageIndex, totalImages - 1))
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 border-b border-dark-border pb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 font-semibold uppercase text-sm transition ${
              selectedCategory === category
                ? 'text-dark-golden border-b-2 border-dark-golden'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Car List - Horizontal Cards */}
      <div className="space-y-4">
        {filteredCars.map(car => {
          const isSelected = selectedCar?.id === car.id
          const isImageHovered = hoveredCarImage === car.id
          
          // Get current 360 image or default image
          const getCurrentImage = () => {
            if (isImageHovered && car.images360 && car.images360.length > 0) {
              const index = Math.min(Math.floor(rotationAngle), car.images360.length - 1)
              return car.images360[index]
            }
            return getCarImage(car)
          }
          
          return (
          <div
            key={car.id}
            onClick={() => onSelectCar(car)}
            className={`relative bg-dark-card border rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${
              isSelected
                ? 'border-white ring-2 ring-white/20'
                : 'border-dark-border hover:border-dark-golden/50'
            }`}
          >
            <div className="grid md:grid-cols-12 gap-6 p-6">
              {/* Left Section - Car Details */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <div>
                  {/* Brand and Model */}
                  <div className="mb-3">
                    <div className="text-gray-400 text-sm uppercase mb-1">{car.brand || car.name.split(' ')[0]}</div>
                    <div className="text-white font-bold text-2xl uppercase">{car.name}</div>
                    {car.engine && (
                      <div className="text-gray-300 text-sm">{car.engine}</div>
                    )}
                  </div>
                  
                  {/* Specifications */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-lg">👤</span>
                      <span className="uppercase text-sm">{getSeats(car)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-lg">⚙️</span>
                      <span className="uppercase text-sm">{getTransmission(car)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-lg">⛽</span>
                      <span className="uppercase text-sm">{getFuel(car)}</span>
                    </div>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="inline-block bg-gray-700 text-white px-4 py-2 rounded-full text-xs font-medium uppercase">
                      {car.category || 'ECONOMY'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Section - Car Image with 360 View */}
              <div className="md:col-span-5 flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden relative">
                <div
                  className="w-full h-64 flex items-center justify-center relative"
                  onMouseEnter={() => handleImageHover(car.id, true)}
                  onMouseLeave={() => handleImageHover(car.id, false)}
                  onMouseMove={(e) => handleImageMove(e, car)}
                >
                  <img
                    src={getCurrentImage()}
                    alt={car.name}
                    className="w-full h-full object-contain transition-opacity duration-200"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400/2a2a2a/D4AF37?text=${encodeURIComponent(car.name)}`
                    }}
                  />
                  {/* 360 View Indicator */}
                  {car.images360 && car.images360.length > 0 && (
                    <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs transition-opacity duration-200 ${
                      isImageHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {isImageHovered ? 'Move mouse to rotate' : 'Hover for 360° view'}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Price and Selection */}
              <div className="md:col-span-3 flex flex-col items-center justify-center">
                <div className="text-center w-full">
                  {/* Selection Indicator */}
                  <div className="flex justify-end mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-white bg-white' 
                        : 'border-gray-500'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-dark-bg"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-1">from</div>
                    <div className="text-3xl font-bold text-dark-golden">
                      {car.pricePerDay}€<span className="text-lg text-gray-400">/day</span>
                    </div>
                  </div>
                  
                  {/* More Info Link */}
                  <button className="text-white hover:text-dark-golden transition text-sm font-semibold">
                    MORE ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingForm

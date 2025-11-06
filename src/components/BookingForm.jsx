import { useState } from 'react'
import { cars, locations, additionalOptions, getCarImage } from '../cars'

function BookingForm({ onBookingComplete }) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickUpLocation: 'Galerija',
    pickUpDate: '',
    pickUpTime: '12:00 PM',
    dropOffLocation: 'Galerija',
    dropOffDate: '',
    dropOffTime: '12:00 PM',
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

    // Add additional options
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

    // Late night fee (11 PM - 6 AM)
    const pickUpHour = parseInt(bookingData.pickUpTime.split(':')[0])
    const dropOffHour = parseInt(bookingData.dropOffTime.split(':')[0])
    if (pickUpHour >= 23 || pickUpHour < 6) total += 10
    if (dropOffHour >= 23 || dropOffHour < 6) total += 10

    return total
  }

  const handleNext = () => {
    if (step === 1 && bookingData.pickUpDate && bookingData.dropOffDate) {
      setStep(2)
    } else if (step === 2 && bookingData.selectedCar) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onBookingComplete) {
      onBookingComplete({
        ...bookingData,
        totalPrice: calculateTotalPrice(),
        days: calculateDays()
      })
    }
    alert('Reservation sent! We will contact you soon.')
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Rent a car in Belgrade</h2>

        {/* Step 1: Choose locations and dates */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Choose locations and dates</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up</label>
                <div className="space-y-4">
                  <select
                    value={bookingData.pickUpLocation}
                    onChange={(e) => setBookingData(prev => ({ ...prev, pickUpLocation: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      value={bookingData.pickUpDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, pickUpDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Time</label>
                    <select
                      value={bookingData.pickUpTime}
                      onChange={(e) => setBookingData(prev => ({ ...prev, pickUpTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {generateTimeOptions().map(time => (
                        <option key={time.value} value={time.value}>{time.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off</label>
                <div className="space-y-4">
                  <select
                    value={bookingData.dropOffLocation}
                    onChange={(e) => setBookingData(prev => ({ ...prev, dropOffLocation: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      value={bookingData.dropOffDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, dropOffDate: e.target.value }))}
                      min={bookingData.pickUpDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Time</label>
                    <select
                      value={bookingData.dropOffTime}
                      onChange={(e) => setBookingData(prev => ({ ...prev, dropOffTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {generateTimeOptions().map(time => (
                        <option key={time.value} value={time.value}>{time.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!bookingData.pickUpDate || !bookingData.dropOffDate}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Next: Choose a car
            </button>
          </div>
        )}

        {/* Step 2: Choose a car */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">Choose a car</h3>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-700"
              >
                ← Back
              </button>
            </div>
            <CarSelection
              selectedCar={bookingData.selectedCar}
              onSelectCar={(car) => setBookingData(prev => ({ ...prev, selectedCar: car }))}
            />
            {bookingData.selectedCar && (
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next: Additional options
              </button>
            )}
          </div>
        )}

        {/* Step 3: Additional options */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">Choose additional options</h3>
              <button
                onClick={() => setStep(2)}
                className="text-blue-600 hover:text-blue-700"
              >
                ← Back
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalOptions.map(option => (
                <label
                  key={option.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={bookingData.additionalOptions[option.id] || false}
                      onChange={() => toggleOption(option.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium text-gray-700">{option.name}</span>
                  </div>
                  <span className="text-gray-600">
                    {option.price > 0 ? `€${option.price}/${option.unit === 'day' ? 'day' : ''}` : '0 €/day'}
                  </span>
                </label>
              ))}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Total price for {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}:</strong>{' '}
                <span className="text-2xl font-bold text-blue-600">€{calculateTotalPrice()}</span>
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Next: Enter your data
            </button>
          </div>
        )}

        {/* Step 4: Enter your data */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">Enter your data</h3>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-blue-600 hover:text-blue-700"
              >
                ← Back
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.customerInfo.firstName}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, firstName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.customerInfo.lastName}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, lastName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={bookingData.customerInfo.phone}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={bookingData.customerInfo.email}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, email: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flight number (optional)
                </label>
                <input
                  type="text"
                  value={bookingData.customerInfo.flightNumber}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, flightNumber: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p className="mb-2">
                <strong>Total price for {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}:</strong>{' '}
                <span className="text-xl font-bold text-blue-600">€{calculateTotalPrice()}</span>
              </p>
              <p className="text-xs">
                For short term rent (1-2 days), prices may vary based on vehicle availability. Prices may vary seasonally, for international travel, or daily mileage exceeding 200km. Specific car models are not guaranteed and may be substituted with a similar vehicle. For vehicle pickup and return between 11:00 PM and 6:00 AM, a 10€ fee applies. If deep cleaning is required upon the vehicle's return, a 80€ fee applies.
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
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
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cars.map(car => (
        <div
          key={car.id}
          onClick={() => onSelectCar(car)}
          className={`cursor-pointer border-2 rounded-lg overflow-hidden transition ${
            selectedCar?.id === car.id
              ? 'border-blue-600 ring-2 ring-blue-200'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <img
            src={getCarImage(car)}
            alt={car.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = `https://placehold.co/600x400/E5E7EB/333?text=${encodeURIComponent(car.name)}`
            }}
          />
          <div className="p-4">
            <h4 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h4>
            <div className="mb-3">
              <span className="text-2xl font-bold text-blue-600">€{car.pricePerDay}</span>
              <span className="text-gray-600">/day</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingForm


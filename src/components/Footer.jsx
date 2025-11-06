import { useState } from 'react'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-dark-bg border-t border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Newsletter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">✉️</span>
              <h3 className="text-lg font-semibold text-white uppercase">Newsletter</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe and get <strong className="text-dark-golden">10% off</strong> of your first rental.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="flex-1 px-4 py-2 bg-dark-card border border-dark-border text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-dark-golden focus:border-dark-golden placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-dark-golden text-dark-bg font-semibold rounded-r-lg hover:bg-dark-golden-hover transition"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm mt-2 animate-fade-in">Thank you for subscribing!</p>
            )}
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-white font-bold text-2xl mb-1">CITY CAR RENT</div>
              <div className="text-dark-golden font-semibold">PRIME</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-dark-golden transition"
                >
                  Rent a Car
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-dark-golden transition"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-dark-golden transition"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-dark-golden transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Language/Flags */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-4">
              <button className="text-white hover:text-dark-golden transition">
                <span className="text-2xl">🇷🇸</span>
              </button>
              <button className="text-white hover:text-dark-golden transition">
                <span className="text-2xl">🇷🇺</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Car Rental Serbia. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Website by Fluena
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

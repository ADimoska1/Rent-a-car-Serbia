function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Car Rental Serbia</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for car rentals in Serbia.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition"
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
                  className="hover:text-white transition"
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
                  className="hover:text-white transition"
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
                  className="hover:text-white transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-1">Phone: +381 12 345 6789</p>
            <p className="text-gray-400 text-sm mb-1">Email: info@carrentalserbia.com</p>
            <p className="text-gray-400 text-sm">Belgrade, Serbia</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe and get <strong>10% off</strong> of your first rental.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Car Rental Serbia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

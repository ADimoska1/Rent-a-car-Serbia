function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              Car Rental Serbia
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              RENT A CAR
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              CONTACT
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-gray-600 hover:text-blue-600">SRPSKI</button>
            <span className="text-gray-300">|</span>
            <button className="text-sm text-gray-600 hover:text-blue-600">RUSSIAN</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

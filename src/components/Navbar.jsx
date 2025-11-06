import { useState, useEffect } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    const element = document.getElementById('home')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-bg shadow-lg' : 'bg-dark-bg/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 group"
              >
                <div className="text-white font-bold text-xl md:text-2xl">
                  CITY CAR RENT
                </div>
                <div className="text-dark-golden font-semibold text-sm md:text-base">
                  PRIME
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={scrollToTop}
                className="text-white hover:text-dark-golden transition-colors font-medium uppercase text-sm"
              >
                RENT A CAR
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-dark-golden transition-colors font-medium uppercase text-sm"
              >
                SERVICES
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-dark-golden transition-colors font-medium uppercase text-sm"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-dark-golden transition-colors font-medium uppercase text-sm"
              >
                CONTACT
              </button>
            </div>

            {/* Language Switcher */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="text-white hover:text-dark-golden transition-colors text-sm">
                SRPSKI
              </button>
              <span className="text-gray-500">|</span>
              <button className="text-white hover:text-dark-golden transition-colors text-sm">
                RUSSIAN
              </button>
            </div>

            {/* Mobile Hamburger Menu - Visible on screens smaller than lg (1024px) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-dark-golden transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu - Full Screen Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between items-start mb-16">
            {/* Logo - Top Left */}
            <div className="flex flex-col">
              <div className="text-dark-golden font-bold text-2xl leading-tight">CITY CAR RENT</div>
              <div className="text-dark-golden font-semibold text-xl mt-1">PRIME</div>
            </div>
            {/* Close Button - Top Right */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-dark-golden hover:opacity-80 transition-opacity text-3xl font-light leading-none"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Menu Items - Centered Vertically */}
          <div className="flex flex-col justify-center space-y-6 flex-grow -mt-16">
            <button
              onClick={scrollToTop}
              className="text-dark-golden hover:opacity-80 transition-opacity font-medium uppercase text-left text-xl"
            >
              RENT A CAR
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-dark-golden hover:opacity-80 transition-opacity font-medium uppercase text-left text-xl"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-dark-golden hover:opacity-80 transition-opacity font-medium uppercase text-left text-xl"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-dark-golden hover:opacity-80 transition-opacity font-medium uppercase text-left text-xl"
            >
              CONTACT
            </button>

            {/* Flags - Below Menu Items */}
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl hover:opacity-80 transition-opacity"
                aria-label="Serbian language"
              >
                🇷🇸
              </button>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl hover:opacity-80 transition-opacity"
                aria-label="Russian language"
              >
                🇷🇺
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar

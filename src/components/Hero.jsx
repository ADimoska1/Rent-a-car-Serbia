function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rent a Car in Serbia
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Affordable, reliable car rental for your journey
          </p>
          <a
            href="#cars"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Our Cars
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero


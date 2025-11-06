function Hero() {
  return (
    <div id="home" className="relative min-h-[600px] md:min-h-[700px] bg-dark-bg overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 to-dark-bg z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            RENT A CAR IN BELGRADE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 uppercase tracking-wide">
            CHOOSE LOCATIONS AND DATES
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-dark-golden to-transparent"></div>
    </div>
  )
}

export default Hero

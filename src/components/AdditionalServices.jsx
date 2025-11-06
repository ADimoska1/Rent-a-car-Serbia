function AdditionalServices() {
  return (
    <section id="services" className="py-16 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase animate-fade-in">
          More from us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-dark-card border border-dark-border rounded-lg hover:border-dark-golden transition transform hover:scale-105 animate-slide-up">
            <div className="text-6xl mb-4">🚐</div>
            <h3 className="text-xl font-semibold mb-3 text-dark-golden uppercase">Additional Services</h3>
            <p className="text-gray-400">
              Besides car rental, we offer a range of additional services, such as limo service, wedding ceremonies, airport and minibus transfers.
            </p>
          </div>
          <div className="text-center p-8 bg-dark-card border border-dark-border rounded-lg hover:border-dark-golden transition transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-3 text-dark-golden uppercase">About us</h3>
            <p className="text-gray-400">
              City Car Rent is your go-to destination for reliable, comfortable, and affordable transportation across the country.
            </p>
          </div>
          <div className="text-center p-8 bg-dark-card border border-dark-border rounded-lg hover:border-dark-golden transition transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-6xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-3 text-dark-golden uppercase">Contact</h3>
            <p className="text-gray-400">
              Feel free to get in touch any time. We are happy to answer all your questions and provide any information you may find helpful.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdditionalServices

function ContactInfo() {
  return (
    <section id="contact" className="py-16 bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase animate-fade-in">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-dark-card border border-dark-border rounded-lg hover:border-dark-golden transition transform hover:scale-105 animate-slide-up">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2 text-dark-golden">Phone</h3>
            <a href="tel:+381123456789" className="text-white hover:text-dark-golden transition-colors">
              +381 12 345 6789
            </a>
          </div>
          <div className="p-8 bg-dark-card border border-dark-border rounded-lg hover:border-dark-golden transition transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-xl font-semibold mb-2 text-dark-golden">Email</h3>
            <a
              href="mailto:info@carrentalserbia.com"
              className="text-white hover:text-dark-golden transition-colors"
            >
              info@carrentalserbia.com
            </a>
          </div>
          <div className="p-8 bg-dark-card border border-dark-border rounded-lg hover:border-dark-golden transition transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2 text-dark-golden">Location</h3>
            <p className="text-gray-400">Belgrade, Serbia</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo

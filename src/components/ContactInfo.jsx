function ContactInfo() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <a href="tel:+381123456789" className="text-blue-600 hover:underline">
              +381 12 345 6789
            </a>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <a
              href="mailto:info@carrentalserbia.com"
              className="text-blue-600 hover:underline"
            >
              info@carrentalserbia.com
            </a>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">Belgrade, Serbia</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo

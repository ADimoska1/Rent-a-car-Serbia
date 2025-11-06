function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={car.imageUrl}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-blue-600">€{car.pricePerDay}</span>
          <span className="text-gray-600">/day</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Rent Now
        </button>
      </div>
    </div>
  )
}

export default CarCard


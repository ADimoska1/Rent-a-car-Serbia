// src/cars.js

// Helper function to generate 360 image array (optional - use if you have sequential images)
const generate360Images = (carName, totalImages = 36) => {
  const images = []
  const folderName = carName.toLowerCase().replace(/\s+/g, '-')
  for (let i = 1; i <= totalImages; i++) {
    const num = String(i).padStart(3, '0')
    images.push(`/images/cars/${folderName}/${folderName}-${num}.jpg`)
  }
  return images
}

export const cars = [
  {
    id: 1,
    name: "Skoda Fabia",
    brand: "SKODA",
    engine: "1.4 TDI",
    pricePerDay: 25,
    imageUrl: "/images/skoda-fabia.jpg", // Main image
    // Uncomment and add your 360 images when ready:
    // images360: generate360Images("Skoda Fabia", 36),
    // Or manually specify:
    // images360: [
    //   "/images/cars/skoda-fabia/skoda-fabia-001.jpg",
    //   "/images/cars/skoda-fabia/skoda-fabia-002.jpg",
    //   // ... add all 36 images
    // ],
    features: ["5 Seats", "Manual", "A/C", "10km/l"],
    category: "Economy"
  },
  {
    id: 2,
    name: "Volkswagen Golf",
    brand: "VOLKSWAGEN",
    engine: "1.6 TDI",
    pricePerDay: 35,
    imageUrl: "/images/vw-golf.jpg",
    // images360: generate360Images("Volkswagen Golf", 36),
    features: ["5 Seats", "Automatic", "A/C", "12km/l"],
    category: "Standard"
  },
  {
    id: 3,
    name: "Fiat Punto",
    brand: "FIAT",
    engine: "1.3",
    pricePerDay: 20,
    imageUrl: "/images/fiat-punto.jpg",
    // images360: generate360Images("Fiat Punto", 36),
    features: ["5 Seats", "Manual", "A/C", "9km/l"],
    category: "Economy"
  }
];

// Fallback to placeholder if images don't exist
export const getCarImage = (car) => {
  return car.imageUrl || `https://placehold.co/600x400/E5E7EB/333?text=${encodeURIComponent(car.name)}`;
};

export const locations = [
  "Galerija",
  "Belgrade Arena",
  "Airport"
];

export const additionalOptions = [
  { id: "babySeat", name: "Baby Seat", price: 0, unit: "day" },
  { id: "childSeat", name: "Child Seat (2+)", price: 0, unit: "day" },
  { id: "kidBooster", name: "Kid Booster", price: 0, unit: "day" },
  { id: "petTransport", name: "Pet Transport", price: 3, unit: "day" },
  { id: "gps", name: "GPS", price: 0, unit: "day" },
  { id: "snowChains", name: "Snow Chains", price: 0, unit: "day" },
  { id: "fullInsurance", name: "Full Insurance", price: 5, unit: "day" },
  { id: "additionalDriver", name: "Additional Driver", price: 10, unit: "one-time" },
  { id: "borderCrossing", name: "Border Crossing", price: 20, unit: "one-time" }
];

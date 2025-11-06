// src/cars.js

export const cars = [
  {
    id: 1,
    name: "Skoda Fabia",
    pricePerDay: 25,
    imageUrl: "/images/skoda-fabia.jpg", // You'll add this image to public/images/
    features: ["5 Seats", "Manual", "A/C", "10km/l"],
    category: "Economy"
  },
  {
    id: 2,
    name: "Volkswagen Golf",
    pricePerDay: 35,
    imageUrl: "/images/vw-golf.jpg", // You'll add this image to public/images/
    features: ["5 Seats", "Automatic", "A/C", "12km/l"],
    category: "Standard"
  },
  {
    id: 3,
    name: "Fiat Punto",
    pricePerDay: 20,
    imageUrl: "/images/fiat-punto.jpg", // You'll add this image to public/images/
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

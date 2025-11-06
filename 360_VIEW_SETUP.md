# 360-Degree Car View Setup Guide

To enable the 360-degree view feature when hovering over car images, you need to provide image sequences for each car.

## What You Need to Provide

### Option 1: Image Sequence (Recommended)

For each car, you need a sequence of images showing the car rotated at different angles.

#### Image Requirements:
- **Number of Images**: 36-72 images (more images = smoother rotation)
  - 36 images = 10° increments (good quality)
  - 72 images = 5° increments (high quality)
- **Naming Convention**: Sequential numbers
  - Example: `skoda-fabia-001.jpg`, `skoda-fabia-002.jpg`, ... `skoda-fabia-036.jpg`
  - Or: `skoda-fabia-1.jpg`, `skoda-fabia-2.jpg`, ... `skoda-fabia-36.jpg`
- **Image Format**: JPG, PNG, or WebP
- **Image Size**: Recommended 800x600px or larger
- **Consistency**: All images should be the same size and show the car from the same distance/angle

#### Folder Structure:
```
public/
  images/
    cars/
      skoda-fabia/
        skoda-fabia-001.jpg
        skoda-fabia-002.jpg
        skoda-fabia-003.jpg
        ...
        skoda-fabia-036.jpg
      vw-golf/
        vw-golf-001.jpg
        vw-golf-002.jpg
        ...
      fiat-punto/
        fiat-punto-001.jpg
        fiat-punto-002.jpg
        ...
```

### Option 2: Single Image Array

If you have images in a different structure, you can provide an array of image URLs in the car data.

## How to Update Your Car Data

### Method 1: Using Folder Structure (Automatic)

If you follow the naming convention above, update `src/cars.js`:

```javascript
export const cars = [
  {
    id: 1,
    name: "Skoda Fabia",
    brand: "SKODA",
    engine: "1.4 TDI",
    pricePerDay: 25,
    imageUrl: "/images/cars/skoda-fabia/skoda-fabia-001.jpg",
    images360: [
      "/images/cars/skoda-fabia/skoda-fabia-001.jpg",
      "/images/cars/skoda-fabia/skoda-fabia-002.jpg",
      "/images/cars/skoda-fabia/skoda-fabia-003.jpg",
      // ... add all 36 images
      "/images/cars/skoda-fabia/skoda-fabia-036.jpg"
    ],
    features: ["5 Seats", "Manual", "A/C", "10km/l"],
    category: "Economy"
  },
  // ... other cars
]
```

### Method 2: Helper Function (Easier)

Add this helper function to `src/cars.js`:

```javascript
// Helper function to generate 360 image array
const generate360Images = (carName, totalImages = 36) => {
  const images = []
  for (let i = 1; i <= totalImages; i++) {
    const num = String(i).padStart(3, '0')
    images.push(`/images/cars/${carName.toLowerCase().replace(/\s+/g, '-')}/${carName.toLowerCase().replace(/\s+/g, '-')}-${num}.jpg`)
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
    imageUrl: "/images/cars/skoda-fabia/skoda-fabia-001.jpg",
    images360: generate360Images("Skoda Fabia", 36),
    features: ["5 Seats", "Manual", "A/C", "10km/l"],
    category: "Economy"
  },
  // ... other cars
]
```

## How It Works

1. **Default State**: Shows the first image (or main image) of the car
2. **On Hover**: 
   - Detects mouse position over the image
   - Calculates which image to show based on mouse X position
   - Smoothly transitions between images as you move the mouse
3. **On Mouse Leave**: Returns to the default image

## Testing Without 360 Images

If you don't have 360 images yet, the car selection will work normally with just the main image. The 360 view will only activate if `images360` array is provided in the car data.

## Tips for Creating 360 Images

1. **Use a Turntable**: Place the car on a rotating platform and take photos at regular intervals
2. **Consistent Lighting**: Keep lighting consistent across all images
3. **Same Distance**: Maintain the same distance from the car for all shots
4. **Same Height**: Keep the camera at the same height for all images
5. **Professional Tools**: Consider using professional 360 photography services or software

## Alternative: 3D Model (Advanced)

For a more advanced solution, you could use:
- **Three.js** with a 3D model (GLTF/GLB format)
- **React 360** or similar libraries
- **Cloud-based 360 viewers** (like CloudImage 360)

This requires more technical setup but provides smoother rotation and better quality.

## Current Implementation

The current implementation:
- ✅ Works with image sequences
- ✅ Smooth mouse-follow rotation
- ✅ Shows indicator when hovering
- ✅ Falls back to static image if no 360 images provided
- ✅ Responsive and works on all devices

Just add your 360 image sequences and update the car data!


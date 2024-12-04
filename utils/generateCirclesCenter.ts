//export default function generateCircleCenters(
//  centerLat: number,
//  centerLng: number,
//  circleRadius: number,
//  totalRadius: number,
//) {
//  const earthRadius = 6371000; // Earth's radius in meters
//  const circleCenters = [{ lat: centerLat, lng: centerLng }]; // Start with the center circle
//  function generateLayerCircles(
//    centerLat: number,
//    centerLng: number,
//    currentRadius: number,
//  ) {
//    const numPoints = Math.ceil((2 * Math.PI * currentRadius) / circleRadius); // Number of circles around the layer
//    const angleStep = (2 * Math.PI) / numPoints;
//    const newCircles: { lat: number; lng: number }[] = [];
//    for (let i = 0; i < numPoints; i++) {
//      const angle = i * angleStep;
//      const newLat =
//        centerLat +
//        (currentRadius / earthRadius) * (180 / Math.PI) * Math.cos(angle);
//      const newLng =
//        centerLng +
//        ((currentRadius / earthRadius) * (180 / Math.PI) * Math.sin(angle)) /
//          Math.cos((centerLat * Math.PI) / 180);
//      newCircles.push({ lat: newLat, lng: newLng });
//    }
//    return newCircles;
//  }
//  let currentRadius = circleRadius; // Start with the first layer
//  while (currentRadius <= totalRadius) {
//    const newCircles = generateLayerCircles(
//      centerLat,
//      centerLng,
//      currentRadius,
//    );
//    circleCenters.push(...newCircles); // Add the new circle centers
//    currentRadius += circleRadius; // Move to the next layer
//  }
//  return circleCenters;
//}
//// Example usage:
//const centerLat = 50.879135; // Example: Leuven City latitude
//const centerLng = 4.701937; // Example: Leuven City longitude
//const circleRadius = 50; // Radius of each circle in meters
//const totalRadius = 500; // Total radius to cover in meters
//const circleCenters = generateCircleCenters(
//  centerLat,
//  centerLng,
//  circleRadius,
//  totalRadius,
//);
//console.log("Circle Centers:", circleCenters);

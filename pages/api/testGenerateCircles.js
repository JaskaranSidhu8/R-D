import generateCircleCenters from '../../utils/generateCirclesCenter'; // Adjust the path if needed

export default function handler(req, res) {
  const centerLat = parseFloat(req.query.centerLat || 50.879135); 
  const centerLng = parseFloat(req.query.centerLng || 4.701937); 
  const circleRadius = parseFloat(req.query.circleRadius || 50); 
  const totalRadius = parseFloat(req.query.totalRadius || 500); 

  try {
    const circleCenters = generateCircleCenters(centerLat, centerLng, circleRadius, totalRadius);
    res.status(200).json({ circleCenters });
  } catch (err) {
    console.error('Error generating circles:', err);
    res.status(500).json({ error: err.message });
  }
}

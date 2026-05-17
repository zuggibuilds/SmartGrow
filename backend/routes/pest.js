const express = require('express');
const router = express.Router();

const pests = [
  {
    id: 'pest-001',
    name: 'Fall Armyworm',
    emoji: '🐛',
    iconId: 'icon-fall-armyworm',
    risk: 'High',
    description: 'Spotted 2km NE of Field 02. Monitor leaf whorls daily. Apply emamectin benzoate if infestation >20%.',
    treatment: 'Apply emamectin benzoate 2% EC at 200ml/ha'
  },
  {
    id: 'pest-002',
    name: 'Gray Leaf Spot',
    emoji: '🍂',
    iconId: 'icon-leaf-spot',
    risk: 'Medium',
    description: 'Favorable conditions this week due to high humidity. Check lower leaves of maize. Apply fungicide preventively.',
    treatment: 'Apply fungicide preventively'
  },
  {
    id: 'pest-003',
    name: 'Aphids',
    emoji: '🦗',
    iconId: 'icon-aphid',
    risk: 'Low',
    description: 'Low population detected. Natural predators active. Monitor weekly. No intervention needed currently.',
    treatment: 'Monitor only'
  },
  {
    id: 'pest-004',
    name: 'Rust (Puccinia)',
    emoji: '🌿',
    iconId: 'icon-rust',
    risk: 'Medium',
    description: 'Wheat rust spores active in region. Scout Field 03 leaves. Apply triazole fungicide at first sign.',
    treatment: 'Apply triazole fungicide'
  }
];

router.get('/', (req, res) => {
  res.json(pests);
});

router.get('/high-risk', (req, res) => {
  const highRisk = pests.filter(p => p.risk === 'High');
  res.json(highRisk);
});

router.get('/:id', (req, res) => {
  const pest = pests.find(p => p.id === req.params.id);
  if (!pest) return res.status(404).json({ error: 'Pest not found' });
  res.json(pest);
});

router.post('/detection', (req, res) => {
  // Image upload endpoint for AI detection
  res.json({
    detected: true,
    pest: 'Fall Armyworm',
    confidence: 0.92,
    recommendation: 'High risk - treat immediately'
  });
});

module.exports = router;

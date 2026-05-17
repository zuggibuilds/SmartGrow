const express = require('express');
const router = express.Router();

const crops = [
  { id: 'crop-001', name: 'Corn', variety: 'SC403', fieldId: 'field-001', yield: '375t', emoji: '🌽', iconId: 'icon-corn' },
  { id: 'crop-002', name: 'Carrot', variety: 'Nantes', fieldId: 'field-001', yield: '1000t', emoji: '🥕', iconId: 'icon-carrot' },
  { id: 'crop-003', name: 'Potato', variety: 'BP1', fieldId: 'field-001', yield: '750t', emoji: '🥔', iconId: 'icon-tuber' },
  { id: 'crop-004', name: 'Soybean', variety: 'PAN8431', fieldId: 'field-002', yield: '450t', emoji: '🌿', iconId: 'icon-soy' },
  { id: 'crop-005', name: 'Wheat', variety: 'PAN3031', fieldId: 'field-003', yield: '600t', emoji: '🌾', iconId: 'icon-wheat' }
];

router.get('/', (req, res) => {
  res.json(crops);
});

router.get('/field/:fieldId', (req, res) => {
  const fieldCrops = crops.filter(c => c.fieldId === req.params.fieldId);
  res.json(fieldCrops);
});

router.post('/', (req, res) => {
  const newCrop = {
    id: 'crop-' + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  crops.push(newCrop);
  res.status(201).json(newCrop);
});

module.exports = router;

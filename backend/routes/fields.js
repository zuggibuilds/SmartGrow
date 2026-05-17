const express = require('express');
const router = express.Router();

// Mock field data
const fields = [
  {
    id: 'field-001',
    name: 'Field 01',
    location: 'Mashonaland East',
    coordinates: { lat: -17.8312, lng: 31.0242 },
    hectares: 125,
    crops: ['Corn', 'Carrot', 'Potato'],
    ndvi: 0.62,
    humidity: 19,
    optimalZone: 64,
    status: 'Active',
    tractor: { active: true, row: 4, totalRows: 12 },
    iconId: 'icon-field'
  },
  {
    id: 'field-002',
    name: 'Field 02',
    location: 'Goromonzi',
    coordinates: { lat: -17.92, lng: 31.15 },
    hectares: 98,
    crops: ['Soybean'],
    ndvi: 0.74,
    humidity: 42,
    optimalZone: 72,
    status: 'Irrigating',
    tractor: { active: false },
    iconId: 'icon-field'
  },
  {
    id: 'field-003',
    name: 'Field 03',
    location: 'Murewa',
    coordinates: { lat: -17.65, lng: 31.32 },
    hectares: 64,
    crops: ['Wheat'],
    ndvi: 0.81,
    humidity: 35,
    optimalZone: 88,
    status: 'Pre-harvest',
    tractor: { active: false },
    iconId: 'icon-field'
  }
];

// Get all fields
router.get('/', (req, res) => {
  res.json(fields);
});

// Get single field
router.get('/:id', (req, res) => {
  const field = fields.find(f => f.id === req.params.id);
  if (!field) return res.status(404).json({ error: 'Field not found' });
  res.json(field);
});

// Get field statistics
router.get('/:id/stats', (req, res) => {
  const field = fields.find(f => f.id === req.params.id);
  if (!field) return res.status(404).json({ error: 'Field not found' });
  
  res.json({
    fieldId: field.id,
    plantedArea: field.hectares,
    ndvi: field.ndvi,
    humidity: field.humidity,
    optimalZonePercentage: field.optimalZone,
    lastUpdate: new Date().toISOString()
  });
});

// Create new field
router.post('/', (req, res) => {
  const newField = {
    id: 'field-' + Date.now(),
    ...req.body,
    status: 'Active',
    createdAt: new Date().toISOString()
  };
  fields.push(newField);
  res.status(201).json(newField);
});

// Update field
router.put('/:id', (req, res) => {
  const field = fields.find(f => f.id === req.params.id);
  if (!field) return res.status(404).json({ error: 'Field not found' });
  Object.assign(field, req.body);
  res.json(field);
});

module.exports = router;

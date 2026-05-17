const express = require('express');
const router = express.Router();

const npkData = {
  'field-001': {
    fieldId: 'field-001',
    sampleId: 'sample-7',
    sampleDate: '2025-01-14',
    lab: 'AgriTest Harare',
    iconId: 'icon-fertilizer',
    nitrogen: { score: 48, max: 100, recommendation: 'Apply CAN 100kg/ha' },
    phosphorus: { score: 40, max: 100, recommendation: 'Apply DAP within 5 days', alert: true },
    potassium: { score: 55, max: 100, recommendation: 'Monitor - acceptable level' }
  },
  'field-002': {
    fieldId: 'field-002',
    sampleId: 'sample-6',
    sampleDate: '2025-01-12',
    lab: 'AgriTest Harare',
    iconId: 'icon-fertilizer',
    nitrogen: { score: 62, max: 100, recommendation: 'Adequate' },
    phosphorus: { score: 58, max: 100, recommendation: 'Adequate' },
    potassium: { score: 65, max: 100, recommendation: 'Adequate' }
  }
};

const laiData = {
  'field-001': {
    value: 0.7,
    week: 1,
    status: 'Low canopy',
    iconId: 'icon-leaf',
    weeklyTrend: [30, 55, 70, 45, 60, 80, 35],
    activeWeeks: [2, 4, 7]
  }
};

router.get('/field/:fieldId', (req, res) => {
  const data = npkData[req.params.fieldId];
  if (!data) return res.status(404).json({ error: 'NPK data not found' });
  res.json(data);
});

router.get('/lai/field/:fieldId', (req, res) => {
  const data = laiData[req.params.fieldId];
  if (!data) return res.status(404).json({ error: 'LAI data not found' });
  res.json(data);
});

router.post('/sample', (req, res) => {
  const newSample = {
    sampleId: 'sample-' + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(newSample);
});

router.get('/recommendations/field/:fieldId', (req, res) => {
  const data = npkData[req.params.fieldId];
  if (!data) return res.status(404).json({ error: 'Field not found' });
  
  const recommendations = [];
  if (data.nitrogen.score < 50) recommendations.push(data.nitrogen.recommendation);
  if (data.phosphorus.score < 50) recommendations.push(data.phosphorus.recommendation);
  if (data.potassium.score < 50) recommendations.push(data.potassium.recommendation);
  
  res.json({ recommendations, alerts: data.phosphorus.alert ? ['Low phosphorus'] : [] });
});

module.exports = router;

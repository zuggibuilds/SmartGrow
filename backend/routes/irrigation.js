const express = require('express');
const router = express.Router();

const irrigationData = {
  'field-001': { soilMoisture: 62, status: 'OK', usedToday: 2400, liters: 2400 },
  'field-002': { soilMoisture: 38, status: 'LOW', usedToday: 3100, liters: 3100 },
  'field-003': { soilMoisture: 80, status: 'GOOD', usedToday: 1200, liters: 1200 }
};

const schedules = [
  { id: 'sched-001', fieldId: 'field-001', nextIrrigation: '2025-01-17', duration: 2, volume: 2500, iconId: 'icon-irrigation' },
  { id: 'sched-002', fieldId: 'field-002', nextIrrigation: '2025-01-16', duration: 3, volume: 3200, urgent: true, iconId: 'icon-irrigation' },
  { id: 'sched-003', fieldId: 'field-003', nextIrrigation: '2025-01-20', duration: 1, volume: 1500, iconId: 'icon-irrigation' }
];

router.get('/status', (req, res) => {
  res.json({
    totalUsedToday: 6700,
    averageMoisture: 60,
    rainIncoming: 18,
    lastUpdate: new Date().toISOString()
  });
});

router.get('/field/:fieldId', (req, res) => {
  const data = irrigationData[req.params.fieldId];
  if (!data) return res.status(404).json({ error: 'Field not found' });
  res.json(data);
});

router.get('/schedules', (req, res) => {
  res.json(schedules);
});

router.get('/schedules/:fieldId', (req, res) => {
  const schedule = schedules.find(s => s.fieldId === req.params.fieldId);
  if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
  res.json(schedule);
});

router.post('/schedules', (req, res) => {
  const newSchedule = {
    id: 'sched-' + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

module.exports = router;

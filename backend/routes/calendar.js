const express = require('express');
const router = express.Router();

const calendarEvents = [
  {
    id: 'event-001',
    date: '2025-01-16',
    type: 'planting',
    emoji: '🌱',
    iconId: 'icon-seedling',
    title: 'Planting — Field 01 Block B',
    description: 'SC403 Maize',
    fieldId: 'field-001'
  },
  {
    id: 'event-002',
    date: '2025-01-18',
    type: 'fertilizer',
    emoji: '🧪',
    iconId: 'icon-fertilizer',
    title: 'Fertilizer top-dress — Field 02',
    description: 'Apply CAN 100kg/ha',
    fieldId: 'field-002'
  },
  {
    id: 'event-003',
    date: '2025-01-18',
    type: 'spray',
    emoji: '💧',
    iconId: 'icon-spray',
    title: 'Foliar spray — Field 01 & 02',
    description: 'Emamectin benzoate 0.2%',
    fieldIds: ['field-001', 'field-002']
  },
  {
    id: 'event-004',
    date: '2025-01-25',
    type: 'harvest',
    emoji: '🌾',
    iconId: 'icon-wheat',
    title: 'Harvest — Field 03 Wheat',
    description: 'Full day · Combine harvester',
    fieldId: 'field-003'
  }
];

router.get('/events', (req, res) => {
  res.json(calendarEvents);
});

router.get('/events/month/:month/:year', (req, res) => {
  const { month, year } = req.params;
  const filtered = calendarEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate.getMonth() === parseInt(month) - 1 && eventDate.getFullYear() === parseInt(year);
  });
  res.json(filtered);
});

router.get('/events/field/:fieldId', (req, res) => {
  const filtered = calendarEvents.filter(e => e.fieldId === req.params.fieldId || (e.fieldIds && e.fieldIds.includes(req.params.fieldId)));
  res.json(filtered);
});

router.post('/events', (req, res) => {
  const newEvent = {
    id: 'event-' + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  calendarEvents.push(newEvent);
  res.status(201).json(newEvent);
});

router.delete('/events/:id', (req, res) => {
  const index = calendarEvents.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Event not found' });
  const removed = calendarEvents.splice(index, 1);
  res.json(removed[0]);
});

module.exports = router;

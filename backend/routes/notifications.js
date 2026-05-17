const express = require('express');
const router = express.Router();

const notifications = [
  {
    id: 'notif-001',
    type: 'pest',
    emoji: '🐛',
    iconId: 'icon-bug',
    title: 'Fall Armyworm detected nearby',
    message: 'Sighting 2km NE of Field 02. High risk. Scout immediately.',
    severity: 'high',
    timestamp: new Date(Date.now() - 10 * 60000),
    read: false
  },
  {
    id: 'notif-002',
    type: 'soil',
    emoji: '🧪',
    iconId: 'icon-lab',
    title: 'Low phosphorus — Field 01',
    message: 'Soil sample shows P at 40/100. Apply DAP within 5 days.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 2 * 3600000),
    read: false
  },
  {
    id: 'notif-003',
    type: 'weather',
    emoji: '🌧',
    iconId: 'icon-rain',
    title: 'Rain forecast Wednesday',
    message: '18mm expected. Good timing — postpone irrigation Field 02.',
    severity: 'info',
    timestamp: new Date(Date.now() - 24 * 3600000),
    read: true
  },
  {
    id: 'notif-004',
    type: 'harvest',
    emoji: '🌾',
    iconId: 'icon-wheat',
    title: 'Harvest reminder — Field 03',
    message: 'Wheat approaching maturity. Plan harvester for Jan 25.',
    severity: 'info',
    timestamp: new Date(Date.now() - 2 * 24 * 3600000),
    read: true
  }
];

router.get('/', (req, res) => {
  res.json(notifications);
});

router.get('/unread', (req, res) => {
  const unread = notifications.filter(n => !n.read);
  res.json(unread);
});

router.put('/:id/read', (req, res) => {
  const notif = notifications.find(n => n.id === req.params.id);
  if (!notif) return res.status(404).json({ error: 'Notification not found' });
  notif.read = true;
  res.json(notif);
});

router.post('/', (req, res) => {
  const newNotif = {
    id: 'notif-' + Date.now(),
    ...req.body,
    timestamp: new Date(),
    read: false
  };
  notifications.unshift(newNotif);
  res.status(201).json(newNotif);
});

router.delete('/:id', (req, res) => {
  const index = notifications.findIndex(n => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Notification not found' });
  const removed = notifications.splice(index, 1);
  res.json(removed[0]);
});

module.exports = router;

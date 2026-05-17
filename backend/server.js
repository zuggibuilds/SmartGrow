const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database Connection
console.log('SmartGrow API Server Starting...');

const indexPath = path.resolve(__dirname, '..', 'frontend', 'index.html');

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.get('/dashboard', (req, res) => {
  res.sendFile(indexPath);
});

const frontendDir = path.resolve(__dirname, '..', 'frontend');
app.use(express.static(frontendDir, { index: false }));

// API Routes
const fieldsRouter = require('./routes/fields');
const cropRouter = require('./routes/crops');
const weatherRouter = require('./routes/weather');
const irrigationRouter = require('./routes/irrigation');
const npkRouter = require('./routes/npk');
const pestRouter = require('./routes/pest');
const calendarRouter = require('./routes/calendar');
const aiRouter = require('./routes/ai');
const notificationsRouter = require('./routes/notifications');

app.use('/api/fields', fieldsRouter);
app.use('/api/crops', cropRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/irrigation', irrigationRouter);
app.use('/api/npk', npkRouter);
app.use('/api/pest', pestRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/ai', aiRouter);
app.use('/api/notifications', notificationsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'SmartGrow API is running', timestamp: new Date().toISOString() });
});

// Dashboard overview endpoint
app.get('/api/dashboard', (req, res) => {
  res.json({
    activeFields: 3,
    totalHectares: 287,
    avgNDVI: 0.74,
    forecastYield: 6.8,
    upcomingTasks: 3,
    activeAlerts: 2,
    lastUpdate: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SmartGrow API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

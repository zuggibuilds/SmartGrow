const express = require('express');
const router = express.Router();

const weatherData = {
  current: {
    temperature: 28,
    feelsLike: 31,
    humidity: 65,
    rainfall: 18,
    wind: 14,
    condition: 'Humid',
    iconId: 'icon-weather',
    lastUpdate: new Date().toISOString()
  },
  forecast: [
    { day: 'MON', icon: '☀️', iconId: 'icon-sun', temp: 29, rain: 0, condition: 'Clear' },
    { day: 'TUE', icon: '⛅', iconId: 'icon-partly-cloud', temp: 26, rain: 4, condition: 'Partly Cloudy' },
    { day: 'WED', icon: '🌧', iconId: 'icon-rain', temp: 22, rain: 18, condition: 'Rainy' },
    { day: 'THU', icon: '🌦', iconId: 'icon-thunder', temp: 24, rain: 8, condition: 'Thunderstorms' },
    { day: 'FRI', icon: '☀️', iconId: 'icon-sun', temp: 31, rain: 0, condition: 'Clear' },
    { day: 'SAT', icon: '⛅', iconId: 'icon-partly-cloud', temp: 27, rain: 2, condition: 'Partly Cloudy' },
    { day: 'SUN', icon: '🌤', iconId: 'icon-sun-cloud', temp: 30, rain: 0, condition: 'Clear' }
  ]
};

router.get('/current', (req, res) => {
  res.json(weatherData.current);
});

router.get('/forecast', (req, res) => {
  res.json(weatherData.forecast);
});

router.get('/all', (req, res) => {
  res.json(weatherData);
});

router.get('/alerts', (req, res) => {
  res.json({
    alerts: [
      { type: 'drought', message: 'Below-average rainfall expected Feb–Mar', severity: 'warning' },
      { type: 'rain', message: 'Rain forecast Wednesday - 18mm', severity: 'info' }
    ]
  });
});

module.exports = router;

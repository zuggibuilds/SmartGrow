# SmartGrow Database Schema

## Collections (MongoDB)

### Users
```javascript
{
  _id: ObjectId,
  email: String,
  username: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  farm_id: ObjectId,
  role: String (farmer, advisor, admin),
  location: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Farms
```javascript
{
  _id: ObjectId,
  name: String,
  owner_id: ObjectId,
  location: String,
  province: String,
  totalHectares: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Fields
```javascript
{
  _id: ObjectId,
  farm_id: ObjectId,
  name: String,
  location: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  hectares: Number,
  crops: [ObjectId], // references Crops collection
  soil_type: String,
  ndvi: Number,
  humidity: Number,
  status: String (Active, Irrigating, Pre-harvest, Fallow),
  optimalZone: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Crops
```javascript
{
  _id: ObjectId,
  field_id: ObjectId,
  name: String,
  variety: String,
  plantingDate: Date,
  expectedHarvestDate: Date,
  estimatedYield: Number,
  actualYield: Number,
  status: String (Planted, Growing, Mature, Harvested),
  createdAt: Date,
  updatedAt: Date
}
```

### WeatherData
```javascript
{
  _id: ObjectId,
  farm_id: ObjectId,
  timestamp: Date,
  temperature: Number,
  humidity: Number,
  rainfall: Number,
  windSpeed: Number,
  condition: String,
  source: String (sensor, api),
  createdAt: Date
}
```

### IrrigationSchedules
```javascript
{
  _id: ObjectId,
  field_id: ObjectId,
  scheduledDate: Date,
  duration: Number, // minutes
  volume: Number, // liters
  method: String (drip, sprinkler, furrow),
  completed: Boolean,
  actualVolume: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### SoilSamples
```javascript
{
  _id: ObjectId,
  field_id: ObjectId,
  sampleDate: Date,
  lab: String,
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  ph: Number,
  organicMatter: Number,
  createdAt: Date
}
```

### PestObservations
```javascript
{
  _id: ObjectId,
  field_id: ObjectId,
  pestType: String,
  observationDate: Date,
  severity: String (low, medium, high),
  treatmentApplied: String,
  treatmentDate: Date,
  image: String (path),
  createdAt: Date
}
```

### CalendarEvents
```javascript
{
  _id: ObjectId,
  farm_id: ObjectId,
  field_id: ObjectId,
  eventType: String (planting, fertilizing, spraying, harvesting, irrigation),
  title: String,
  description: String,
  scheduledDate: Date,
  completedDate: Date,
  status: String (scheduled, in-progress, completed),
  createdAt: Date,
  updatedAt: Date
}
```

### Notifications
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  farm_id: ObjectId,
  type: String (pest, soil, weather, task, alert),
  title: String,
  message: String,
  severity: String (info, warning, alert, critical),
  read: Boolean,
  actionUrl: String,
  createdAt: Date
}
```

### AIChat
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  conversation: [{
    role: String (user, assistant),
    message: String,
    timestamp: Date
  }],
  topic: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ farm_id: 1 })

// Fields
db.fields.createIndex({ farm_id: 1 })
db.fields.createIndex({ status: 1 })

// Crops
db.crops.createIndex({ field_id: 1 })
db.crops.createIndex({ status: 1 })

// Weather Data
db.weatherData.createIndex({ farm_id: 1, timestamp: -1 })

// Irrigation Schedules
db.irrigationSchedules.createIndex({ field_id: 1, scheduledDate: 1 })

// Calendar Events
db.calendarEvents.createIndex({ farm_id: 1, scheduledDate: 1 })
db.calendarEvents.createIndex({ field_id: 1 })

// Notifications
db.notifications.createIndex({ user_id: 1, createdAt: -1 })
db.notifications.createIndex({ read: 1 })

// Pest Observations
db.pestObservations.createIndex({ field_id: 1, observationDate: -1 })
```

## Relationships

```
Users (1) ──────────────── (many) Farms
  ↓                               ↓
  └─────────── (many) Notifications
              
Farms (1) ──────────────── (many) Fields
  ↓                           ↓
  ├─ WeatherData            ├─ Crops
  ├─ CalendarEvents         ├─ SoilSamples
  ├─ Notifications          ├─ PestObservations
  └─ AIChat                 └─ IrrigationSchedules
```

## Data Validation Rules

### Fields
- hectares: > 0
- ndvi: 0 to 1
- humidity: 0 to 100
- optimalZone: 0 to 100

### SoilSamples
- nitrogen: 0 to 100
- phosphorus: 0 to 100
- potassium: 0 to 100
- ph: 4 to 9

### WeatherData
- temperature: -50 to 60 (°C)
- humidity: 0 to 100
- rainfall: 0 to 500 (mm)
- windSpeed: 0 to 100 (km/h)

### IrrigationSchedules
- duration: 1 to 480 (minutes)
- volume: 100 to 100000 (liters)

## Migration Strategy

To migrate from mock data to MongoDB:

1. Create indexes
2. Insert sample data
3. Update API routes to use mongoose models
4. Test all endpoints
5. Deploy to production

## Backup Strategy

- Daily automated backups
- Weekly full backups
- Monthly archives
- Point-in-time recovery enabled

---

**Schema Version:** 1.0
**Last Updated:** January 2025

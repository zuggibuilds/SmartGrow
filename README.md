# SmartGrow - Full Stack Precision Agriculture Application

A comprehensive precision agriculture platform built with Node.js/Express backend, vanilla JavaScript frontend, and REST APIs for real-time farm management.

## Features

### Dashboard Overview
- Real-time farm statistics (active fields, total hectares, NDVI, forecast yield)
- Upcoming farm tasks with prioritization
- Active alerts and notifications
- Quick access to all farming operations

### Field Management
- Multi-field overview with detailed statistics
- Field-specific crop information
- NPK soil analysis with recommendations
- NDVI tracking and health metrics
- LAI (Leaf Area Index) monitoring

### Irrigation Management
- Real-time soil moisture monitoring
- Smart irrigation scheduling
- Per-field water usage tracking
- Status indicators for each field
- Rainfall forecasting integration

### Weather Monitoring
- Current weather conditions
- 7-day weather forecast
- Temperature, rainfall, and wind data
- Drought alerts and weather-based recommendations
- Historical weather trends

### Pest & Disease Detection
- Known pest threats in your region
- Risk level classification (Low/Medium/High)
- Treatment recommendations
- Image upload capability for AI detection
- Regional pest monitoring

### Crop Calendar
- Interactive calendar view
- Scheduled farming activities
- Event types (planting, fertilizer, spray, harvest)
- Field-specific event filtering
- Quick event management

### AI Agronomy Advisor
- Intelligent chat interface
- Context-aware recommendations
- Expert advice on:
  - Phosphorus management
  - Fall Armyworm treatment
  - Harvest timing
  - Seed variety selection
- Quick suggestion buttons

### Notifications
- Real-time alerts
- Pest outbreak warnings
- Soil analysis alerts
- Weather notifications
- Farm task reminders

## Project Structure

```
SmartGrow/
├── backend/
│   ├── server.js                 # Express server
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment configuration
│   ├── routes/                   # API routes
│   │   ├── fields.js             # Field endpoints
│   │   ├── crops.js              # Crop endpoints
│   │   ├── weather.js            # Weather endpoints
│   │   ├── irrigation.js         # Irrigation endpoints
│   │   ├── npk.js                # NPK analysis endpoints
│   │   ├── pest.js               # Pest detection endpoints
│   │   ├── calendar.js           # Calendar endpoints
│   │   ├── ai.js                 # AI advisor endpoints
│   │   └── notifications.js      # Notification endpoints
│   ├── models/                   # Database models (ready for MongoDB)
│   └── controllers/              # Business logic
│
├── frontend/
│   ├── index.html                # Main HTML
│   ├── styles.css                # Styling
│   ├── app.js                    # Application logic
│   ├── package.json              # Frontend metadata
│   └── README.md                 # Frontend instructions
│
├── database/
│   └── schema.md                 # Database schema documentation
│
└── README.md                      # This file
```

## API Endpoints

### Fields
- `GET /api/fields` - Get all fields
- `GET /api/fields/:id` - Get field details
- `GET /api/fields/:id/stats` - Get field statistics
- `POST /api/fields` - Create new field
- `PUT /api/fields/:id` - Update field

### Crops
- `GET /api/crops` - Get all crops
- `GET /api/crops/field/:fieldId` - Get crops by field
- `POST /api/crops` - Add new crop

### Weather
- `GET /api/weather/current` - Current weather
- `GET /api/weather/forecast` - Weather forecast
- `GET /api/weather/all` - Complete weather data
- `GET /api/weather/alerts` - Weather alerts

### Irrigation
- `GET /api/irrigation/status` - Irrigation status
- `GET /api/irrigation/field/:fieldId` - Field irrigation data
- `GET /api/irrigation/schedules` - Irrigation schedules
- `POST /api/irrigation/schedules` - Create schedule

### NPK Analysis
- `GET /api/npk/field/:fieldId` - NPK data for field
- `GET /api/npk/lai/field/:fieldId` - LAI data
- `GET /api/npk/recommendations/field/:fieldId` - NPK recommendations
- `POST /api/npk/sample` - Record new soil sample

### Pest Management
- `GET /api/pest` - All known pests
- `GET /api/pest/high-risk` - High-risk pests
- `GET /api/pest/:id` - Pest details
- `POST /api/pest/detection` - AI pest detection

### Calendar
- `GET /api/calendar/events` - All calendar events
- `GET /api/calendar/events/month/:month/:year` - Events by month
- `GET /api/calendar/events/field/:fieldId` - Field events
- `POST /api/calendar/events` - Create event
- `DELETE /api/calendar/events/:id` - Delete event

### AI Advisor
- `POST /api/ai/chat` - Send chat message
- `GET /api/ai/suggestions` - Get AI suggestions

### Notifications
- `GET /api/notifications` - All notifications
- `GET /api/notifications/unread` - Unread only
- `PUT /api/notifications/:id/read` - Mark as read
- `POST /api/notifications` - Create notification
- `DELETE /api/notifications/:id` - Delete notification

## Installation & Setup

### Prerequisites
- Node.js 14+ 
- npm or yarn
- Python 3 (for local development server)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file (already created):
```
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Start a local development server:
```bash
python -m http.server 3000
```

3. Open browser and navigate to:
```
http://localhost:3000
```

## Usage

### Dashboard
- View overall farm statistics and health
- See upcoming tasks and active alerts
- Quick navigation to all features

### Field Management
- Click on any field to view detailed information
- See crops, soil analysis, and health metrics
- Track NDVI and optimal cultivation zones

### Irrigation
- Monitor soil moisture levels for each field
- View water usage statistics
- Check irrigation status and recommendations

### Weather
- Check current weather conditions
- Plan farm activities based on 7-day forecast
- Receive weather-based alerts

### Pest Management
- Browse known regional pests
- Upload crop photos for AI detection
- Get treatment recommendations

### Calendar
- Schedule farm activities
- View upcoming events
- Track planting, fertilizing, spraying, and harvest

### AI Advisor
- Ask questions about crops and farming
- Get instant expert recommendations
- Use quick suggestion buttons for common questions

## Technology Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **Mongoose** - MongoDB integration (ready)
- **JWT** - Authentication ready

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (responsive design)
- **Vanilla JavaScript** - No framework dependencies
- **Fetch API** - HTTP requests

### Data
- Currently using in-memory mock data
- Ready for MongoDB integration
- Scalable schema for production

## Future Enhancements

- MongoDB integration for persistent data
- User authentication and profiles
- Real IoT sensor data integration
- Mobile app version
- Advanced analytics and reporting
- Machine learning for yield prediction
- Real image processing for pest detection
- SMS/Email notifications
- Data export and reporting
- Multi-user collaboration
- Role-based access control

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920x1080 and above)
- Tablets (768px - 1024px)
- Mobile (320px - 768px)

Navigation adapts for smaller screens with horizontal sidebar.

## Performance

- Optimized CSS with minimal repaints
- Lazy loading for images
- Efficient data caching
- Auto-refresh every 30 seconds
- Responsive animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Configuration

### API Base URL
Default: `http://localhost:5000/api`

To change, update in `frontend/app.js`:
```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

### Backend Port
Default: 5000

To change, update `backend/.env`:
```
PORT=your_port_number
```

## Troubleshooting

### Frontend can't connect to backend
1. Ensure backend is running on correct port
2. Check CORS is enabled
3. Verify API_BASE_URL in app.js

### API returns 404
1. Check route paths in backend/routes/
2. Verify API is running

### Data not showing
1. Check browser console for errors
2. Verify mock data is loaded
3. Check network tab for API responses

## Development

### Adding a new route
1. Create new file in `backend/routes/`
2. Import in `backend/server.js`
3. Update frontend API calls in `frontend/app.js`

### Customizing styles
- Edit `frontend/styles.css`
- CSS variables defined in `:root`
- Responsive breakpoints at bottom

### Adding new features
1. Plan database schema in `database/schema.md`
2. Create backend route and logic
3. Create frontend UI and API calls
4. Test thoroughly

## Support

For issues and questions:
1. Check documentation
2. Review API endpoints
3. Check browser console for errors
4. Verify server logs

## License

SmartGrow is open source and available for agricultural use.

## Version

v1.0.0 - Full stack application with all core features

---

**Last Updated:** January 2025
**Location:** Mashonaland East, Zimbabwe
**Time Zone:** UTC+2

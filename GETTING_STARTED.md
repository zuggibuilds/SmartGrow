# SmartGrow - Getting Started Guide

## 🚀 Quick Start (2 Steps)

### Step 1: Install Dependencies
Run this command in the project root:

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Mac/Linux (Bash):**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual:**
```bash
cd backend
npm install
cd ..
```

### Step 2: Start the Application

Open TWO terminal windows:

**Terminal 1 - Backend API:**
```bash
cd backend
npm start
```
✅ API running at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
python -m http.server 3000
```
✅ App running at: http://localhost:3000

Open http://localhost:3000 in your browser!

---

## 📋 Full Installation

### Prerequisites
- Node.js 14 or higher ([download](https://nodejs.org))
- Python 3 ([download](https://www.python.org))
- A modern web browser

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install Node dependencies:
```bash
npm install
```

3. Verify dependencies:
```bash
npm list
```

4. Start the server:
```bash
npm start
```

**Output should show:**
```
SmartGrow API Server Starting...
SmartGrow API running on http://localhost:5000
Health check: http://localhost:5000/api/health
```

### Frontend Setup

1. In a NEW terminal, navigate to frontend:
```bash
cd frontend
```

2. Start the development server:
```bash
python -m http.server 3000
```

**Output should show:**
```
Serving HTTP on 0.0.0.0 port 3000 (http://0.0.0.0:3000/) ...
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

---

## ✅ Verify Installation

### Check Backend
Visit in browser: http://localhost:5000/api/health

Expected response:
```json
{
  "status": "SmartGrow API is running",
  "timestamp": "2025-01-15T10:30:45.123Z"
}
```

### Check Frontend
Visit in browser: http://localhost:3000

Expected: SmartGrow dashboard loads with all data visible

### Check API Connections
1. Open Developer Tools (F12)
2. Go to Network tab
3. Refresh page
4. Should see API calls to http://localhost:5000/api/*

---

## 🎯 Using the Application

### Navigation
- **Dashboard**: Overview of farm statistics
- **Fields**: View all your active fields
- **Irrigation**: Monitor soil moisture and water usage
- **Weather**: Check current weather and forecast
- **Pests**: View regional pest threats
- **Calendar**: Manage farm events and schedules
- **AI Advisor**: Chat with farming AI assistant
- **Notifications**: View all alerts and messages
- **Settings**: Configure preferences

### Key Features

#### Dashboard
- See 3 active fields with 287 total hectares
- View average NDVI (0.74) and forecast yield (6.8t/ha)
- Check upcoming tasks and active alerts
- Quick overview of farm health

#### Fields
- Click any field to see detailed information
- View NPK soil analysis with recommendations
- Monitor crops and health metrics
- Check NDVI and optimal cultivation zones

#### Irrigation
- Track soil moisture for each field
- Monitor water usage (2,400L used today)
- Receive irrigation recommendations
- Check rain forecast impact

#### Weather
- Current: 28°C, 65% humidity, 14km/h wind
- 7-day forecast with rainfall predictions
- Drought alerts and recommendations
- Historical trends

#### Pests
- 4 known regional pests tracked
- Risk levels: High, Medium, Low
- Treatment recommendations for each
- Upload photos for AI detection

#### Calendar
- Interactive calendar view
- Scheduled activities by type
- Color-coded events (planting, fertilizer, spray, harvest)
- Event management

#### AI Advisor
- Ask farming questions
- Get expert recommendations
- Quick suggestion buttons for common questions
- Real-time responses

---

## 🔧 Configuration

### API Base URL
Default: `http://localhost:5000/api`

To change, edit `frontend/app.js` line 2:
```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

### Backend Port
Default: 5000

To change, edit `backend/.env`:
```
PORT=8000
NODE_ENV=development
```
Then restart backend with `npm start`

### Frontend Port
Default: 3000

To change when starting:
```bash
python -m http.server 8000
```

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
**Solution:** Install dependencies
```bash
cd backend
npm install
```

### "API not reachable from frontend"
**Solution:** Check backend is running
```bash
# Terminal 1 - Verify backend is running
cd backend && npm start
# Should show: "SmartGrow API running on http://localhost:5000"
```

### "Frontend shows blank page"
**Solution:** Clear cache and check console
```
1. Press Ctrl+Shift+Delete (clear cache)
2. Press F12 (open Developer Tools)
3. Go to Console tab
4. Look for errors
```

### "No data showing in frontend"
**Solution:** Verify API connection
```
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Should see API calls like:
   - http://localhost:5000/api/fields
   - http://localhost:5000/api/weather/all
```

### "Port 5000 already in use"
**Solution:** Use different port
```bash
# Edit backend/.env
PORT=8000
# Restart backend
npm start
# Update frontend API_BASE_URL to http://localhost:8000/api
```

### "Port 3000 already in use"
**Solution:** Use different port
```bash
cd frontend
python -m http.server 8000
# Open http://localhost:8000
```

---

## 📊 What Data Is Available

### Mock Data Included
- 3 active fields (Field 01, 02, 03)
- 5 crop types with details
- Weather forecast (7 days)
- 4 regional pests with risk levels
- Calendar events (planting, fertilizer, spray, harvest)
- NPK soil analysis data
- Irrigation schedules
- 4 notifications (2 unread)

### Real-Time Features
- 30-second auto-refresh
- Chat with AI advisor
- Calendar event management
- Notification management
- Field selection

---

## 🚀 Next Steps

### Development
1. Explore the dashboard
2. Navigate through all pages
3. Try the AI advisor chat
4. Test responsive design (resize browser)

### Production
1. Set up MongoDB database
2. Add user authentication
3. Deploy to Azure/AWS/Heroku
4. Configure HTTPS
5. Set up monitoring
6. Enable backups

### Integration
1. Connect real weather API
2. Integrate IoT sensors
3. Add image processing for pest detection
4. Connect SMS/Email notifications
5. Add mobile app

---

## 📞 Support

### Check Documentation
- README.md - Full documentation
- frontend/README.md - Frontend guide
- database/schema.md - Database schema
- Code comments throughout

### Common Resources
- Backend routes: `backend/routes/`
- Frontend logic: `frontend/app.js`
- Styling: `frontend/styles.css`
- HTML structure: `frontend/index.html`

### Debug Commands

**Check Node version:**
```bash
node --version
```

**Check npm version:**
```bash
npm --version
```

**Check Python version:**
```bash
python --version
```

**Test API health:**
```bash
curl http://localhost:5000/api/health
```

---

## 📈 Performance Tips

- Backend processes ~9 API endpoints
- Frontend refreshes every 30 seconds
- Caches all data in memory
- Responsive design handles all screen sizes
- CSS animations optimized with transform

---

## 🎓 Learning

### Understand the Flow
1. Frontend (index.html) loads styles (styles.css)
2. JavaScript (app.js) initializes and fetches data
3. API calls go to backend (http://localhost:5000/api/*)
4. Backend returns mock JSON data
5. Frontend renders data to HTML

### Explore the Code
- Understand API structure in `backend/server.js`
- Learn routing in `backend/routes/*.js`
- See UI logic in `frontend/app.js`
- Review styling in `frontend/styles.css`

### Modify Features
1. Add new API endpoint in backend
2. Create corresponding frontend function
3. Add UI to display the data
4. Test with browser DevTools

---

**Version:** 1.0.0
**Last Updated:** January 2025
**Status:** Ready for Use

Enjoy farming with SmartGrow! 🌾

<!-- SmartGrow Full-Stack Application Setup and Deployment Guide -->

# SmartGrow - Precision Agriculture Platform
## Setup & Development Instructions

### Quick Start (5 minutes)

#### Terminal 1 - Start Backend API
```bash
cd backend
npm install
npm start
```
Backend will run on: http://localhost:5000

#### Terminal 2 - Start Frontend
```bash
cd frontend
python -m http.server 3000
```
Frontend will run on: http://localhost:3000

Open http://localhost:3000 in your browser.

---

## Project Structure Overview

```
SmartGrow/
├── backend/           # Express.js REST API
│   ├── routes/        # All API endpoints
│   ├── server.js      # Main server file
│   └── package.json   # Dependencies
├── frontend/          # Vanilla JavaScript Web App
│   ├── index.html     # Main HTML
│   ├── styles.css     # All styling
│   ├── app.js         # Application logic
│   └── package.json   # Metadata
├── database/          # MongoDB schema docs
└── README.md          # Full documentation
```

---

## Features Included

✅ **Dashboard** - Farm overview with statistics
✅ **Field Management** - Multi-field tracking with NDVI, NPK data
✅ **Irrigation** - Soil moisture monitoring and scheduling
✅ **Weather** - Current conditions and 7-day forecast
✅ **Pest Detection** - Known regional threats and recommendations
✅ **Crop Calendar** - Event scheduling and tracking
✅ **AI Advisor** - Intelligent chat for farming advice
✅ **Notifications** - Real-time alerts and reminders
✅ **Responsive Design** - Works on desktop, tablet, mobile

---

## API Endpoints Available

### Core Resources
- Fields: `/api/fields` - Farm field management
- Crops: `/api/crops` - Crop tracking
- Weather: `/api/weather` - Weather data
- Irrigation: `/api/irrigation` - Water management
- NPK: `/api/npk` - Soil analysis
- Pests: `/api/pest` - Pest monitoring
- Calendar: `/api/calendar` - Event scheduling
- AI: `/api/ai` - Smart advisor
- Notifications: `/api/notifications` - Alerts

All with full CRUD operations.

---

## Development Workflows

### Adding a New API Endpoint
1. Create route file in `backend/routes/`
2. Import in `backend/server.js`
3. Call from `frontend/app.js` using fetch
4. Test in browser DevTools Network tab

### Customizing Styles
- Edit `frontend/styles.css`
- CSS variables in `:root` section
- Responsive breakpoints at bottom of file
- All components documented

### Mock Data vs. Real Data
- Currently uses mock in-memory data
- Routes in `backend/routes/*.js` return mock objects
- Ready to connect to MongoDB (schema in `database/schema.md`)
- No changes needed to frontend for DB migration

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API not reachable | Check backend running on 5000, CORS enabled |
| Frontend blank | Check console for errors, verify API_BASE_URL |
| No data showing | Clear browser cache, restart backend, check network tab |
| Styles not loading | Hard refresh (Ctrl+Shift+R), check CSS file path |

---

## Next Steps for Production

1. **Database**: Connect MongoDB using mongoose models
2. **Auth**: Add user authentication with JWT
3. **Validation**: Implement input validation
4. **Errors**: Add error handling middleware
5. **Testing**: Add unit and integration tests
6. **Deployment**: Deploy to Azure/AWS/Heroku
7. **Monitoring**: Add logging and analytics
8. **Security**: Add rate limiting, HTTPS

---

## Tech Stack

**Backend**: Node.js + Express.js + CORS
**Frontend**: HTML5 + CSS3 + Vanilla JavaScript
**Data**: Mock in-memory (ready for MongoDB)
**Architecture**: REST API + Single Page App

---

## Performance Features

✨ Optimized CSS animations
✨ Efficient data fetching
✨ Auto-refresh every 30 seconds
✨ Responsive images
✨ Minimal repaints
✨ Fast load times

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Documentation Files

- `README.md` - Full project documentation
- `database/schema.md` - MongoDB schema reference
- `backend/routes/*.js` - API route documentation
- Code comments throughout application

---

## Contact & Support

For issues:
1. Check README.md
2. Review API endpoint details
3. Check browser console (F12)
4. Check server logs in terminal

---

## License & Credits

SmartGrow v1.0.0
Precision Agriculture Platform
Built for farmers in Zimbabwe and beyond

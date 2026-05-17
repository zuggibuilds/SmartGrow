# SmartGrow Frontend

A fully functional, responsive precision agriculture dashboard built with vanilla JavaScript, HTML5, and CSS3.

## Features

- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Real-time Updates** - Auto-refresh every 30 seconds
- **No Framework Dependencies** - Pure vanilla JavaScript
- **Professional UI** - Modern design with smooth animations
- **Full Navigation** - Multi-page application with sidebar navigation
- **API Integration** - Connects to Express backend with fetch API

## Pages & Functionality

### 1. Dashboard
- Farm overview statistics
- Active fields and hectares
- Average NDVI and yield forecast
- Upcoming tasks list
- Active alerts and warnings

### 2. Fields
- View all active fields
- Field-specific statistics
- Crop information
- Land area in hectares
- NDVI health indicator
- Quick access to field details

### 3. Field Details
- Complete field information
- NPK soil analysis with progress bars
- Current crop list
- Fertilizer recommendations
- LAI (Leaf Area Index) data
- Field health metrics

### 4. Irrigation
- Soil moisture tracking per field
- Water usage statistics
- Irrigation status indicators
- Smart scheduling recommendations
- Rain forecast integration

### 5. Weather
- Current weather conditions
- 7-day forecast
- Temperature trends
- Rainfall predictions
- Wind speed and direction
- Drought alerts

### 6. Pest Management
- Regional pest threats
- Risk level classification
- Treatment recommendations
- Photo upload for AI detection
- Historical pest data

### 7. Crop Calendar
- Interactive monthly calendar
- Scheduled farming activities
- Event types (planting, fertilizing, spraying, harvest)
- Quick event management
- Color-coded event types

### 8. AI Advisor
- Chat interface with smart responses
- Context-aware recommendations
- Quick suggestion buttons
- Real-time AI responses
- Conversation history

### 9. Notifications
- All alerts in one place
- Unread count indicator
- Severity indicators
- Searchable notifications
- Timestamp tracking

### 10. Settings
- Notification preferences
- Regional settings
- Unit preferences
- Account settings
- Display preferences

## File Structure

```
frontend/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js              # Application logic and API calls
└── package.json        # Project metadata
```

## How It Works

### Navigation
- Click any item in the left sidebar to navigate between pages
- Active page is highlighted in the sidebar
- Smooth transitions between pages

### Data Flow
1. App loads and fetches all data from API
2. Data is cached in JavaScript variables
3. UI updates when navigating between pages
4. Auto-refresh updates data every 30 seconds
5. User interactions trigger API calls

### API Communication
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Example API call
const response = await fetch(`${API_BASE_URL}/fields`);
const data = await response.json();
```

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: 320px - 768px

On mobile:
- Sidebar becomes horizontal top bar
- Grid layouts convert to single column
- Touch-friendly spacing maintained

## Color Scheme

```
Primary Green:  #4a7c3f
Highlight Lime: #c8e64a
Dark Lime:      #8fa832
Light Gray:     #e8e6df
Card White:     #ffffffe6
Dark Sidebar:   #1a1f1a
Text Dark:      #1a1a1a
Text Muted:     #6b7280
```

## CSS Structure

- **Utilities**: Base styles, animations, scrollbars
- **Sidebar**: Navigation styling
- **Main Content**: Screen and panel layouts
- **Components**: Cards, buttons, inputs, forms
- **Responsive**: Mobile-first approach

## JavaScript Functions

### Navigation
- `navigateTo(page)` - Navigate to specific page
- `showScreen(name)` - Show/hide screens

### Data Loading
- `fetchAllData()` - Load all data from API
- `loadMockData()` - Fallback mock data
- `refreshData()` - Periodic refresh

### Page Loaders
- `loadDashboard()` - Dashboard data
- `loadFieldsList()` - Fields overview
- `viewFieldDetail(fieldId)` - Field details
- `loadIrrigation()` - Irrigation status
- `loadWeather()` - Weather data
- `loadPests()` - Pest threats
- `loadCalendar()` - Calendar events
- `loadNotifications()` - Notifications

### AI Chat
- `sendChat()` - Send chat message
- `askAI(question)` - Ask predefined question

### Utilities
- `formatTime(timestamp)` - Format timestamps
- `getFieldEmoji(crop)` - Get crop emoji

## Starting the Frontend

### Option 1: Python Server (Recommended)
```bash
cd frontend
python -m http.server 3000
```

### Option 2: Node.js Server
```bash
cd frontend
npx http-server -p 3000
```

### Option 3: Live Server (VS Code)
Install Live Server extension, right-click index.html, select "Open with Live Server"

Then open: http://localhost:3000

## Connecting to Backend

1. Ensure backend is running on http://localhost:5000
2. API_BASE_URL in app.js points to correct address
3. CORS is enabled on backend

To change API URL:
```javascript
// In app.js, line 2
const API_BASE_URL = 'http://your-api-url/api';
```

## Performance Optimizations

- ✅ CSS animations use transform and opacity
- ✅ Minimal DOM manipulation
- ✅ Efficient event delegation
- ✅ Data caching reduces API calls
- ✅ Lazy loading ready
- ✅ Asset optimization
- ✅ Responsive images

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- Semantic HTML
- ARIA labels ready
- Keyboard navigation
- High contrast colors
- Readable font sizes
- Touch-friendly targets

## Future Enhancements

- [ ] Offline support (Service Workers)
- [ ] PWA capabilities
- [ ] Advanced charting
- [ ] Data export
- [ ] Custom reports
- [ ] Dark mode
- [ ] Internationalization
- [ ] User preferences storage

## Troubleshooting

### Data Not Loading
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Verify backend is running
5. Check API_BASE_URL in app.js

### Styles Not Applying
1. Hard refresh page (Ctrl+Shift+R)
2. Check styles.css is loaded
3. Clear browser cache
4. Check console for CSS errors

### Navigation Not Working
1. Check console for JavaScript errors
2. Verify onclick handlers in HTML
3. Check function names match

## Development Tips

### Adding New Screen
1. Add `<div class="screen" id="screen-name">` to HTML
2. Create `loadName()` function in app.js
3. Add navigation case in `navigateTo()`
4. Add sidebar link

### Adding New Component
1. Add HTML structure
2. Add CSS styling
3. Add JavaScript logic
4. Test responsiveness

### Debugging
- Use `console.log()` for debugging
- Check Network tab for API response
- Use DevTools to inspect elements
- Check element classes and IDs

## Project Status

✅ Fully functional v1.0
✅ All pages implemented
✅ API integration complete
✅ Responsive design complete
✅ Production ready

---

**Version**: 1.0.0
**Last Updated**: January 2025
**Status**: Active Development

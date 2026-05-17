// Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Data Cache
let fieldsData = [];
let cropsData = [];
let weatherData = {};
let irrigationData = {};
let npkData = {};
let pestsData = [];
let calendarData = [];
let notificationsData = [];

function iconSvg(id, className = 'ui-icon') {
  return `<svg class="${className}" aria-hidden="true"><use href="#${id}"></use></svg>`;
}

function getCropIconMarkup(crop) {
  // Accept either a crop name string or a crop object with `iconId`
  if (!crop) return iconSvg('icon-soy', 'crop-icon');
  if (typeof crop === 'object' && crop.iconId) return iconSvg(crop.iconId, 'crop-icon');
  if (typeof crop === 'string') {
    const icons = {
      Corn: 'icon-corn',
      Carrot: 'icon-carrot',
      Potato: 'icon-tuber',
      Soybean: 'icon-soy',
      Wheat: 'icon-wheat'
    };
    return iconSvg(icons[crop] || 'icon-soy', 'crop-icon');
  }
  return iconSvg('icon-soy', 'crop-icon');
}

function getPestIconMarkup(pest) {
  if (!pest) return iconSvg('icon-bug', 'pest-icon');
  if (typeof pest === 'object' && pest.iconId) return iconSvg(pest.iconId, 'pest-icon');
  const icons = {
    'Fall Armyworm': 'icon-fall-armyworm',
    'Gray Leaf Spot': 'icon-leaf-spot',
    Aphids: 'icon-aphid',
    'Rust (Puccinia)': 'icon-rust'
  };
  return iconSvg(icons[pest] || 'icon-bug', 'pest-icon');
}

function getWeatherIconMarkup(conditionOrObj) {
  // Accept either a condition string or an object with `iconId`/`condition`
  if (!conditionOrObj) return iconSvg('icon-weather', 'forecast-icon');
  if (typeof conditionOrObj === 'object' && conditionOrObj.iconId) return iconSvg(conditionOrObj.iconId, 'forecast-icon');
  const value = `${conditionOrObj || ''}`.toLowerCase();
  if (value.includes('rain') || value.includes('storm')) return iconSvg('icon-rain', 'forecast-icon');
  if (value.includes('cloud')) return iconSvg('icon-partly-cloud', 'forecast-icon');
  if (value.includes('sun') || value.includes('clear')) return iconSvg('icon-sun', 'forecast-icon');
  return iconSvg('icon-weather', 'forecast-icon');
}

function getNotificationIconMarkup(notification) {
  if (!notification) return iconSvg('icon-notifications', 'notif-icon');
  if (notification.iconId) return iconSvg(notification.iconId, 'notif-icon');
  const title = `${notification.title || ''} ${notification.type || ''}`.toLowerCase();
  if (title.includes('soil')) return iconSvg('icon-lab', 'notif-icon');
  if (title.includes('weather')) return iconSvg('icon-rain', 'notif-icon');
  if (title.includes('harvest')) return iconSvg('icon-wheat', 'notif-icon');
  if (title.includes('pest')) return iconSvg('icon-bug', 'notif-icon');
  return iconSvg('icon-notifications', 'notif-icon');
}

function getCalendarIconMarkup(event) {
  if (!event) return iconSvg('icon-calendar', 'calendar-icon');
  if (event.iconId) return iconSvg(event.iconId, 'calendar-icon');
  const type = `${event.type || ''}`.toLowerCase();
  if (type.includes('plant')) return iconSvg('icon-seedling', 'calendar-icon');
  if (type.includes('fert')) return iconSvg('icon-fertilizer', 'calendar-icon');
  if (type.includes('spray')) return iconSvg('icon-spray', 'calendar-icon');
  if (type.includes('harvest')) return iconSvg('icon-wheat', 'calendar-icon');
  return iconSvg('icon-calendar', 'calendar-icon');
}

function getWeatherLabelIcon(label) {
  const value = `${label || ''}`.toLowerCase();
  if (value.includes('temperature')) return iconSvg('icon-thermo', 'weather-mini-icon');
  if (value.includes('rain')) return iconSvg('icon-rain', 'weather-mini-icon');
  if (value.includes('wind')) return iconSvg('icon-wind', 'weather-mini-icon');
  return iconSvg('icon-weather', 'weather-mini-icon');
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  console.log('SmartGrow App Initializing...');
  fetchAllData();
  setInterval(refreshData, 30000); // Refresh every 30 seconds
});

// Navigation
function navigateTo(page) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  // Show selected screen
  const screen = document.getElementById(`screen-${page}`);
  if (screen) {
    screen.classList.add('active');
  }
  
  // Highlight nav item
  const navItem = document.getElementById(`nav-${page}`);
  if (navItem) {
    navItem.classList.add('active');
  }
  
  // Load page-specific data
  switch(page) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'fields':
      loadFieldsList();
      break;
    case 'irrigation':
      loadIrrigation();
      break;
    case 'weather':
      loadWeather();
      break;
    case 'pests':
      loadPests();
      break;
    case 'calendar':
      loadCalendar();
      break;
    case 'notifications':
      loadNotifications();
      break;
  }
}

// Fetch All Data
async function fetchAllData() {
  try {
    // Fetch fields
    const fieldsRes = await fetch(`${API_BASE_URL}/fields`);
    fieldsData = await fieldsRes.json();
    
    // Fetch crops
    const cropsRes = await fetch(`${API_BASE_URL}/crops`);
    cropsData = await cropsRes.json();
    
    // Fetch weather
    const weatherRes = await fetch(`${API_BASE_URL}/weather/all`);
    weatherData = await weatherRes.json();
    
    // Fetch calendar
    const calendarRes = await fetch(`${API_BASE_URL}/calendar/events`);
    calendarData = await calendarRes.json();
    
    // Fetch pests
    const pestsRes = await fetch(`${API_BASE_URL}/pest`);
    pestsData = await pestsRes.json();
    
    // Fetch notifications
    const notifRes = await fetch(`${API_BASE_URL}/notifications`);
    notificationsData = await notifRes.json();
    
    console.log('Data fetched successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
    loadMockData();
  }
}

// Load Mock Data (Fallback)
function loadMockData() {
  fieldsData = [
    { id: 'field-001', name: 'Field 01', location: 'Mashonaland East', hectares: 125, crops: ['Corn', 'Carrot', 'Potato'], ndvi: 0.62, humidity: 19, status: 'Active' },
    { id: 'field-002', name: 'Field 02', location: 'Goromonzi', hectares: 98, crops: ['Soybean'], ndvi: 0.74, humidity: 42, status: 'Irrigating' },
    { id: 'field-003', name: 'Field 03', location: 'Murewa', hectares: 64, crops: ['Wheat'], ndvi: 0.81, humidity: 35, status: 'Pre-harvest' }
  ];
}

// Refresh Data
async function refreshData() {
  console.log('Refreshing data...');
  await fetchAllData();
}

// DASHBOARD
function loadDashboard() {
  const dashboardRoot = document.getElementById('dashboardRoot');
  if (!dashboardRoot) return;

  const summaryCards = [
    {
      title: 'Total Crops',
      value: '12 Types',
      delta: '+2% from month',
      icon: 'icon-soy',
      tint: 'summary-green'
    },
    {
      title: 'Current Yield',
      value: '450 tons',
      delta: '+5.67% from last month',
      icon: 'icon-wheat',
      tint: 'summary-blue'
    },
    {
      title: 'Growth Status',
      value: '85%',
      delta: '-1.50% from last month',
      icon: 'icon-task',
      tint: 'summary-purple'
    },
    {
      title: 'Upcoming Harvests',
      value: 'Sep 15, 2024',
      delta: '15 days left until harvest',
      icon: 'icon-calendar',
      tint: 'summary-teal'
    }
  ].map(card => `
    <article class="summary-card ${card.tint}">
      <div class="summary-copy">
        <div class="summary-title">${card.title}</div>
        <div class="summary-value">${card.value}</div>
        <div class="summary-delta">${card.delta}</div>
      </div>
      <div class="summary-mark">${iconSvg(card.icon, 'summary-icon')}</div>
    </article>
  `).join('');

  const harvestLegend = [
    { label: 'Wasted', value: '30T', color: '#1fa65d' },
    { label: 'Planted', value: '200T', color: '#f2c21a' },
    { label: 'Collected', value: '170T', color: '#18a2db' }
  ].map(item => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${item.color}"></span>
      <div>
        <div class="legend-label">${item.label}</div>
        <div class="legend-value">${item.value}</div>
      </div>
    </div>
  `).join('');

  const linePoints = '40,192 120,148 200,148 280,108 360,108 440,96 520,96 600,48';
  const areaPoints = '40,192 120,148 200,148 280,108 360,108 440,96 520,96 600,48 600,220 40,220';

  const taskRows = [
    { name: 'Irrigation Check', assigned: 'Albert Flores', due: 'Tomorrow, 6:00 AM', status: 'Soon' },
    { name: 'Foliar Spray', assigned: 'Field Crew', due: '18 Jan, Morning', status: 'Planned' },
    { name: 'Harvest Block A', assigned: 'Farm Lead', due: '25 Jan, Full day', status: '14 Days' }
  ].map(row => `
    <div class="task-row">
      <div class="task-name">${row.name}</div>
      <div class="task-assignee">${row.assigned}</div>
      <div class="task-date">${row.due}</div>
      <div class="task-status"><span>${row.status}</span></div>
      <div class="task-actions">${iconSvg('icon-task', 'task-row-icon')}</div>
    </div>
  `).join('');

  dashboardRoot.innerHTML = `
    <div class="farm-dashboard">
      <header class="dashboard-topbar">
        <div class="dashboard-search-wrap">
          <button class="menu-btn" type="button" aria-label="Open menu">${iconSvg('icon-dashboard', 'menu-icon')}</button>
          <label class="dashboard-search" aria-label="Search">
            ${iconSvg('icon-fields', 'search-icon')}
            <input type="search" placeholder="Search something here...." aria-label="Search something here">
          </label>
        </div>

        <div class="dashboard-top-actions">
          <button class="icon-chip" type="button" aria-label="Notifications">
            ${iconSvg('icon-notifications', 'chip-icon')}
            <span class="status-dot"></span>
          </button>
          <button class="profile-chip" type="button" aria-label="User profile">
            <span class="profile-avatar">AF</span>
            <span class="profile-copy">
              <strong>Albert Flores</strong>
              <small>albert45@mail.com</small>
            </span>
            <span class="profile-caret">⌄</span>
          </button>
        </div>
      </header>

      <section class="dashboard-hero">
        <div>
          <h1>Good Morning !</h1>
          <p>Optimize Your Farm Operations with Real-Time Insights</p>
        </div>
        <div class="hero-actions">
          <div class="weather-chip">
            ${iconSvg('icon-weather', 'weather-chip-icon')}
            <span>24° Today is partly sunny day</span>
          </div>
          <button class="export-btn" type="button">Export ${iconSvg('icon-ai', 'export-icon')}</button>
        </div>
      </section>

      <section class="summary-grid">
        ${summaryCards}
      </section>

      <section class="dashboard-grid">
        <article class="dashboard-card harvest-card">
          <div class="card-head">
            <h3>Crop Harvest Summary</h3>
            <div class="card-filters">
              <button class="mini-select" type="button">Corn ▾</button>
              <button class="mini-select" type="button">2024 ▾</button>
            </div>
          </div>
          <div class="harvest-body">
            <div class="donut-chart">
              <div class="donut-ring"></div>
              <div class="donut-center">
                <span>450</span>
                <small>tons collected</small>
              </div>
            </div>
            <div class="legend-list">
              ${harvestLegend}
            </div>
          </div>
        </article>

        <article class="dashboard-card growth-card">
          <div class="card-head">
            <h3>Crop Growth Monitoring</h3>
            <div class="card-filters">
              <button class="mini-select" type="button">Corn ▾</button>
              <button class="mini-select" type="button">Days ▾</button>
            </div>
          </div>
          <div class="chart-shell">
            <svg viewBox="0 0 640 240" class="line-chart" role="img" aria-label="Crop growth chart">
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#35b86d" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="#35b86d" stop-opacity="0.04" />
                </linearGradient>
              </defs>
              <path d="M40 192 L120 148 L200 148 L280 108 L360 108 L440 96 L520 96 L600 48 L600 220 L40 220 Z" fill="url(#growthFill)" />
              <path d="M40 192 L120 148 L200 148 L280 108 L360 108 L440 96 L520 96 L600 48" fill="none" stroke="#2ea85e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="280" cy="108" r="10" fill="#2ea85e" opacity="0.16" />
              <circle cx="280" cy="108" r="5" fill="#2ea85e" />
              <text x="279" y="88" text-anchor="middle" class="chart-badge">Corn Field<br/>3.3cm</text>
              <line x1="280" y1="108" x2="280" y2="220" class="chart-guide" />
              <g class="chart-grid">
                <line x1="40" y1="48" x2="600" y2="48" />
                <line x1="40" y1="96" x2="600" y2="96" />
                <line x1="40" y1="144" x2="600" y2="144" />
                <line x1="40" y1="192" x2="600" y2="192" />
              </g>
              <g class="chart-axis">
                <text x="28" y="195">1cm</text>
                <text x="28" y="147">2cm</text>
                <text x="28" y="99">3cm</text>
                <text x="28" y="51">4cm</text>
                <text x="30" y="226">1day</text>
                <text x="110" y="226">2day</text>
                <text x="190" y="226">5day</text>
                <text x="270" y="226">6day</text>
                <text x="350" y="226">7day</text>
                <text x="430" y="226">8day</text>
                <text x="510" y="226">10day</text>
                <text x="590" y="226">11day</text>
              </g>
            </svg>
          </div>
        </article>

        <article class="dashboard-card metrics-card">
          <div class="card-head">
            <h3>Field Metrics Overview</h3>
          </div>
          <div class="gauge-shell">
            <div class="gauge-chart">
              <div class="gauge-track"></div>
              <div class="gauge-arc"></div>
              <div class="gauge-fill"></div>
              <div class="gauge-core">
                <span>PH Level + 5</span>
                <small>Temperature - 26°C<br/>Water Level - 1060 liters</small>
              </div>
            </div>
          </div>
          <div class="metric-legend">
            <span><i class="legend-dot water"></i>Water Level</span>
            <span><i class="legend-dot ph"></i>PH Level</span>
            <span><i class="legend-dot temp"></i>Temperature</span>
          </div>
        </article>
      </section>

      <section class="dashboard-card task-card">
        <div class="card-head">
          <h3>Task Management</h3>
          <div class="task-actions">
            <button class="primary-btn" type="button">Add New Task +</button>
            <button class="ghost-btn" type="button">View All ▸</button>
          </div>
        </div>
        <div class="task-table">
          <div class="task-row task-header">
            <div>Task Name</div>
            <div>Assigned To</div>
            <div>Due Date</div>
            <div>Status</div>
            <div></div>
          </div>
          ${taskRows}
        </div>
      </section>

      <nav class="mobile-tabbar" aria-label="Quick navigation">
        <button type="button" class="tab active"><span>${iconSvg('icon-dashboard', 'tab-icon')}</span><small>Dashboard</small></button>
        <button type="button" class="tab"><span>${iconSvg('icon-weather', 'tab-icon')}</span><small>Weather</small></button>
        <button type="button" class="tab"><span>${iconSvg('icon-irrigation', 'tab-icon')}</span><small>Soil & Water</small></button>
        <button type="button" class="tab"><span>${iconSvg('icon-settings', 'tab-icon')}</span><small>My Account</small></button>
      </nav>
    </div>
  `;
}

// FIELDS
function loadFieldsList() {
  const fieldsGrid = document.getElementById('fieldsGrid');
  fieldsGrid.innerHTML = fieldsData.map(field => `
    <div class="field-card" onclick="viewFieldDetail('${field.id}')">
      <div class="field-map-thumb" style="font-size: 48px;">
        ${field.iconId ? iconSvg(field.iconId, 'field-icon') : getCropIconMarkup(field.crops[0])}
      </div>
      <div class="field-info">
        <div class="field-info-name">${field.name} — ${field.location}</div>
        <div class="field-info-stats">
          <div class="field-info-stat"><span>${field.hectares}ha</span></div>
          <div class="field-info-stat">NDVI <span>${field.ndvi}</span></div>
          <div class="field-info-stat">${field.crops.join(', ')}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function viewFieldDetail(fieldId) {
  const field = fieldsData.find(f => f.id === fieldId);
  if (!field) return;
  
  document.getElementById('fieldTitle').textContent = `${field.name} — ${field.location}`;
  
  // Load stats
  const statsHTML = `
    <div class="stat-card">
      <div class="stat-card-label">Planted Area</div>
      <div class="stat-card-value">${field.hectares}</div>
      <div style="font-size: 11px; color: #6b7280;">hectares</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Current NDVI</div>
      <div class="stat-card-value">${field.ndvi}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Humidity</div>
      <div class="stat-card-value">${field.humidity}%</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Status</div>
      <div class="stat-card-value" style="font-size: 16px; color: #4a7c3f;">${field.status}</div>
    </div>
  `;
  document.getElementById('fieldStats').innerHTML = statsHTML;
  
  // Load crops
  const fieldCrops = cropsData.filter(c => c.fieldId === fieldId);
  const cropsHTML = fieldCrops.map(crop => `
    <div style="background: #f9f9f7; border-radius: 10px; padding: 10px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
      ${getCropIconMarkup(crop)}
      <div>
        <div style="font-size: 12px; font-weight: 700;">${crop.name}</div>
        <div style="font-size: 10px; color: #6b7280;">${crop.variety} · ${crop.yield}</div>
      </div>
    </div>
  `).join('');
  document.getElementById('fieldCrops').innerHTML = cropsHTML;
  
  // Load NPK data
  const npkHTML = `
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="font-size: 12px; font-weight: 600;">Nitrogen (N)</span>
        <span style="font-size: 11px; color: #6b7280;">48/100</span>
      </div>
      <div style="height: 6px; background: #f0f0ec; border-radius: 99px; overflow: hidden;">
        <div style="width: 48%; height: 100%; background: #4a7c3f; border-radius: 99px;"></div>
      </div>
    </div>
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="font-size: 12px; font-weight: 600;">Phosphorus (P)</span>
        <span style="font-size: 11px; color: #6b7280; display: flex; align-items: center; gap: 4px;">40/100 ${iconSvg('icon-alert', 'task-mini-icon')}</span>
      </div>
      <div style="height: 6px; background: #f0f0ec; border-radius: 99px; overflow: hidden;">
        <div style="width: 40%; height: 100%; background: #378add; border-radius: 99px;"></div>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="font-size: 12px; font-weight: 600;">Potassium (K)</span>
        <span style="font-size: 11px; color: #6b7280;">55/100</span>
      </div>
      <div style="height: 6px; background: #f0f0ec; border-radius: 99px; overflow: hidden;">
        <div style="width: 55%; height: 100%; background: #c8e64a; border-radius: 99px;"></div>
      </div>
    </div>
    <div style="background: #fff8e8; border-radius: 8px; padding: 8px; margin-top: 10px; border: 1px solid #f0e0a0; font-size: 11px; color: #856404;">
      <div style="display: flex; align-items: center; gap: 6px;">${iconSvg('icon-alert', 'task-mini-icon')}<span>Low phosphorus detected. Apply DAP within 5 days.</span></div>
    </div>
  `;
  document.getElementById('fieldNPK').innerHTML = npkHTML;
  
  // Load metrics
  const metricsHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
      <div style="background: #f0f8ec; border-radius: 10px; padding: 12px; border: 1px solid #c8e8b0;">
        <div style="font-size: 11px; color: #4a7c3f; font-weight: 600; text-transform: uppercase;">LAI (Leaf Area)</div>
        <div style="font-size: 20px; font-weight: 800; color: #2a6020; margin-top: 4px;">~0.7</div>
        <div style="font-size: 10px; color: #4a7c3f; margin-top: 2px;">Week 1 · Low canopy</div>
      </div>
      <div style="background: #e6f0fb; border-radius: 10px; padding: 12px; border: 1px solid #b0d0f0;">
        <div style="font-size: 11px; color: #185fa5; font-weight: 600; text-transform: uppercase;">Optimal Zone</div>
        <div style="font-size: 20px; font-weight: 800; color: #0c447c; margin-top: 4px;">64%</div>
        <div style="font-size: 10px; color: #185fa5; margin-top: 2px;">For cultivation</div>
      </div>
    </div>
  `;
  document.getElementById('fieldMetrics').innerHTML = metricsHTML;
  
  navigateTo('field-detail');
}

// IRRIGATION
async function loadIrrigation() {
  const statusHTML = `
    <div class="irrigation-item">
      ${getCropIconMarkup('Corn')}
      <div class="irrigation-item-name">Field 01 — Corn/Carrot</div>
      <div class="irrigation-bar">
        <div class="irrigation-fill" style="width: 62%;"></div>
      </div>
      <div class="irrigation-percent">62%</div>
      <div class="status-badge">OK</div>
    </div>
    <div class="irrigation-item">
      ${getCropIconMarkup('Soybean')}
      <div class="irrigation-item-name">Field 02 — Soybean</div>
      <div class="irrigation-bar">
        <div class="irrigation-fill" style="width: 38%; background: #ffc107;"></div>
      </div>
      <div class="irrigation-percent" style="color: #856404;">38%</div>
      <div class="status-badge" style="background: #fff3cd; color: #856404;">LOW</div>
    </div>
    <div class="irrigation-item">
      ${getCropIconMarkup('Wheat')}
      <div class="irrigation-item-name">Field 03 — Wheat (pre-harvest)</div>
      <div class="irrigation-bar">
        <div class="irrigation-fill" style="width: 80%;"></div>
      </div>
      <div class="irrigation-percent">80%</div>
      <div class="status-badge">GOOD</div>
    </div>
  `;
  document.getElementById('irrigationStatus').innerHTML = statusHTML;
}

// WEATHER
async function loadWeather() {
  if (!weatherData.current) return;
  
  const currentHTML = `
    <div class="weather-card">
      <div class="weather-label">${getWeatherLabelIcon('Temperature')}<span>Temperature</span></div>
      <div class="weather-big">${weatherData.current.temperature}°C</div>
      <div class="weather-sub">Feels like ${weatherData.current.feelsLike}°C · ${weatherData.current.condition}</div>
    </div>
    <div class="weather-card">
      <div class="weather-label">${getWeatherLabelIcon('Rainfall')}<span>Rainfall (week)</span></div>
      <div class="weather-big">${weatherData.current.rainfall}mm</div>
      <div class="weather-sub">Above average for Jan</div>
    </div>
    <div class="weather-card">
      <div class="weather-label">${getWeatherLabelIcon('Wind speed')}<span>Wind speed</span></div>
      <div class="weather-big">${weatherData.current.wind}km/h</div>
      <div class="weather-sub">NE direction · Moderate</div>
    </div>
  `;
  document.getElementById('weatherCurrent').innerHTML = currentHTML;
  
  const forecastHTML = weatherData.forecast.map(day => `
    <div class="forecast-day">
      <div class="forecast-day-name">${day.day}</div>
      ${getWeatherIconMarkup(day)}
      <div class="forecast-temp">${day.temp}°</div>
      <div class="forecast-rain">${day.rain}mm</div>
    </div>
  `).join('');
  document.getElementById('weatherForecast').innerHTML = forecastHTML;
}

// PESTS
function loadPests() {
  const pestHTML = pestsData.map(pest => `
    <div class="pest-card">
      ${getPestIconMarkup(pest)}
      <div class="pest-name">${pest.name}</div>
      <div class="pest-risk risk-${pest.risk.toLowerCase()}">${pest.risk} Risk</div>
      <div class="pest-desc">${pest.description}</div>
    </div>
  `).join('');
  document.getElementById('pestList').innerHTML = pestHTML;
}

// CALENDAR
function loadCalendar() {
  // Generate calendar grid for January 2025
  const firstDay = new Date(2025, 0, 1).getDay();
  const daysInMonth = 31;
  let calendarHTML = '';
  
  // Day headers
  const dayHeaders = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  dayHeaders.forEach(day => {
    calendarHTML += `<div class="cal-day-header">${day}</div>`;
  });
  
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += '<div class="cal-day other-month"></div>';
  }
  
  // Days of month
  const eventDates = calendarData.map(e => new Date(e.date).getDate());
  for (let day = 1; day <= daysInMonth; day++) {
    const hasEvent = eventDates.includes(day);
    const isToday = day === 15; // Assuming today is Jan 15
    calendarHTML += `
      <div class="cal-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">
        ${day}
      </div>
    `;
  }
  
  document.getElementById('calendarGrid').innerHTML = calendarHTML;
  
  // Events
  const eventsHTML = calendarData.map(event => `
    <div class="cal-event ${event.type}">
      <div class="cal-event-name">${getCalendarIconMarkup(event)}<span>${event.title}</span></div>
      <div class="cal-event-date">${new Date(event.date).toLocaleDateString()} · ${event.description}</div>
    </div>
  `).join('');
  document.getElementById('calendarEvents').innerHTML = eventsHTML;
}

// AI ADVISOR
function askAI(question) {
  document.getElementById('chatInput').value = question;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  
  const chatArea = document.getElementById('chatArea');
  
  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user-msg';
  userMsg.innerHTML = `<div class="chat-av user-av">TM</div><div class="chat-bubble user-bubble">${message}</div>`;
  chatArea.appendChild(userMsg);
  input.value = '';
  chatArea.scrollTop = chatArea.scrollHeight;
  
  // Get AI response
  try {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    
    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-msg';
      aiMsg.innerHTML = `<div class="chat-av ai-av">SG</div><div class="chat-bubble ai-bubble">${data.response}</div>`;
      chatArea.appendChild(aiMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 600);
  } catch (error) {
    console.error('Error getting AI response:', error);
  }
}

// NOTIFICATIONS
function loadNotifications() {
  const unreadCount = notificationsData.filter(n => !n.read).length;
  document.getElementById('notifSub').textContent = `${unreadCount} unread ${unreadCount === 1 ? 'alert' : 'alerts'}`;
  
  const notifHTML = notificationsData.map(notif => `
    <div class="notif-item ${notif.read ? '' : 'unread'} ${notif.severity === 'high' ? 'high' : ''}">
      ${getNotificationIconMarkup(notif)}
      <div class="notif-content">
        <div class="notif-title">${notif.title}</div>
        <div class="notif-message">${notif.message}</div>
        <div class="notif-time">${formatTime(notif.timestamp)}</div>
      </div>
    </div>
  `).join('');
  
  document.getElementById('notificationsList').innerHTML = notifHTML;
  
  // Update notification badge
  document.getElementById('notifBadge').textContent = unreadCount;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
  return `${Math.floor(diff / 86400000)} days ago`;
}

// Set initial view
navigateTo('dashboard');

(() => {
  const API_BASE_URL = 'http://localhost:5000/api';

  const state = {
    fields: [],
    crops: [],
    weather: null,
    pests: [],
    dashboard: null,
    irrigation: null,
    npkByField: new Map(),
    laiByField: new Map(),
    notifications: [],
    activeFieldId: null,
    selectedFieldKey: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  async function fetchJSON(path, options) {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    if (!response.ok) {
      throw new Error(`${path} failed with ${response.status}`);
    }
    return response.json();
  }

  function fieldLabel(field) {
    return `${field.name} — ${field.hectares}ha`;
  }

  function resolveField(value) {
    return state.fields.find(field => field.id === value || fieldLabel(field) === value || field.name === value) || null;
  }

  function iconSvg(symbol) {
    return `<svg class="pest-icon" aria-hidden="true"><use href="#${symbol}"></use></svg>`;
  }

  function showToast(message) {
    const toast = $('#toast');
    const toastMsg = $('#toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function setActiveNav(pageName) {
    $$('.nav-item').forEach(item => item.classList.remove('active'));
    const active = $$('.nav-item').find(item => item.getAttribute('onclick')?.includes(`showPage('${pageName}`));
    if (active) active.classList.add('active');
  }

  function showPage(pageName, el) {
    $$('.page').forEach(page => page.classList.remove('active'));
    const page = document.getElementById(`page-${pageName}`);
    if (page) page.classList.add('active');

    $$('.nav-item').forEach(item => item.classList.remove('active'));
    if (el) {
      el.classList.add('active');
    } else {
      setActiveNav(pageName);
    }

    if (pageName === 'dashboard') {
      animateYieldBars();
      populateDashboard();
    } else if (pageName === 'fields') {
      animateFieldBars();
      syncFieldDisplay(state.activeFieldId || (state.fields[0] && state.fields[0].id));
    } else if (pageName === 'climate') {
      populateClimate();
    } else if (pageName === 'pests') {
      populatePests();
    } else if (pageName === 'irrigation') {
      populateIrrigation();
    }
  }

  function animateYieldBars() {
    const bars = $$('#dashBars .mini-bar');
    if (!bars.length) return;
    requestAnimationFrame(() => {
      bars.forEach(bar => {
        bar.style.height = bar.dataset.h || bar.style.height || '50%';
      });
    });
  }

  function animateFieldBars() {
    const field = resolveField(state.activeFieldId || state.selectedFieldKey);
    if (!field) return;
    const npk = state.npkByField.get(field.id);
    if (!npk) return;
    setTimeout(() => animateBar('nBar', npk.nitrogen.score), 80);
    setTimeout(() => animateBar('pBar', npk.phosphorus.score), 120);
    setTimeout(() => animateBar('kBar', npk.potassium.score), 160);
  }

  function animateBar(id, pct) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.width = '0';
    requestAnimationFrame(() => {
      el.style.width = `${pct}%`;
    });
  }

  async function loadState() {
    const [fields, crops, weather, pests, dashboard, irrigation, notifications] = await Promise.all([
      fetchJSON('/fields'),
      fetchJSON('/crops'),
      fetchJSON('/weather/all'),
      fetchJSON('/pest'),
      fetchJSON('/dashboard'),
      fetchJSON('/irrigation/status'),
      fetchJSON('/notifications')
    ]);

    state.fields = fields;
    state.crops = crops;
    state.weather = weather;
    state.pests = pests;
    state.dashboard = dashboard;
    state.irrigation = irrigation;
    state.notifications = notifications;
    state.activeFieldId = fields[0]?.id || null;
    state.selectedFieldKey = fieldLabel(fields[0]);

    await Promise.all(fields.map(async field => {
      const [stats, npk, lai] = await Promise.all([
        fetchJSON(`/fields/${field.id}/stats`).catch(() => null),
        fetchJSON(`/npk/field/${field.id}`).catch(() => null),
        fetchJSON(`/npk/lai/field/${field.id}`).catch(() => null)
      ]);
      if (stats) {
        state.npkByField.set(field.id, npk);
      }
      if (npk) {
        state.npkByField.set(field.id, npk);
      }
      if (lai) {
        state.laiByField.set(field.id, lai);
      }
    }));
  }

  function populateFieldSelect() {
    const select = $('#fieldSelect');
    if (!select || !state.fields.length) return;

    select.innerHTML = state.fields
      .map(field => `<option value="${field.id}">${fieldLabel(field)}</option>`)
      .join('');

    const selected = state.activeFieldId || state.fields[0].id;
    select.value = selected;
    state.selectedFieldKey = selected;
  }

  function syncFieldDisplay(fieldValue) {
    const field = resolveField(fieldValue);
    if (!field) return;

    state.activeFieldId = field.id;
    state.selectedFieldKey = field.id;

    const npk = state.npkByField.get(field.id);
    const lai = state.laiByField.get(field.id);
    const fieldCrops = state.crops.filter(crop => crop.fieldId === field.id);

    const plantedArea = $('#plantedArea');
    const ndviVal = $('#ndviVal');
    const humidityVal = $('#humidityVal');
    const zonePct = $('#zonePct');
    const cornYield = $('#cornYield');
    const potatoYield = $('#potatoYield');
    const carrotYield = $('#carrotYield');
    const nVal = $('#nVal');
    const pVal = $('#pVal');
    const kVal = $('#kVal');
    const nBar = $('#nBar');
    const pBar = $('#pBar');
    const kBar = $('#kBar');
    if (plantedArea) plantedArea.innerHTML = `${field.hectares}<span style="font-size:14px;font-weight:500">ha</span>`;
    if (ndviVal) ndviVal.textContent = field.ndvi.toFixed(2);
    if (humidityVal) humidityVal.innerHTML = `${field.humidity}<span style="font-size:14px;font-weight:500">%</span>`;
    if (zonePct) zonePct.innerHTML = `${field.optimalZone}<span>%</span>`;

    const cropTotals = fieldCrops.reduce((acc, crop) => {
      const name = crop.name.toLowerCase();
      const yieldValue = Number(String(crop.yield || '0').replace(/[^\d.]/g, '')) || 0;
      if (name.includes('corn') || name.includes('maize')) acc.corn += yieldValue;
      if (name.includes('potato')) acc.potato += yieldValue;
      if (name.includes('carrot')) acc.carrot += yieldValue;
      return acc;
    }, { corn: 0, potato: 0, carrot: 0 });

    if (cornYield) cornYield.textContent = `${cropTotals.corn || 0} t`;
    if (potatoYield) potatoYield.textContent = `${cropTotals.potato || 0} t`;
    if (carrotYield) carrotYield.textContent = `${cropTotals.carrot || 0} t`;

    if (npk) {
      if (nVal) nVal.textContent = `${npk.nitrogen.score}/${npk.nitrogen.max}`;
      if (pVal) pVal.textContent = `${npk.phosphorus.score}/${npk.phosphorus.max}`;
      if (kVal) kVal.textContent = `${npk.potassium.score}/${npk.potassium.max}`;
      if (nBar) nBar.style.width = `${npk.nitrogen.score}%`;
      if (pBar) pBar.style.width = `${npk.phosphorus.score}%`;
      if (kBar) kBar.style.width = `${npk.potassium.score}%`;

      const rec = $('#fieldNPK div[style*="background: #fff8e8"]');
      if (rec) {
        rec.innerHTML = `<div style="display: flex; align-items: center; gap: 6px;">${iconSvg('icon-alert')}<span>${npk.phosphorus.recommendation}</span></div>`;
      }
    }

    const laiCard = $('#page-fields .lai-card .lai-val');
    const laiSub = $('#page-fields .lai-card .lai-sub');
    if (lai && laiCard) {
      laiCard.textContent = `~${lai.value}`;
      if (laiSub) laiSub.textContent = `Week ${lai.week} · ${lai.status}`;
    }

    const select = $('#fieldSelect');
    if (select && select.value !== field.id) {
      select.value = field.id;
    }
  }

  function populateDashboard() {
    const dashboardPage = $('#page-dashboard');
    if (!dashboardPage || !state.dashboard) return;

    const cards = $$('.dash-card', dashboardPage);
    const totals = [
      { label: 'Total farmland', value: `${state.dashboard.totalHectares}<span style="font-size:16px;font-weight:500">ha</span>`, sub: `${state.fields.length} active fields`, change: `↑ ${state.dashboard.totalHectares - 207}ha from last season` },
      { label: 'Avg NDVI', value: state.dashboard.avgNDVI.toFixed(2), sub: 'Good crop health', change: `↑ ${(state.dashboard.avgNDVI - 0.6).toFixed(2)} vs last month` },
      { label: 'Pest alerts', value: `${state.dashboard.activeAlerts}`, sub: 'FAW · Low risk', change: `↑ ${state.dashboard.activeAlerts - 1} new this week` },
      { label: 'Rainfall (mm)', value: state.weather?.current?.rainfall || 0, sub: 'Above average season', change: `↑ 28mm vs avg` }
    ];

    totals.forEach((item, index) => {
      const card = cards[index];
      if (!card) return;
      const label = $('.dc-label', card);
      const value = $('.dc-val', card);
      const sub = $('.dc-sub', card);
      const change = $('.dc-change', card);
      if (label) label.textContent = item.label;
      if (value) value.innerHTML = item.value;
      if (sub) sub.textContent = item.sub;
      if (change) change.textContent = item.change;
    });

    const bars = $$('#dashBars .mini-bar');
    bars.forEach((bar, index) => {
      const heights = ['65%', '80%', '45%', '90%', '60%', '75%', '55%', '85%', '70%'];
      if (heights[index]) {
        bar.dataset.h = heights[index];
      }
    });
    animateYieldBars();

    const varietyRows = $$('.vtable tbody tr', dashboardPage);
    const cropMatches = [
      ['SC403', 'Maize', '8.2 t/ha', '96%', '110 days'],
      ['SC627', 'Maize', '9.1 t/ha', '91%', '130 days'],
      ['SB101', 'Soybean', '3.8 t/ha', '88%', '95 days'],
      ['WH300', 'Wheat', '6.4 t/ha', '83%', '120 days']
    ];
    varietyRows.forEach((row, index) => {
      const cells = $$('td', row);
      const spec = cropMatches[index];
      if (!cells.length || !spec) return;
      cells[0].textContent = spec[0];
      cells[1].innerHTML = `<span class="crop-tag">${spec[1]}</span>`;
      cells[2].textContent = spec[2];
      cells[3].innerHTML = `<div class="match-bar"><div class="match-fill" style="width:${spec[3]}"></div></div>${spec[3]}`;
      cells[4].textContent = spec[4];
    });
  }

  function populateClimate() {
    const climatePage = $('#page-climate');
    if (!climatePage || !state.weather) return;
    const cards = $$('.dash-card', climatePage);
    const forecast = state.weather.forecast || [];
    const values = [
      { value: `${state.weather.current.rainfall}<span style="font-size:14px">mm</span>`, change: `↑ 28mm vs avg` },
      { value: `${state.weather.current.temperature}<span style="font-size:14px">°C</span>`, sub: 'Optimal growing' },
      { value: 'Low', change: 'No alerts active' }
    ];

    values.forEach((item, index) => {
      const card = cards[index];
      if (!card) return;
      const value = $('.dc-val', card);
      const sub = $('.dc-sub', card);
      const change = $('.dc-change', card);
      if (item.value && value) value.innerHTML = item.value;
      if (item.sub && sub) sub.textContent = item.sub;
      if (item.change && change) change.textContent = item.change;
    });

    const forecastContainer = $('.dash-card.full > div[style*="grid-template-columns"]', climatePage);
    if (forecastContainer) {
      forecastContainer.innerHTML = forecast.forecast.slice(0, 7).map(day => `
        <div style="text-align:center;background:#f0ede6;border-radius:10px;padding:10px 6px">
          <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:6px">${day.day}</div>
          <div style="font-size:20px;margin-bottom:4px">${day.icon}</div>
          <div style="font-size:13px;font-weight:700;color:var(--text)">${day.temp}°</div>
          <div style="font-size:10px;color:#185fa5">${day.rain}mm</div>
        </div>
      `).join('');
    }
  }

  function populatePests() {
    const pestPage = $('#page-pests');
    if (!pestPage || !state.pests.length) return;
    const grid = $('.pest-grid', pestPage);
    if (!grid) return;

    grid.innerHTML = state.pests.map(pest => {
      const riskClass = `risk-${pest.risk.toLowerCase()}`;
      return `
        <div class="pest-card" tabindex="0" role="button" data-pest="${pest.name}">
          <div class="pest-header">
            <span class="pest-name">${pest.name}</span>
            <span class="pest-risk ${riskClass}">${pest.risk} risk</span>
          </div>
          <div class="pest-desc">${pest.description}</div>
          <div class="pest-treatment">Treatment: ${pest.treatment}</div>
        </div>
      `;
    }).join('');

    $$('.pest-card', grid).forEach(card => {
      card.addEventListener('click', () => {
        const pest = card.getAttribute('data-pest');
        const item = state.pests.find(entry => entry.name === pest);
        showToast(item ? `${item.name}: ${item.treatment}` : 'Pest details opened');
      });
    });
  }

  function populateIrrigation() {
    const irrigationPage = $('#page-irrigation');
    if (!irrigationPage || !state.irrigation) return;
    const cards = $$('.dash-card', irrigationPage);
    const rows = $('table tbody', irrigationPage);

    const values = [
      { value: `${state.irrigation.totalUsedToday.toLocaleString()}<span style="font-size:14px">L</span>", change: '↓ 12% vs yesterday' },
      { value: '3 / 6', sub: '3 zones idle' },
      { value: `${state.irrigation.averageMoisture}<span style="font-size:14px">%</span>", change: 'Below 50% threshold' }
    ];

    values.forEach((item, index) => {
      const card = cards[index];
      if (!card) return;
      const value = $('.dc-val', card);
      const sub = $('.dc-sub', card);
      const change = $('.dc-change', card);
      if (value && item.value) value.innerHTML = item.value;
      if (sub && item.sub) sub.textContent = item.sub;
      if (change && item.change) change.textContent = item.change;
    });

    if (rows) {
      const fieldRows = state.fields.map(field => {
        const cropName = field.crops.join('/');
        const moisture = field.humidity;
        const status = moisture < 40 ? 'Needed' : moisture < 55 ? 'Active' : 'Good';
        const riskClass = moisture < 40 ? 'risk-high' : 'risk-low';
        return `
          <tr>
            <td style="font-weight:600">${field.name}</td>
            <td>${cropName}</td>
            <td>${moisture}%</td>
            <td>Auto</td>
            <td><span class="pest-risk ${riskClass}">${status}</span></td>
            <td><button class="action-btn" type="button">${moisture < 40 ? 'Start' : 'Schedule'}</button></td>
          </tr>
        `;
      }).join('');
      rows.innerHTML = fieldRows;
    }
  }

  function populateNotificationsBadge() {
    const badge = $('.badge');
    if (!badge) return;
    const unread = state.notifications.filter(notification => !notification.read).length;
    badge.textContent = String(unread);
  }

  async function addCrop() {
    const modal = $('#addCropModal');
    if (!modal) return;

    const inputs = $$('select, input', modal);
    const cropType = inputs[0]?.value || 'Maize';
    const variety = inputs[1]?.value || 'SC403 Premium';
    const plantingDate = inputs[2]?.value || new Date().toISOString().slice(0, 10);
    const area = Number(inputs[3]?.value || 0);
    const field = resolveField(state.activeFieldId || state.fields[0]?.id);

    if (!field) {
      showToast('No field selected');
      return;
    }

    await fetchJSON('/crops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cropType,
        variety,
        fieldId: field.id,
        yield: `${Math.max(area * 10, 1)}t`,
        plantingDate,
        area
      })
    });

    modal.classList.remove('open');
    showToast(`${cropType} added to ${field.name}`);
    await refreshAll();
    syncFieldDisplay(field.id);
  }

  function toggleTask(el) {
    if (!el) return;
    el.classList.toggle('done');
    el.textContent = el.classList.contains('done') ? '✓' : '';
    showToast(el.classList.contains('done') ? 'Task marked complete' : 'Task reopened');
  }

  function selectCrop(name) {
    const field = resolveField(state.activeFieldId || state.fields[0]?.id);
    const crop = state.crops.find(entry => entry.name.toLowerCase() === name.toLowerCase() && (!field || entry.fieldId === field.id));
    showToast(crop ? `${crop.name} · ${crop.variety}` : `Viewing ${name} details`);
  }

  function setNPKTab(tab, el) {
    $$('.pill').forEach(button => {
      button.classList.remove('on');
      button.classList.add('off');
    });
    if (el) {
      el.classList.add('on');
      el.classList.remove('off');
    }
    if (tab === 'record') {
      showToast('Record mode ready for new soil readings');
    }
  }

  async function refreshAll() {
    try {
      await loadState();
      populateFieldSelect();
      populateDashboard();
      populateClimate();
      populatePests();
      populateIrrigation();
      populateNotificationsBadge();
      syncFieldDisplay(state.activeFieldId);
    } catch (error) {
      console.error('SmartGrow enhancement bootstrap failed:', error);
      showToast('SmartGrow data could not be refreshed');
    }
  }

  function bindEvents() {
    const select = $('#fieldSelect');
    if (select) {
      select.addEventListener('change', event => {
        state.activeFieldId = event.target.value;
        syncFieldDisplay(event.target.value);
      });
    }

    const uploadArea = $('.upload-area');
    if (uploadArea) {
      uploadArea.addEventListener('click', () => showToast('AI scan started for crop image detection'));
    }
  }

  async function bootstrap() {
    window.showToast = showToast;
    window.showPage = showPage;
    window.changeField = value => {
      state.activeFieldId = value;
      syncFieldDisplay(value);
      showToast(`Field data updated: ${resolveField(value)?.name || value}`);
    };
    window.addCrop = addCrop;
    window.toggleTask = toggleTask;
    window.selectCrop = selectCrop;
    window.setNPKTab = setNPKTab;

    bindEvents();
    await refreshAll();
    showPage('fields');
    setInterval(refreshAll, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();

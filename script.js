// ═══════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════
const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DAYS_FR = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

const PILIERS = [
  { id: "coulisses", label: "Coulisses", color: "#ffd708", icon: "🎙️", desc: "Montrer l'envers du décor : préparation d'émissions, moments off, vie de la radio." },
  { id: "emissions", label: "Émissions", color: "#253367", icon: "📻", desc: "Promouvoir les programmes, teasers, replays, extraits marquants." },
  { id: "engager", label: "Engagement", color: "#34d399", icon: "💬", desc: "Sondages, questions, jeux, appels à participation pour créer de l'interaction." },
  { id: "territoire", label: "Territoire", color: "#f87171", icon: "📍", desc: "Mettre en avant les Ardennes, événements locaux, partenaires, acteurs du territoire." },
  { id: "autres", label: "Autres", color: "#9ca3af", icon: "📌", desc: "Contenus qui ne rentrent pas dans les autres piliers : actualités diverses, republications, contenus spontanés." },
];

const TEMPLATES = [
  { label: "Template Invité", icon: "🎤", desc: "Visuel d'annonce pour les invités à l'antenne" },
  { label: "Template Partenariat", icon: "🤝", desc: "Visuel de mise en avant des partenaires" },
  { label: "Template Jeu-concours", icon: "🎁", desc: "Visuel d'annonce pour les jeux-concours" },
];

const NAV = [
  { section: "Opérationnel", icon: "📋", items: [
    { id: "editorial", label: "Calendrier éditorial", icon: "calendar" },
    { id: "idees", label: "Idées de posts", icon: "bulb" },
    { id: "marronnier", label: "Calendrier marronnier", icon: "star" },
    { id: "emissions", label: "Planning émissions", icon: "radio" },
    { id: "jeux", label: "Jeux-concours", icon: "trophy" },
  ]},
  { section: "Stratégie & Analyse", icon: "📊", items: [
    { id: "strategie", label: "Stratégie & Piliers", icon: "target" },
    { id: "reporting", label: "Reporting mensuel", icon: "chart" },
  ]},
  { section: "Ressources", icon: "📦", items: [
    { id: "charte", label: "Charte graphique", icon: "palette" },
    { id: "templates", label: "Templates Canva", icon: "link" },
    { id: "taches", label: "Répartition tâches", icon: "users" },
  ]},
];

const ICONS = {
  calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  bulb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  radio: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>',
  trophy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  chart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  target: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  palette: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chevLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevRight: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
};

function icon(name) { return ICONS[name] || ''; }

// ═══════════════════════════════════════════════════
// STORAGE (localStorage)
// ═══════════════════════════════════════════════════
function loadData(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveData(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) { console.error("Save error:", e); }
}
const uid = () => Math.random().toString(36).slice(2, 9);

// ═══════════════════════════════════════════════════
// APP STATE
// ═══════════════════════════════════════════════════
let activeTab = 'accueil';

// ─── SIDEBAR NAV ───
function renderNav() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = `
    <div style="margin-bottom:8px;padding-top:4px">
      <button class="nav-btn ${activeTab === 'accueil' ? 'active' : ''}" data-tab="accueil">🏠&nbsp;&nbsp;Accueil</button>
    </div>
  ` + NAV.map(section => `
    <div style="margin-bottom:8px">
      <div class="nav-section-label">${section.section}</div>
      ${section.items.map(item => `
        <button class="nav-btn ${activeTab === item.id ? 'active' : ''}" data-tab="${item.id}">
          ${item.label}
        </button>
      `).join('')}
    </div>
  `).join('');
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      renderNav();
      renderPage();
      if (window.matchMedia('(max-width: 768px)').matches) {
        document.getElementById('sidebar').classList.add('closed');
      }
    });
  });
}

// ═══════════════════════════════════════════════════
// 0. ACCUEIL — Tableau de bord
// ═══════════════════════════════════════════════════
async function renderAccueil() {
  const el = document.getElementById('page-content');
  el.innerHTML = `<div class="empty-state">Chargement…</div>`;

  const [posts, ideas, membres] = await Promise.all([
    window.db.getPosts(),
    window.db.getIdees(),
    window.db.getMembres(),
  ]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const monthPosts = posts.filter(p => {
    const d = new Date(p.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const upcoming = posts
    .filter(p => p.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  const piliersById = Object.fromEntries(PILIERS.map(p => [p.id, p]));
  const platformIcons = { instagram: '📸', facebook: '📘', linkedin: '💼', tiktok: '🎵' };

  const quickLinks = [
    { id: 'editorial', icon: '📅', label: 'Calendrier éditorial' },
    { id: 'idees',     icon: '💡', label: 'Idées de posts' },
    { id: 'strategie', icon: '🎯', label: 'Stratégie & Piliers' },
    { id: 'charte',    icon: '🎨', label: 'Charte graphique' },
    { id: 'templates', icon: '🔗', label: 'Templates Canva' },
    { id: 'taches',    icon: '👥', label: 'Répartition des tâches' },
  ];

  el.innerHTML = `
    <div class="strategy-banner">
      <h3>👋 Bienvenue sur le Hub Communication</h3>
      <p>L'espace central de la communication Radio Bouton 90.6 FM : calendrier éditorial, idées, charte et ressources de l'équipe, réunis au même endroit.</p>
    </div>

    <div class="metrics-grid mb-28">
      <div class="metric-box"><div class="metric-icon">📅</div><div class="metric-value">${monthPosts.length}</div><div class="metric-label">Posts ce mois-ci</div></div>
      <div class="metric-box"><div class="metric-icon">⏳</div><div class="metric-value">${posts.filter(p => p.date >= todayStr).length}</div><div class="metric-label">Posts à venir</div></div>
      <div class="metric-box"><div class="metric-icon">💡</div><div class="metric-value">${ideas.length}</div><div class="metric-label">Idées en réserve</div></div>
      <div class="metric-box"><div class="metric-icon">👥</div><div class="metric-value">${membres.length}</div><div class="metric-label">Membres de l'équipe</div></div>
    </div>

    <h4 style="color:var(--blue);margin-bottom:12px">📌 Prochains posts</h4>
    <div class="mb-28">
      ${upcoming.length ? upcoming.map(p => {
        const pil = piliersById[p.pilier];
        return `<div class="idea-card mb-12" style="display:flex;align-items:center;gap:12px">
          <div style="font-size:22px">${platformIcons[p.platform] || '📱'}</div>
          <div style="flex:1">
            <div style="font-weight:700;color:var(--blue);font-size:14px">${esc(p.title)}</div>
            <div style="font-size:12px;color:var(--text-secondary)">${new Date(p.date).toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' })}${pil ? ' • ' + pil.icon + ' ' + esc(pil.label) : ''}</div>
          </div>
        </div>`;
      }).join('') : '<div class="empty-state">Aucun post programmé pour le moment. Direction le calendrier éditorial pour en planifier !</div>'}
    </div>

    <h4 style="color:var(--blue);margin-bottom:12px">🚀 Accès rapide</h4>
    <div class="ideas-grid">
      ${quickLinks.map(l => `
        <div class="template-card" data-goto="${l.id}" style="cursor:pointer;display:flex;align-items:center;gap:14px">
          <div style="font-size:28px">${l.icon}</div>
          <div style="font-weight:700;color:var(--blue);font-size:14px">${l.label}</div>
        </div>
      `).join('')}
    </div>
  `;

  el.querySelectorAll('[data-goto]').forEach(card => {
    card.addEventListener('click', () => {
      activeTab = card.dataset.goto;
      renderNav();
      renderPage();
    });
  });
}

function renderPage() {
  const item = NAV.flatMap(s => s.items).find(i => i.id === activeTab);
  document.getElementById('page-title').textContent = activeTab === 'accueil' ? 'Accueil' : (item?.label || '');
  const pages = {
    accueil: renderAccueil,
    editorial: renderEditorial,
    idees: renderIdees,
    marronnier: renderMarronnier,
    emissions: renderEmissions,
    jeux: renderJeux,
    strategie: renderStrategie,
    reporting: renderReporting,
    charte: renderCharte,
    templates: renderTemplates,
    taches: renderTaches,
  };
  (pages[activeTab] || renderAccueil)();
}

// ─── MENU TOGGLE ───
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('closed');
});

// ─── RESPONSIVE : fond cliquable mobile + sidebar fermée par défaut sur petit écran ───
(function setupResponsiveSidebar() {
  const app = document.getElementById('app');
  const sidebar = document.getElementById('sidebar');
  if (!app || !sidebar) return;
  if (!document.querySelector('.sidebar-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    app.appendChild(backdrop);
    backdrop.addEventListener('click', () => sidebar.classList.add('closed'));
  }
  if (window.matchMedia('(max-width: 768px)').matches) {
    sidebar.classList.add('closed');
  }

  // Le logo ramène à l'accueil
  const logoImg = document.querySelector('.sidebar-logo-img');
  if (logoImg) {
    logoImg.style.cursor = 'pointer';
    logoImg.title = "Retour à l'accueil";
    logoImg.addEventListener('click', () => {
      activeTab = 'accueil';
      renderNav();
      renderPage();
      if (window.matchMedia('(max-width: 768px)').matches) {
        sidebar.classList.add('closed');
      }
    });
  }
})();

// ═══════════════════════════════════════════════════
// MODAL HELPER
// ═══════════════════════════════════════════════════
function showModal(title, contentHTML, wide = false) {
  let overlay = document.getElementById('global-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-modal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <div class="modal-box ${wide ? 'wide' : ''}" id="modal-inner">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" id="modal-close-btn">${icon('x')}</button>
      </div>
      <div id="modal-body">${contentHTML}</div>
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-inner').addEventListener('click', e => e.stopPropagation());
}

function closeModal() {
  const overlay = document.getElementById('global-modal');
  if (overlay) overlay.classList.add('hidden');
}

// ═══════════════════════════════════════════════════
// FORM HELPERS
// ═══════════════════════════════════════════════════
function formGroup(label, inputHTML) {
  return `<div class="form-group">${label ? `<label>${label}</label>` : ''}${inputHTML}</div>`;
}
function inputField(label, id, val, placeholder='', type='text') {
  return formGroup(label, `<input type="${type}" id="${id}" value="${esc(val)}" placeholder="${esc(placeholder)}" />`);
}
function textareaField(label, id, val, placeholder='') {
  return formGroup(label, `<textarea id="${id}" placeholder="${esc(placeholder)}">${esc(val)}</textarea>`);
}
function selectField(label, id, options, selected) {
  return formGroup(label, `<select id="${id}">${options.map(o => `<option value="${esc(o.value)}" ${o.value === selected ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`);
}
function esc(s) { if (s == null) return ''; return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ═══════════════════════════════════════════════════
// 1. CALENDRIER ÉDITORIAL
// ═══════════════════════════════════════════════════
const editorialState = {
  posts: [],
  viewMode: 'month',
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  weekStart: (() => { const d = new Date(); const day = d.getDay(); const diff = d.getDate() - day + (day === 0 ? -6 : 1); return new Date(d.getFullYear(), d.getMonth(), diff); })(),
};

const statusColors = { todo: '#fde68a', scheduled: '#86efac', published: '#34d399' };
const statusLabels = { todo: 'À faire', scheduled: 'Programmé', published: 'Publié' };
const platformIcons = { instagram: '📸', facebook: '👍', linkedin: '💼' };

function savePosts() { saveData('rb-editorial-posts', editorialState.posts); }
function fmtDate(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

function postCardHTML(p, compact = false) {
  const pilier = PILIERS.find(pi => pi.id === p.pilier);
  const borderColor = pilier ? pilier.color : '#ccc';
  return `<div class="post-card ${compact ? 'compact' : ''}" style="background:${statusColors[p.status]||'#eee'};border-left:3px solid ${borderColor}" data-post-id="${p.id}">
    ${platformIcons[p.platform]||''} ${esc(p.title)}
    ${!compact && p.assignee ? `<div class="post-card-assignee">👤 ${esc(p.assignee)}</div>` : ''}
  </div>`;
}

function openPostModal(dateStr='', editPost=null) {
  const f = editPost || { title:'', date: dateStr, pilier:'coulisses', platform:'instagram', status:'todo', assignee:'', notes:'' };
  const isEdit = !!editPost;
  const html = `
    ${inputField('Titre du post','pm-title', f.title, 'Ex : Teaser émission du vendredi')}
    ${inputField('Date','pm-date', f.date, '', 'date')}
    <div class="form-row">
      ${selectField('Pilier','pm-pilier', PILIERS.map(p=>({value:p.id, label:`${p.icon} ${p.label}`})), f.pilier)}
      ${selectField('Plateforme','pm-platform', [{value:'instagram',label:'📸 Instagram'},{value:'facebook',label:'👍 Facebook'},{value:'linkedin',label:'💼 LinkedIn'}], f.platform)}
    </div>
    <div class="form-row">
      ${selectField('Statut','pm-status', Object.entries(statusLabels).map(([v,l])=>({value:v,label:l})), f.status)}
      ${inputField('Assigné à','pm-assignee', f.assignee, 'Prénom')}
    </div>
    ${textareaField('Notes / Légende','pm-notes', f.notes, 'Description, texte du post...')}
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
      ${isEdit ? `<button class="btn danger" id="pm-delete">${icon('trash')} Supprimer</button>` : ''}
      <button class="btn primary" id="pm-submit">${icon('check')} ${isEdit ? 'Enregistrer' : 'Ajouter'}</button>
    </div>
  `;
  showModal(isEdit ? 'Modifier le post' : 'Nouveau post', html);
  document.getElementById('pm-submit').addEventListener('click', async () => {
    const title = document.getElementById('pm-title').value.trim();
    if (!title) return;
    const data = {
      title, date: document.getElementById('pm-date').value,
      pilier: document.getElementById('pm-pilier').value, platform: document.getElementById('pm-platform').value,
      status: document.getElementById('pm-status').value, assignee: document.getElementById('pm-assignee').value,
      notes: document.getElementById('pm-notes').value,
    };
    if (isEdit) {
      await window.db.updatePost(editPost.id, data);
    } else {
      await window.db.createPost(data);
    }
    closeModal(); renderEditorial();
  });
  if (isEdit) {
    document.getElementById('pm-delete').addEventListener('click', async () => {
      await window.db.deletePost(editPost.id);
      closeModal(); renderEditorial();
    });
  }
}

async function renderEditorial() {
  editorialState.posts = await window.db.getPosts();
  const s = editorialState;
  const todoPosts = s.posts.filter(p => p.status === 'todo');
  const scheduledPosts = s.posts.filter(p => p.status === 'scheduled');

  let calendarHTML = '';
  if (s.viewMode === 'month') {
    const firstDay = new Date(s.year, s.month, 1).getDay();
    const daysInMonth = new Date(s.year, s.month + 1, 0).getDate();
    const offset = (firstDay + 6) % 7;
    const todayStr = fmtDate(new Date());
    calendarHTML = '<div class="calendar-grid">';
    calendarHTML += DAYS_FR.map(d => `<div class="calendar-header-cell">${d}</div>`).join('');
    for (let i = 0; i < offset; i++) calendarHTML += '<div class="calendar-cell empty"></div>';
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${s.year}-${String(s.month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const dayPosts = s.posts.filter(p => p.date === dateStr);
      const isToday = dateStr === todayStr;
      calendarHTML += `<div class="calendar-cell ${isToday?'today':''}" data-date="${dateStr}">
        <div class="day-number">${day}</div>
        ${dayPosts.slice(0,3).map(p => postCardHTML(p, true)).join('')}
        ${dayPosts.length > 3 ? `<div style="font-size:9px;color:var(--text-secondary)">+${dayPosts.length-3}</div>` : ''}
      </div>`;
    }
    calendarHTML += '</div>';
  } else {
    const days = [];
    for (let i = 0; i < 7; i++) { const d = new Date(s.weekStart); d.setDate(d.getDate()+i); days.push(d); }
    const todayStr = fmtDate(new Date());
    const weekLabel = `${days[0].getDate()} ${MONTHS_FR[days[0].getMonth()].slice(0,3)} — ${days[6].getDate()} ${MONTHS_FR[days[6].getMonth()].slice(0,3)} ${days[6].getFullYear()}`;
    // update nav label
    calendarHTML = `<div class="week-grid">${days.map(d => {
      const dateStr = fmtDate(d);
      const dayPosts = s.posts.filter(p => p.date === dateStr);
      const isToday = dateStr === todayStr;
      const dayName = DAYS_FR[d.getDay()===0?6:d.getDay()-1];
      return `<div class="week-cell ${isToday?'today':''}" data-date="${dateStr}">
        <div class="week-day-name">${dayName}</div>
        <div class="week-day-num" style="color:${isToday?'var(--blue)':'var(--text-secondary)'}">${d.getDate()}</div>
        ${dayPosts.map(p => postCardHTML(p)).join('')}
      </div>`;
    }).join('')}</div>`;
  }

  // Nav bar
  let navLabel = '';
  if (s.viewMode === 'month') {
    navLabel = `<button class="nav-arrow" id="ed-prev">${icon('chevLeft')}</button>
      <h3 style="margin:0;color:var(--blue);min-width:160px;text-align:center;font-size:15px">${MONTHS_FR[s.month]} ${s.year}</h3>
      <button class="nav-arrow" id="ed-next">${icon('chevRight')}</button>`;
  } else {
    const days = [];
    for (let i=0;i<7;i++){const d=new Date(s.weekStart);d.setDate(d.getDate()+i);days.push(d);}
    const wl = `${days[0].getDate()} ${MONTHS_FR[days[0].getMonth()].slice(0,3)} — ${days[6].getDate()} ${MONTHS_FR[days[6].getMonth()].slice(0,3)} ${days[6].getFullYear()}`;
    navLabel = `<button class="nav-arrow" id="ed-prev">${icon('chevLeft')}</button>
      <h3 style="margin:0;color:var(--blue);font-size:15px;min-width:200px;text-align:center">${wl}</h3>
      <button class="nav-arrow" id="ed-next">${icon('chevRight')}</button>`;
  }

  document.getElementById('page-content').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div class="flex-center gap-8">
        <div class="view-toggle">
          <button class="${s.viewMode==='month'?'active':''}" data-view="month">Mois</button>
          <button class="${s.viewMode==='week'?'active':''}" data-view="week">Semaine</button>
        </div>
        <div class="flex-center gap-8">${navLabel}</div>
      </div>
      <button class="btn primary" id="ed-new">${icon('plus')} Nouveau post</button>
    </div>
    <div class="status-legend">
      ${Object.entries(statusLabels).map(([k,v]) => `<div class="flex-center gap-4" style="font-size:11px;color:var(--text-secondary)"><span class="status-dot" style="background:${statusColors[k]}"></span> ${v}</div>`).join('')}
    </div>
    <div class="task-boards">
      <div class="task-board todo">
        <h4>📝 À faire <span class="badge" style="background:#fde68a;color:#92400e">${todoPosts.length}</span></h4>
        ${todoPosts.length===0?'<div style="font-size:11px;color:var(--text-secondary)">Aucune tâche en attente</div>':''}
        ${todoPosts.map(p=>postCardHTML(p)).join('')}
      </div>
      <div class="task-board scheduled">
        <h4>✅ Programmé <span class="badge" style="background:#a7f3d0;color:#065f46">${scheduledPosts.length}</span></h4>
        ${scheduledPosts.length===0?'<div style="font-size:11px;color:var(--text-secondary)">Aucun post programmé</div>':''}
        ${scheduledPosts.map(p=>postCardHTML(p)).join('')}
      </div>
    </div>
    ${calendarHTML}
  `;

  // Events
  document.querySelectorAll('.view-toggle button').forEach(btn => {
    btn.addEventListener('click', () => { s.viewMode = btn.dataset.view; renderEditorial(); });
  });
  document.getElementById('ed-prev')?.addEventListener('click', () => {
    if (s.viewMode==='month') { if(s.month===0){s.month=11;s.year--;}else s.month--; }
    else { const d=new Date(s.weekStart);d.setDate(d.getDate()-7);s.weekStart=d; }
    renderEditorial();
  });
  document.getElementById('ed-next')?.addEventListener('click', () => {
    if (s.viewMode==='month') { if(s.month===11){s.month=0;s.year++;}else s.month++; }
    else { const d=new Date(s.weekStart);d.setDate(d.getDate()+7);s.weekStart=d; }
    renderEditorial();
  });
  document.getElementById('ed-new')?.addEventListener('click', () => openPostModal());
  document.querySelectorAll('.calendar-cell:not(.empty), .week-cell').forEach(cell => {
    cell.addEventListener('click', e => {
      if (e.target.closest('.post-card')) return;
      openPostModal(cell.dataset.date);
    });
  });
  document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      const post = s.posts.find(p => p.id === card.dataset.postId);
      if (post) openPostModal('', post);
    });
  });
}

// ═══════════════════════════════════════════════════
// 2. IDÉES DE POSTS
// ═══════════════════════════════════════════════════
async function renderIdees() {
  const ideas = await window.db.getIdees();
  const priorityColors = { high: '#fecaca', medium: '#fef3c7', low: '#d1fae5' };
  const priorityLabels = { high: '🔴 Urgent', medium: '🟡 Normal', low: '🟢 Optionnel' };

  document.getElementById('page-content').innerHTML = `
    <div class="flex-between mb-20">
      <p style="margin:0;color:var(--text-secondary);font-size:13px">Notez vos idées de posts ici pour ne rien oublier. Promouvez-les dans le calendrier quand elles sont prêtes.</p>
      <button class="btn primary" id="idea-new">${icon('plus')} Nouvelle idée</button>
    </div>
    <div class="ideas-grid">
      ${ideas.map(idea => {
        const pilier = PILIERS.find(p=>p.id===idea.pilier);
        return `<div class="idea-card" style="border-left:4px solid ${pilier?.color||'#ccc'}">
          <div class="flex-between" style="align-items:flex-start;margin-bottom:8px">
            <h4 style="margin:0;font-size:14px;color:var(--blue)">${esc(idea.title)}</h4>
            <span style="font-size:10px;padding:2px 8px;border-radius:12px;background:${priorityColors[idea.priority]};font-weight:600;white-space:nowrap">${priorityLabels[idea.priority]}</span>
          </div>
          ${idea.notes ? `<p style="font-size:12px;color:var(--text-secondary);margin:0 0 10px">${esc(idea.notes)}</p>` : ''}
          <div class="flex-between">
            <div class="flex-center gap-6">
              <span class="badge" style="background:var(--yellow);color:var(--blue)">${pilier?.icon||''} ${pilier?.label||''}</span>
              ${idea.author ? `<span class="badge" style="background:var(--bg);color:var(--text-secondary)">${esc(idea.author)}</span>` : ''}
            </div>
            <div class="flex-center gap-4">
              <button class="btn ghost small" data-promote="${idea.id}" style="font-size:11px">→ Planifier</button>
              <button class="icon-btn" data-del-idea="${idea.id}">${icon('trash')}</button>
            </div>
          </div>
        </div>`;
      }).join('')}
      ${ideas.length===0?'<div class="empty-state" style="grid-column:1/-1">Aucune idée pour l\'instant. Cliquez sur « Nouvelle idée » pour commencer 💡</div>':''}
    </div>
  `;

  document.getElementById('idea-new')?.addEventListener('click', () => {
    const html = `
      ${inputField("Titre de l'idée",'id-title','','Ex : Série portraits bénévoles')}
      <div class="form-row">
        ${selectField('Pilier','id-pilier', PILIERS.map(p=>({value:p.id,label:`${p.icon} ${p.label}`})),'coulisses')}
        ${selectField('Priorité','id-prio',[{value:'high',label:'🔴 Urgent'},{value:'medium',label:'🟡 Normal'},{value:'low',label:'🟢 Optionnel'}],'medium')}
      </div>
      ${inputField('Proposé par','id-author','','Ton prénom')}
      ${textareaField('Description / Notes','id-notes','','Décris l\'idée, le format, les hashtags possibles...')}
      <div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="btn primary" id="id-submit">${icon('check')} Ajouter</button></div>
    `;
    showModal('Nouvelle idée de post', html);
    document.getElementById('id-submit').addEventListener('click', async () => {
      const title = document.getElementById('id-title').value.trim();
      if (!title) return;
      await window.db.createIdee({
        title,
        pilier: document.getElementById('id-pilier').value,
        priority: document.getElementById('id-prio').value,
        author: document.getElementById('id-author').value,
        notes: document.getElementById('id-notes').value,
      });
      closeModal(); renderIdees();
    });
  });

  document.querySelectorAll('[data-del-idea]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await window.db.deleteIdee(btn.dataset.delIdea);
      renderIdees();
    });
  });
  document.querySelectorAll('[data-promote]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await window.db.deleteIdee(btn.dataset.promote);
      alert('💡 Idée promue ! Va dans le calendrier éditorial pour la planifier.');
      renderIdees();
    });
  });
}

// ═══════════════════════════════════════════════════
// 3. CALENDRIER MARRONNIER
// ═══════════════════════════════════════════════════
function renderPdfUploadZone(storageKey, fileData, title, iconEmoji) {
  const formatSize = (bytes) => bytes > 1048576 ? `${(bytes/1048576).toFixed(1)} Mo` : `${(bytes/1024).toFixed(0)} Ko`;

  if (fileData) {
    return `<div class="file-card">
      <div style="display:flex;align-items:center;gap:16px">
        <div class="file-icon" style="background:${fileData.type?.includes('zip')?'#fef3c7':'#fee2e2'}">${fileData.type?.includes('zip')?'📦':'📄'}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:15px;color:var(--blue)">${esc(fileData.name)}</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${formatSize(fileData.size)} • Ajouté le ${new Date(fileData.uploadedAt).toLocaleDateString('fr-FR')}</div>
        </div>
        <div class="flex-center gap-8">
          ${fileData.url ? `<a href="${fileData.url}" target="_blank" rel="noopener noreferrer" class="no-style"><button class="btn secondary small">${icon('download')} Télécharger</button></a>` : ''}
          <button class="btn danger small" data-remove-file="${storageKey}">${icon('trash')}</button>
        </div>
      </div>
      ${fileData.type==='application/pdf' && fileData.url ? `<div style="margin-top:16px;border-radius:10px;overflow:hidden;border:1px solid var(--border)"><iframe src="${fileData.url}" style="width:100%;height:500px;border:none" title="${esc(title)}"></iframe></div>` : ''}
      <div style="margin-top:12px;text-align:center">
        <button class="btn ghost small" data-replace-file="${storageKey}">${icon('edit')} Remplacer le fichier</button>
        <input type="file" accept=".pdf,.zip" data-file-input="${storageKey}" style="display:none" />
      </div>
    </div>`;
  }

  return `<div class="upload-zone" data-upload-zone="${storageKey}">
    <div style="font-size:42px;margin-bottom:12px">${iconEmoji}</div>
    <div style="font-weight:700;font-size:15px;color:var(--blue);margin-bottom:4px">Déposer un fichier</div>
    <div style="font-size:12px;color:var(--text-secondary)">Cliquez pour importer un PDF ou un ZIP</div>
    <input type="file" accept=".pdf,.zip" data-file-input="${storageKey}" style="display:none" />
  </div>`;
}

function bindFileHandlers(container, callback) {
  container.querySelectorAll('.upload-zone').forEach(zone => {
    zone.addEventListener('click', () => {
      zone.querySelector('input[type=file]').click();
    });
  });
  container.querySelectorAll('[data-replace-file]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.replaceFile;
      container.querySelector(`input[data-file-input="${key}"]`).click();
    });
  });
  container.querySelectorAll('[data-remove-file]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await window.db.removeFile(btn.dataset.removeFile);
      callback();
    });
  });
  container.querySelectorAll('input[data-file-input]').forEach(input => {
    input.addEventListener('change', async e => {
      const file = e.target.files?.[0];
      if (!file) return;
      await window.db.uploadFile(input.dataset.fileInput, file);
      callback();
    });
  });
}

async function renderMarronnier() {
  const el = document.getElementById('page-content');
  const fileData = await window.db.getFile('rb-marronnier-pdf');
  el.innerHTML = `
    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">Le calendrier des temps forts et fêtes de l'année. Importez votre PDF pour que toute l'équipe y ait accès.</p>
    ${renderPdfUploadZone('rb-marronnier-pdf', fileData, 'Calendrier marronnier', '📅')}
  `;
  bindFileHandlers(el, renderMarronnier);
}

// ═══════════════════════════════════════════════════
// 4-5. MONTHLY PDF (Émissions + Jeux)
// ═══════════════════════════════════════════════════
async function renderMonthlyPdf(prefix, title, description, iconEmoji, renderFn) {
  const selMonth = loadData(prefix+'-sel-month', new Date().getMonth());
  const selYear = loadData(prefix+'-sel-year', new Date().getFullYear());
  const storageKey = `${prefix}-${selYear}-${String(selMonth+1).padStart(2,'0')}`;
  const fileData = await window.db.getFile(storageKey);

  const el = document.getElementById('page-content');
  el.innerHTML = `
    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">${description}</p>
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap">
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${MONTHS_FR.map((m,i) => `<button class="month-pill ${selMonth===i?'active':''}" data-month="${i}">${m.slice(0,3)}</button>`).join('')}
      </div>
      <div class="flex-center gap-4">
        <button class="nav-arrow" id="mp-prev-year">${icon('chevLeft')}</button>
        <span style="font-weight:700;font-size:14px;color:var(--blue);min-width:40px;text-align:center">${selYear}</span>
        <button class="nav-arrow" id="mp-next-year">${icon('chevRight')}</button>
      </div>
    </div>
    <div style="background:var(--white);border-radius:12px;border:1px solid var(--border);padding:4px">
      <div style="padding:10px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px">
        <span style="font-size:18px">${iconEmoji}</span>
        <span style="font-weight:700;font-size:14px;color:var(--blue)">${MONTHS_FR[selMonth]} ${selYear}</span>
      </div>
      <div style="padding:14px">
        <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">Déposez le PDF de ${MONTHS_FR[selMonth].toLowerCase()} ${selYear}.</p>
        ${renderPdfUploadZone(storageKey, fileData, `${title} — ${MONTHS_FR[selMonth]} ${selYear}`, iconEmoji)}
      </div>
    </div>
  `;
  bindFileHandlers(el, renderFn);
  el.querySelectorAll('.month-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      saveData(prefix+'-sel-month', parseInt(btn.dataset.month));
      renderFn();
    });
  });
  document.getElementById('mp-prev-year')?.addEventListener('click', () => { saveData(prefix+'-sel-year', selYear-1); renderFn(); });
  document.getElementById('mp-next-year')?.addEventListener('click', () => { saveData(prefix+'-sel-year', selYear+1); renderFn(); });
}

function renderEmissions() { renderMonthlyPdf('rb-emissions-pdf','Planning émissions','La grille des émissions, organisée par mois. Sélectionnez le mois puis importez le PDF correspondant.','📻', renderEmissions); }
async function renderJeux() {
  const el = document.getElementById('page-content');
  el.innerHTML = `<div class="empty-state">Chargement…</div>`;
  const jeux = await window.db.getJeux();

  // Lundi de la semaine d'une date donnée
  const mondayOf = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const day = (d.getDay() + 6) % 7; // 0 = lundi
    d.setDate(d.getDate() - day);
    return d;
  };
  const weekLabel = (monday) => {
    const sunday = new Date(monday); sunday.setDate(sunday.getDate() + 6);
    const sameMonth = monday.getMonth() === sunday.getMonth();
    const start = monday.toLocaleDateString('fr-FR', sameMonth ? { day:'numeric' } : { day:'numeric', month:'long' });
    const end = sunday.toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });
    return `Semaine du ${start} au ${end}`;
  };

  const statutLabels = { a_venir:'À venir', en_cours:'En cours', termine:'Terminé' };
  const statutColors = { a_venir:'#f59e0b', en_cours:'#34d399', termine:'#9ca3af' };

  // Regroupement par semaine
  const groups = {};
  jeux.forEach(j => {
    const monday = mondayOf(j.semaine);
    const key = monday.toISOString().slice(0, 10);
    if (!groups[key]) groups[key] = { monday, items: [] };
    groups[key].items.push(j);
  });
  const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a)); // semaine la plus récente en haut

  el.innerHTML = `
    <div class="flex-between mb-20">
      <p style="margin:0;color:var(--text-secondary);font-size:13px">Les jeux-concours de la radio, saisis à la main et regroupés par semaine.</p>
      <button class="btn primary" id="jeu-new">${icon('plus')} Ajouter un jeu-concours</button>
    </div>
    ${jeux.length === 0 ? '<div class="empty-state">Aucun jeu-concours pour le moment. Cliquez sur « Ajouter » pour commencer 🎁</div>' : ''}
    ${sortedKeys.map(key => {
      const g = groups[key];
      return `
        <h4 style="color:var(--blue);margin:18px 0 10px">🗓️ ${weekLabel(g.monday)}</h4>
        <div class="ideas-grid mb-12">
          ${g.items.map(j => `
            <div class="idea-card">
              <div class="flex-between" style="margin-bottom:6px">
                <span class="badge" style="background:${statutColors[j.statut]}22;color:${statutColors[j.statut]}">${statutLabels[j.statut] || ''}</span>
                <div class="flex-center gap-6">
                  <button class="icon-btn" data-edit-jeu="${j.id}">${icon('edit')}</button>
                  <button class="icon-btn" data-del-jeu="${j.id}">${icon('trash')}</button>
                </div>
              </div>
              <div style="font-weight:700;color:var(--blue);font-size:15px;margin-bottom:4px">${esc(j.title)}</div>
              ${j.lot ? `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:2px">🎁 ${esc(j.lot)}</div>` : ''}
              ${j.partenaire ? `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:2px">🤝 ${esc(j.partenaire)}</div>` : ''}
              ${j.mecanique ? `<div style="font-size:12px;color:var(--text-secondary);line-height:1.5;margin-top:6px;padding-top:6px;border-top:1px solid var(--border)">${esc(j.mecanique)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }).join('')}
  `;

  function openJeuModal(edit) {
    const isEdit = !!edit;
    const j = edit || { title:'', semaine:new Date().toISOString().slice(0,10), lot:'', partenaire:'', mecanique:'', statut:'a_venir' };
    const html = `
      ${inputField('Nom du jeu-concours','jeu-title', j.title, 'Ex : Gagnez vos places de concert')}
      ${inputField('Semaine (choisir une date dans la semaine)','jeu-week', j.semaine, '', 'date')}
      ${inputField('Lot à gagner','jeu-lot', j.lot, 'Ex : 2 places + meet & greet')}
      ${inputField('Partenaire','jeu-partner', j.partenaire, 'Ex : Salle Arthur Rimbaud')}
      ${textareaField('Mécanique (comment participer)','jeu-meca', j.mecanique, 'Ex : Commenter et identifier 2 amis')}
      ${selectField('Statut','jeu-statut', [
        { value:'a_venir', label:'À venir' },
        { value:'en_cours', label:'En cours' },
        { value:'termine', label:'Terminé' },
      ], j.statut)}
      <div style="display:flex;justify-content:${isEdit ? 'space-between' : 'flex-end'};margin-top:8px">
        ${isEdit ? `<button class="btn danger" id="jeu-delete">${icon('trash')} Supprimer</button>` : ''}
        <button class="btn primary" id="jeu-submit">${icon('check')} ${isEdit ? 'Enregistrer' : 'Ajouter'}</button>
      </div>
    `;
    showModal(isEdit ? 'Modifier le jeu-concours' : 'Ajouter un jeu-concours', html);
    document.getElementById('jeu-submit').addEventListener('click', async () => {
      const title = document.getElementById('jeu-title').value.trim();
      const week = document.getElementById('jeu-week').value;
      if (!title || !week) return;
      const data = {
        title, semaine: week,
        lot: document.getElementById('jeu-lot').value,
        partenaire: document.getElementById('jeu-partner').value,
        mecanique: document.getElementById('jeu-meca').value,
        statut: document.getElementById('jeu-statut').value,
      };
      if (isEdit) await window.db.updateJeu(edit.id, data);
      else await window.db.createJeu(data);
      closeModal(); renderJeux();
    });
    if (isEdit) {
      document.getElementById('jeu-delete').addEventListener('click', async () => {
        await window.db.deleteJeu(edit.id);
        closeModal(); renderJeux();
      });
    }
  }

  document.getElementById('jeu-new')?.addEventListener('click', () => openJeuModal());
  el.querySelectorAll('[data-edit-jeu]').forEach(btn => {
    btn.addEventListener('click', () => {
      const j = jeux.find(x => x.id === btn.dataset.editJeu);
      if (j) openJeuModal(j);
    });
  });
  el.querySelectorAll('[data-del-jeu]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await window.db.deleteJeu(btn.dataset.delJeu);
      renderJeux();
    });
  });
}

// ═══════════════════════════════════════════════════
// 6. STRATÉGIE & PILIERS
// ═══════════════════════════════════════════════════
function renderStrategie() {
  document.getElementById('page-content').innerHTML = `
    <div class="strategy-banner">
      <h3>🎯 Stratégie réseaux sociaux — Radio Bouton 90.6 FM</h3>
      <p>L'objectif de notre présence sur les réseaux sociaux est triple : faire connaître la radio au-delà de l'antenne, fidéliser notre communauté existante, et attirer de nouveaux auditeurs. Chaque post doit servir au moins l'un de ces objectifs.</p>
    </div>
    <h4 style="color:var(--blue);margin-bottom:16px">Les 5 piliers de contenu</h4>
    <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px">Chaque publication doit être rattachée à l'un de ces piliers. L'idéal est de maintenir un équilibre entre eux sur le mois.</p>
    ${PILIERS.map(p => `<div class="pilier-card" style="border-left:5px solid ${p.color}">
      <div class="pilier-icon">${p.icon}</div>
      <div>
        <h4 style="margin:0 0 4px;color:var(--blue)">${p.label}</h4>
        <p style="margin:0;font-size:13px;color:var(--text-secondary);line-height:1.5">${p.desc}</p>
      </div>
      <div class="pilier-dot" style="background:${p.color}"></div>
    </div>`).join('')}
    <div class="rules-box">
      <h4>Règles de publication</h4>
      <div class="rules-content">
        <strong>Facebook :</strong> minimum 1 post/jour, programmé à 7h30. Minimum 1 post/jour sur les actualités, programmé à 9h.<br>
        <strong>Instagram &amp; LinkedIn :</strong> 2 à 3 posts par semaine.<br>
        <strong>Posts invités :</strong> toujours à programmer 1h avant l'émission concernée.<br>
        <strong>Ton :</strong> chaleureux, inclusif, local. On vouvoie notre audience.<br>
        <strong>Visuels :</strong> toujours utiliser les templates Canva validés.
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════
// 7. REPORTING (import PDF mensuel)
// ═══════════════════════════════════════════════════
function renderReporting() { renderMonthlyPdf('rb-reporting-pdf','Reporting mensuel','Importez votre rapport PDF de fin de mois pour chaque période.','📊', renderReporting); }

// ═══════════════════════════════════════════════════
// 8. CHARTE GRAPHIQUE
// ═══════════════════════════════════════════════════
async function renderCharte() {
  const el = document.getElementById('page-content');
  const notes = await window.db.getCharteNotes();
  const chartePdf = await window.db.getFile('rb-charte-pdf');
  const logosZip = await window.db.getFile('rb-logos-zip');
  el.innerHTML = `
    <h4 style="color:var(--blue);margin-bottom:12px">📄 Document charte graphique</h4>
    <div class="mb-28">${renderPdfUploadZone('rb-charte-pdf', chartePdf, 'Charte graphique PDF', '🎨')}</div>
    <h4 style="color:var(--blue);margin-bottom:12px">📦 Dossier logos (ZIP)</h4>
    <div class="mb-28">${renderPdfUploadZone('rb-logos-zip', logosZip, 'Logos ZIP', '📦')}</div>
    <h4 style="color:var(--blue);margin-bottom:12px">📝 Notes & consignes</h4>
    <div class="form-group"><textarea id="charte-notes" placeholder="Ajoutez ici les consignes spécifiques : interdits, bonnes pratiques, exemples..." style="min-height:120px">${esc(notes)}</textarea></div>
  `;
  bindFileHandlers(el, renderCharte);
  let charteNotesTimer;
  document.getElementById('charte-notes')?.addEventListener('input', e => {
    clearTimeout(charteNotesTimer);
    const val = e.target.value;
    charteNotesTimer = setTimeout(() => window.db.setCharteNotes(val), 600);
  });
}

// ═══════════════════════════════════════════════════
// 9. TEMPLATES CANVA
// ═══════════════════════════════════════════════════
async function renderTemplates() {
  const links = await window.db.getTemplateLinks();
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:20px">Accédez directement aux templates Canva validés. Ajoutez le lien Canva de chaque template pour que toute l'équipe puisse y accéder en un clic.</p>
    <div class="ideas-grid">
      ${TEMPLATES.map(t => {
        const hasLink = links[t.label];
        return `<div class="template-card">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
            <div style="font-size:32px">${t.icon}</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:15px;color:var(--blue)">${t.label}</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${t.desc}</div>
            </div>
          </div>
          <div id="tpl-action-${t.label.replace(/\s/g,'_')}">
            ${hasLink ? `
              <div class="flex-center gap-8">
                <a href="${esc(hasLink)}" target="_blank" rel="noopener noreferrer" class="no-style" style="flex:1"><button class="btn primary small" style="width:100%">${icon('link')} Ouvrir dans Canva</button></a>
                <button class="btn ghost small" data-tpl-edit="${esc(t.label)}">${icon('edit')}</button>
              </div>
            ` : `
              <button class="btn secondary small" style="width:100%" data-tpl-add="${esc(t.label)}">${icon('plus')} Ajouter le lien Canva</button>
            `}
          </div>
        </div>`;
      }).join('')}
    </div>
  `;

  function startEdit(label, currentUrl) {
    const id = label.replace(/\s/g, '_');
    const container = document.getElementById(`tpl-action-${id}`);
    if (!container) return;
    container.innerHTML = `<div class="flex-center gap-6"><input id="tpl-input-${id}" value="${esc(currentUrl||'')}" placeholder="Coller le lien Canva ici…" style="flex:1;padding:6px 10px;border-radius:6px;border:1.5px solid var(--border);font-size:12px;outline:none" autofocus /><button class="btn primary small" id="tpl-save-${id}">${icon('check')}</button><button class="btn ghost small" id="tpl-cancel-${id}">${icon('x')}</button></div>`;
    document.getElementById(`tpl-save-${id}`).addEventListener('click', async () => {
      await window.db.setTemplateLink(label, document.getElementById(`tpl-input-${id}`).value);
      renderTemplates();
    });
    document.getElementById(`tpl-cancel-${id}`).addEventListener('click', renderTemplates);
  }

  el.querySelectorAll('[data-tpl-add]').forEach(btn => {
    btn.addEventListener('click', () => startEdit(btn.dataset.tplAdd, ''));
  });
  el.querySelectorAll('[data-tpl-edit]').forEach(btn => {
    btn.addEventListener('click', () => startEdit(btn.dataset.tplEdit, links[btn.dataset.tplEdit]));
  });
}

// ═══════════════════════════════════════════════════
// 10. RÉPARTITION DES TÂCHES
// ═══════════════════════════════════════════════════
async function renderTaches() {
  const taches = await window.db.getMembres();
  const memberColors = ['#253367','#6366f1','#06b6d4','#f59e0b','#ef4444','#8b5cf6','#10b981'];

  document.getElementById('page-content').innerHTML = `
    <div class="flex-between mb-20">
      <p style="margin:0;color:var(--text-secondary);font-size:13px">Qui fait quoi dans l'équipe communication.</p>
      <button class="btn primary" id="tch-new">${icon('plus')} Ajouter un membre</button>
    </div>
    <div class="ideas-grid">
      ${taches.map(t => `<div class="member-card">
        <div class="member-bar" style="background:${t.color}"></div>
        <div style="padding:18px">
          <div class="flex-between" style="margin-bottom:8px">
            <div class="flex-center gap-10">
              <div class="member-avatar" style="background:${t.color}">${t.name.charAt(0).toUpperCase()}</div>
              <div>
                <div style="font-weight:700;font-size:14px;color:var(--blue)">${esc(t.name)}</div>
                ${t.role ? `<div style="font-size:11px;color:var(--text-secondary)">${esc(t.role)}</div>` : ''}
              </div>
            </div>
            <button class="icon-btn" data-del-member="${t.id}">${icon('trash')}</button>
          </div>
          ${t.tasks ? `<div style="font-size:12px;color:var(--text-secondary);line-height:1.7;margin-top:8px;padding-top:8px;border-top:1px solid var(--border)">${t.tasks.split('\n').map(l => `<div>• ${esc(l)}</div>`).join('')}</div>` : ''}
        </div>
      </div>`).join('')}
      ${taches.length===0?'<div class="empty-state" style="grid-column:1/-1">Aucun membre ajouté. Définissez les rôles de l\'équipe 👥</div>':''}
    </div>
  `;

  document.getElementById('tch-new')?.addEventListener('click', () => {
    const html = `
      ${inputField('Prénom / Nom','tch-name','','Ex : Cloé')}
      ${inputField('Rôle','tch-role','','Ex : Responsable communication')}
      ${textareaField('Tâches principales (une par ligne)','tch-tasks','','Création des visuels\nGestion Instagram\nRelation partenaires')}
      <div class="form-group">
        <label>Couleur</label>
        <div class="flex-center gap-8" id="tch-colors">
          ${memberColors.map(c => `<button class="color-dot ${c==='#253367'?'active':''}" style="background:${c}" data-color="${c}"></button>`).join('')}
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="btn primary" id="tch-submit">${icon('check')} Ajouter</button></div>
    `;
    showModal('Ajouter un membre', html);
    let selectedColor = '#253367';
    document.querySelectorAll('#tch-colors .color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('#tch-colors .color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        selectedColor = dot.dataset.color;
      });
    });
    document.getElementById('tch-submit').addEventListener('click', async () => {
      const name = document.getElementById('tch-name').value.trim();
      if (!name) return;
      await window.db.createMembre({
        name,
        role: document.getElementById('tch-role').value,
        tasks: document.getElementById('tch-tasks').value,
        color: selectedColor,
      });
      closeModal(); renderTaches();
    });
  });

  document.querySelectorAll('[data-del-member]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await window.db.deleteMembre(btn.dataset.delMember);
      renderTaches();
    });
  });
}

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
window.initApp = function () {
  renderNav();
  renderPage();
};
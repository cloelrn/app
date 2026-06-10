// ═══════════════════════════════════════════════════
// auth.js — Authentification Supabase
// Hub Communication Radio Bouton
//
// À charger APRÈS la lib supabase-js ET après script.js.
// (voir l'ordre des balises <script> dans index.html)
// ═══════════════════════════════════════════════════

// ─── 1. CONFIG : remplace par tes identifiants Supabase ───
//    (Project Settings → API)
//    La clé "anon" est publique par design : aucun risque à la mettre ici,
//    c'est la RLS qui protège la base. Ne mets JAMAIS la clé service_role.
const SUPABASE_URL = "https://uibcsnbeyetrrtqumxvt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYmNzbmJleWV0cnJ0cXVteHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MzYwODgsImV4cCI6MjA5NTQxMjA4OH0.Z8mHoWDa3HVCdBYmGinGtV81Z9TK7g5ecRi7UhCVCNQ";

// ─── 2. Client Supabase (exposé globalement pour le reste de l'appli) ───
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

// ─── 3. Styles du login (injectés : rien à modifier dans style.css) ───
const authStyles = document.createElement("style");
authStyles.textContent = `
  #rb-login {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #253367, #1a1a2e);
    font-family: 'Montserrat', sans-serif;
  }
  #rb-login.hidden { display: none; }
  .rb-login-card {
    background: #fff; border-radius: 18px; padding: 36px 32px;
    width: 360px; max-width: 90vw; box-shadow: 0 24px 60px rgba(0,0,0,.3);
    text-align: center;
  }
  .rb-login-card .badge-fm {
    display: inline-block; background: #ffd708; color: #253367; font-weight: 800;
    font-size: 11px; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px;
  }
  .rb-login-card h1 { color: #253367; font-size: 20px; margin: 0 0 4px; font-weight: 800; }
  .rb-login-card p.sub { color: #5a5a7a; font-size: 12px; margin: 0 0 24px; }
  .rb-field { text-align: left; margin-bottom: 14px; }
  .rb-field label { display: block; font-size: 12px; font-weight: 600; color: #5a5a7a; margin-bottom: 5px; }
  .rb-field input {
    width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #e0dde5;
    font-size: 14px; outline: none; font-family: inherit;
  }
  .rb-field input:focus { border-color: #ffd708; }
  .rb-login-btn {
    width: 100%; padding: 11px; border: none; border-radius: 8px; background: #ffd708;
    color: #253367; font-weight: 800; font-size: 14px; cursor: pointer;
    font-family: inherit; margin-top: 6px; transition: opacity .15s;
  }
  .rb-login-btn:hover { opacity: .85; }
  .rb-login-btn:disabled { opacity: .5; cursor: default; }
  .rb-error { color: #dc2626; font-size: 12px; margin-top: 12px; min-height: 16px; }
`;
document.head.appendChild(authStyles);

// ─── 4. Écran de connexion (injecté dans la page) ───
const loginEl = document.createElement("div");
loginEl.id = "rb-login";
loginEl.innerHTML = `
  <div class="rb-login-card">
    <div class="badge-fm">90.6 FM</div>
    <h1>Hub Communication</h1>
    <p class="sub">Espace réservé à l'équipe Radio Bouton</p>
    <div class="rb-field">
      <label for="rb-email">Email</label>
      <input id="rb-email" type="email" autocomplete="username" placeholder="prenom@radiobouton.fr" />
    </div>
    <div class="rb-field">
      <label for="rb-password">Mot de passe</label>
      <input id="rb-password" type="password" autocomplete="current-password" placeholder="••••••••" />
    </div>
    <button class="rb-login-btn" id="rb-login-btn">Se connecter</button>
    <div class="rb-error" id="rb-error"></div>
  </div>
`;
document.body.appendChild(loginEl);

// ─── 5. Logique d'authentification ───
let appStarted = false;

function showLogin() {
  loginEl.classList.remove("hidden");
}

function hideLoginAndStart() {
  loginEl.classList.add("hidden");
  // Démarre l'appli une seule fois (script.js définit window.initApp)
  if (!appStarted && typeof window.initApp === "function") {
    window.initApp();
    appStarted = true;
  }
  injectLogout();
}

async function handleLogin() {
  const email = document.getElementById("rb-email").value.trim();
  const password = document.getElementById("rb-password").value;
  const errorEl = document.getElementById("rb-error");
  const btn = document.getElementById("rb-login-btn");

  errorEl.textContent = "";
  if (!email || !password) {
    errorEl.textContent = "Merci de remplir les deux champs.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Connexion…";
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  btn.disabled = false;
  btn.textContent = "Se connecter";

if (error) {
  console.error("Erreur de connexion :", error);
  errorEl.textContent = error.message;
}
  // En cas de succès, onAuthStateChange (plus bas) affiche l'appli.
}

document.getElementById("rb-login-btn").addEventListener("click", handleLogin);
loginEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});

// ─── 6. Bouton de déconnexion (ajouté dans la sidebar) ───
function injectLogout() {
  if (document.getElementById("rb-logout")) return;
  const footer = document.querySelector(".sidebar-footer");
  if (!footer) return;
  const btn = document.createElement("button");
  btn.id = "rb-logout";
  btn.textContent = "Se déconnecter";
  btn.style.cssText =
    "margin-top:10px;width:100%;padding:7px;border:none;border-radius:6px;" +
    "background:rgba(255,255,255,.12);color:#fff;font-family:inherit;font-size:11px;" +
    "font-weight:600;cursor:pointer;";
  btn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.reload();
  });
  footer.appendChild(btn);
}

// ─── 7. Au chargement : y a-t-il une session active ? ───
supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) hideLoginAndStart();
  else showLogin();
});

// Réagit aux connexions / déconnexions
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" && session) hideLoginAndStart();
  if (event === "SIGNED_OUT") showLogin();
});

// ═══════════════════════════════════════════════════
// db.js — Couche d'accès aux données Supabase
// Hub Communication Radio Bouton
//
// À charger APRÈS la lib supabase-js et AVANT script.js.
// Utilise window.supabaseClient (créé dans auth.js) au moment de l'appel.
// ═══════════════════════════════════════════════════

// ─── POSTS : traduction appli ↔ SQL ───
function postToRow(p) {
  return {
    titre:      p.title,
    date_pub:   p.date,
    plateforme: p.platform,
    pilier_id:  p.pilier,
    statut:     p.status,
    assignee:   p.assignee || null,
    notes:      p.notes || null,
  };
}
function rowToPost(r) {
  return {
    id:       r.id,
    title:    r.titre,
    date:     r.date_pub,
    platform: r.plateforme,
    pilier:   r.pilier_id,
    status:   r.statut,
    assignee: r.assignee || '',
    notes:    r.notes || '',
  };
}

// ─── IDÉES : traduction appli ↔ SQL ───
function ideeToRow(i) {
  return {
    titre:       i.title,
    description: i.notes || null,
    pilier_id:   i.pilier,
    priorite:    i.priority,
    author:      i.author || null,
  };
}
function rowToIdee(r) {
  return {
    id:       r.id,
    title:    r.titre,
    notes:    r.description || '',
    pilier:   r.pilier_id,
    priority: r.priorite,
    author:   r.author || '',
  };
}

// ─── MEMBRES : traduction appli ↔ SQL ───
function membreToRow(m) {
  return {
    nom:     m.name,
    role:    m.role || null,
    couleur: m.color,
    taches:  m.tasks || null,
  };
}
function rowToMembre(r) {
  return {
    id:    r.id,
    name:  r.nom,
    role:  r.role || '',
    color: r.couleur,
    tasks: r.taches || '',
  };
}

// ─── JEUX-CONCOURS : traduction appli ↔ SQL ───
function jeuToRow(j) {
  return {
    titre:      j.title,
    semaine:    j.semaine,
    lot:        j.lot || null,
    partenaire: j.partenaire || null,
    mecanique:  j.mecanique || null,
    statut:     j.statut,
  };
}
function rowToJeu(r) {
  return {
    id:         r.id,
    title:      r.titre,
    semaine:    r.semaine,
    lot:        r.lot || '',
    partenaire: r.partenaire || '',
    mecanique:  r.mecanique || '',
    statut:     r.statut,
  };
}

// ─── API de données ───
window.db = {

  // ----- POSTS (calendrier éditorial) -----
  async getPosts() {
    const { data, error } = await window.supabaseClient
      .from('posts').select('*').order('date_pub', { ascending: true });
    if (error) { console.error('getPosts:', error); return []; }
    return data.map(rowToPost);
  },
  async createPost(post) {
    const { error } = await window.supabaseClient.from('posts').insert(postToRow(post));
    if (error) { console.error('createPost:', error); alert("Erreur lors de l'ajout du post."); }
  },
  async updatePost(id, post) {
    const { error } = await window.supabaseClient.from('posts').update(postToRow(post)).eq('id', id);
    if (error) { console.error('updatePost:', error); alert('Erreur lors de la modification.'); }
  },
  async deletePost(id) {
    const { error } = await window.supabaseClient.from('posts').delete().eq('id', id);
    if (error) { console.error('deletePost:', error); alert('Erreur lors de la suppression.'); }
  },

  // ----- IDÉES DE POSTS -----
  async getIdees() {
    const { data, error } = await window.supabaseClient
      .from('idees').select('*').order('created_at', { ascending: false });
    if (error) { console.error('getIdees:', error); return []; }
    return data.map(rowToIdee);
  },
  async createIdee(idee) {
    const { error } = await window.supabaseClient.from('idees').insert(ideeToRow(idee));
    if (error) { console.error('createIdee:', error); alert("Erreur lors de l'ajout de l'idée."); }
  },
  async deleteIdee(id) {
    const { error } = await window.supabaseClient.from('idees').delete().eq('id', id);
    if (error) { console.error('deleteIdee:', error); alert('Erreur lors de la suppression.'); }
  },

  // ----- TEMPLATES CANVA (liens, indexés par label) -----
  async getTemplateLinks() {
    const { data, error } = await window.supabaseClient
      .from('templates_canva').select('label, lien_canva');
    if (error) { console.error('getTemplateLinks:', error); return {}; }
    const map = {};
    data.forEach(r => { if (r.lien_canva) map[r.label] = r.lien_canva; });
    return map;
  },
  async setTemplateLink(label, url) {
    const { error } = await window.supabaseClient
      .from('templates_canva').update({ lien_canva: url }).eq('label', label);
    if (error) { console.error('setTemplateLink:', error); alert("Erreur lors de l'enregistrement du lien."); }
  },

  // ----- MEMBRES (répartition des tâches) -----
  async getMembres() {
    const { data, error } = await window.supabaseClient
      .from('membres').select('*').order('created_at', { ascending: true });
    if (error) { console.error('getMembres:', error); return []; }
    return data.map(rowToMembre);
  },
  async createMembre(membre) {
    const { error } = await window.supabaseClient.from('membres').insert(membreToRow(membre));
    if (error) { console.error('createMembre:', error); alert("Erreur lors de l'ajout du membre."); }
  },
  async deleteMembre(id) {
    const { error } = await window.supabaseClient.from('membres').delete().eq('id', id);
    if (error) { console.error('deleteMembre:', error); alert('Erreur lors de la suppression.'); }
  },

  // ----- FICHIERS (bucket Storage 'documents') -----
  //   Un "dossier" par clé (ex: 'rb-marronnier-pdf'), un seul fichier dedans.
  async getFile(key) {
    const { data, error } = await window.supabaseClient
      .storage.from('documents')
      .list(key, { limit: 1, sortBy: { column: 'created_at', order: 'desc' } });
    if (error) { console.error('getFile:', error); return null; }
    if (!data || data.length === 0) return null;
    const obj = data[0];
    const path = `${key}/${obj.name}`;
    const { data: pub } = window.supabaseClient.storage.from('documents').getPublicUrl(path);
    return {
      name: obj.name,
      size: obj.metadata?.size || 0,
      type: obj.metadata?.mimetype || '',
      url: pub.publicUrl,
      uploadedAt: obj.created_at,
    };
  },
  async uploadFile(key, file) {
    await window.db.removeFile(key); // on enlève l'ancien fichier éventuel
    // nom "sûr" pour le stockage : sans accents, espaces ni caractères spéciaux
    const safeName = file.name
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${key}/${safeName}`;
    const { error } = await window.supabaseClient
      .storage.from('documents')
      .upload(path, file, { upsert: true, contentType: file.type });
    if (error) { console.error('uploadFile:', error); alert("Erreur lors de l'envoi du fichier : " + error.message); }
  },
  async removeFile(key) {
    const { data, error } = await window.supabaseClient.storage.from('documents').list(key);
    if (error) { console.error('removeFile list:', error); return; }
    if (data && data.length) {
      const paths = data.map(o => `${key}/${o.name}`);
      const { error: delErr } = await window.supabaseClient.storage.from('documents').remove(paths);
      if (delErr) console.error('removeFile remove:', delErr);
    }
  },

  // ----- NOTES DE CHARTE (table charte_notes, ligne unique id=1) -----
  async getCharteNotes() {
    const { data, error } = await window.supabaseClient
      .from('charte_notes').select('contenu').eq('id', 1).maybeSingle();
    if (error) { console.error('getCharteNotes:', error); return ''; }
    return data?.contenu || '';
  },
  async setCharteNotes(text) {
    const { error } = await window.supabaseClient
      .from('charte_notes').update({ contenu: text }).eq('id', 1);
    if (error) console.error('setCharteNotes:', error);
  },

  // ----- JEUX-CONCOURS (saisie manuelle, par semaine) -----
  async getJeux() {
    const { data, error } = await window.supabaseClient
      .from('jeux_concours').select('*').order('semaine', { ascending: false });
    if (error) { console.error('getJeux:', error); return []; }
    return data.map(rowToJeu);
  },
  async createJeu(jeu) {
    const { error } = await window.supabaseClient.from('jeux_concours').insert(jeuToRow(jeu));
    if (error) { console.error('createJeu:', error); alert("Erreur lors de l'ajout du jeu-concours."); }
  },
  async updateJeu(id, jeu) {
    const { error } = await window.supabaseClient.from('jeux_concours').update(jeuToRow(jeu)).eq('id', id);
    if (error) { console.error('updateJeu:', error); alert('Erreur lors de la modification.'); }
  },
  async deleteJeu(id) {
    const { error } = await window.supabaseClient.from('jeux_concours').delete().eq('id', id);
    if (error) { console.error('deleteJeu:', error); alert('Erreur lors de la suppression.'); }
  },

  // ----- Les autres sections viendront ici sur le même modèle -----
};

# Hub Communication Radio Bouton — Structure Base de Données

## Contexte

Ce document décrit la structure de la base de données nécessaire pour remplacer le stockage `localStorage` du Hub Communication Radio Bouton par une base de données relationnelle (MySQL / MariaDB).

---

## Schéma relationnel

### 1. `piliers` — Piliers de contenu

| Colonne     | Type             | Contraintes                  | Description                                    |
|-------------|------------------|------------------------------|------------------------------------------------|
| id          | VARCHAR(50)      | PRIMARY KEY                  | Identifiant unique (ex : `coulisses`)          |
| label       | VARCHAR(100)     | NOT NULL                     | Nom affiché (ex : `Coulisses`)                 |
| couleur     | VARCHAR(7)       | NOT NULL                     | Code hex (ex : `#ffd708`)                      |
| icone       | VARCHAR(10)      | NULL                         | Emoji (ex : 🎙️)                               |
| description | TEXT             | NULL                         | Description du pilier                          |
| position    | INT              | NOT NULL DEFAULT 0           | Ordre d'affichage                              |

**Données initiales :**
- `coulisses` / Coulisses / #ffd708 — Montrer l'envers du décor
- `emissions` / Émissions / #253367 — Promouvoir les programmes
- `engager` / Engagement / #34d399 — Sondages, jeux, interaction
- `territoire` / Territoire / #f87171 — Ardennes, événements locaux
- `autres` / Autres / #9ca3af — Contenus divers

---

### 2. `posts` — Calendrier éditorial

| Colonne    | Type             | Contraintes                           | Description                                         |
|------------|------------------|---------------------------------------|-----------------------------------------------------|
| id         | VARCHAR(36)      | PRIMARY KEY                           | UUID                                                |
| titre      | VARCHAR(255)     | NOT NULL                              | Titre du post                                       |
| date       | DATE             | NOT NULL                              | Date de publication prévue                          |
| heure      | TIME             | NULL                                  | Heure de publication                                |
| plateforme | VARCHAR(50)      | NOT NULL                              | `instagram`, `facebook`, `linkedin`, `tiktok`       |
| pilier_id  | VARCHAR(50)      | FOREIGN KEY → piliers(id)             | Pilier de contenu associé                           |
| statut     | VARCHAR(20)      | NOT NULL DEFAULT 'idee'               | `idee`, `brouillon`, `programme`, `publie`          |
| contenu    | TEXT             | NULL                                  | Texte du post                                       |
| notes      | TEXT             | NULL                                  | Notes internes                                      |
| created_at | DATETIME         | NOT NULL DEFAULT CURRENT_TIMESTAMP    | Date de création                                    |
| updated_at | DATETIME         | ON UPDATE CURRENT_TIMESTAMP           | Dernière modification                               |

---

### 3. `idees` — Idées de posts

| Colonne     | Type             | Contraintes                           | Description                                      |
|-------------|------------------|---------------------------------------|--------------------------------------------------|
| id          | VARCHAR(36)      | PRIMARY KEY                           | UUID                                             |
| titre       | VARCHAR(255)     | NOT NULL                              | Titre de l'idée                                  |
| description | TEXT             | NULL                                  | Description détaillée                            |
| pilier_id   | VARCHAR(50)      | FOREIGN KEY → piliers(id)             | Pilier associé                                   |
| priorite    | VARCHAR(10)      | NOT NULL DEFAULT 'moyenne'            | `haute`, `moyenne`, `basse`                      |
| statut      | VARCHAR(20)      | NOT NULL DEFAULT 'idee'               | `idee`, `a_developper`, `pret`                   |
| created_at  | DATETIME         | NOT NULL DEFAULT CURRENT_TIMESTAMP    | Date de création                                 |

---

### 4. `fichiers_pdf` — PDFs mensuels (marronnier, émissions, jeux, reporting)

| Colonne     | Type             | Contraintes                           | Description                                      |
|-------------|------------------|---------------------------------------|--------------------------------------------------|
| id          | INT              | PRIMARY KEY AUTO_INCREMENT            | Identifiant                                      |
| categorie   | VARCHAR(30)      | NOT NULL                              | `marronnier`, `emissions`, `jeux`, `reporting`   |
| mois        | TINYINT          | NULL (1-12)                           | Mois concerné (NULL pour marronnier annuel)      |
| annee       | SMALLINT         | NULL                                  | Année concernée                                  |
| nom_fichier | VARCHAR(255)     | NOT NULL                              | Nom original du fichier                          |
| type_mime   | VARCHAR(100)     | NOT NULL                              | `application/pdf`                                |
| taille      | INT              | NOT NULL                              | Taille en octets                                 |
| chemin      | VARCHAR(500)     | NOT NULL                              | Chemin de stockage sur le serveur                |
| uploaded_at | DATETIME         | NOT NULL DEFAULT CURRENT_TIMESTAMP    | Date d'import                                    |

> Les fichiers PDF sont stockés sur le serveur (dossier `uploads/`), pas en base. Seul le chemin est enregistré.

**Index :** `UNIQUE(categorie, mois, annee)` — un seul PDF par catégorie/mois/année.

---

### 5. `charte_graphique` — Fichiers charte + notes

| Colonne     | Type             | Contraintes                           | Description                                      |
|-------------|------------------|---------------------------------------|--------------------------------------------------|
| id          | INT              | PRIMARY KEY AUTO_INCREMENT            | Identifiant                                      |
| type        | VARCHAR(20)      | NOT NULL                              | `pdf_charte`, `zip_logos`                        |
| nom_fichier | VARCHAR(255)     | NOT NULL                              | Nom original                                     |
| type_mime   | VARCHAR(100)     | NOT NULL                              | `application/pdf` ou `application/zip`           |
| taille      | INT              | NOT NULL                              | Taille en octets                                 |
| chemin      | VARCHAR(500)     | NOT NULL                              | Chemin serveur                                   |
| uploaded_at | DATETIME         | NOT NULL DEFAULT CURRENT_TIMESTAMP    | Date d'import                                    |

**Table associée :**

### 6. `charte_notes` — Notes charte graphique

| Colonne     | Type             | Contraintes                           | Description                                      |
|-------------|------------------|---------------------------------------|--------------------------------------------------|
| id          | INT              | PRIMARY KEY DEFAULT 1                 | Toujours 1 (une seule entrée)                    |
| contenu     | TEXT             | NULL                                  | Notes libres                                     |
| updated_at  | DATETIME         | ON UPDATE CURRENT_TIMESTAMP           | Dernière modification                            |

---

### 7. `templates_canva` — Templates avec liens éditables

| Colonne     | Type             | Contraintes                           | Description                                      |
|-------------|------------------|---------------------------------------|--------------------------------------------------|
| id          | INT              | PRIMARY KEY AUTO_INCREMENT            | Identifiant                                      |
| label       | VARCHAR(100)     | NOT NULL                              | Nom du template                                  |
| icone       | VARCHAR(10)      | NULL                                  | Emoji                                            |
| description | VARCHAR(255)     | NULL                                  | Description courte                               |
| lien_canva  | VARCHAR(500)     | NULL                                  | URL Canva éditable                               |
| position    | INT              | NOT NULL DEFAULT 0                    | Ordre d'affichage                                |

**Données initiales :**
- Template Invité / 🎤 / Visuel d'annonce pour les invités à l'antenne
- Template Partenariat / 🤝 / Visuel de mise en avant des partenaires
- Template Jeu-concours / 🎁 / Visuel d'annonce pour les jeux-concours

---

### 8. `membres` — Répartition des tâches

| Colonne    | Type             | Contraintes                           | Description                                      |
|------------|------------------|---------------------------------------|--------------------------------------------------|
| id         | VARCHAR(36)      | PRIMARY KEY                           | UUID                                             |
| nom        | VARCHAR(100)     | NOT NULL                              | Prénom / Nom                                     |
| role       | VARCHAR(150)     | NULL                                  | Rôle dans l'équipe                               |
| couleur    | VARCHAR(7)       | NOT NULL DEFAULT '#253367'            | Couleur attribuée                                |
| taches     | TEXT             | NULL                                  | Liste des tâches (une par ligne)                 |
| created_at | DATETIME         | NOT NULL DEFAULT CURRENT_TIMESTAMP    | Date d'ajout                                     |

---

## Schéma des relations

```
piliers
  ├──< posts.pilier_id
  └──< idees.pilier_id

fichiers_pdf        (standalone)
charte_graphique    (standalone)
charte_notes        (standalone)
templates_canva     (standalone)
membres             (standalone)
```

---

## Arborescence des fichiers uploadés

```
uploads/
├── marronnier/
│   └── 2026_marronnier.pdf
├── emissions/
│   ├── 2026_01_emissions.pdf
│   ├── 2026_02_emissions.pdf
│   └── ...
├── jeux/
│   ├── 2026_01_jeux.pdf
│   └── ...
├── reporting/
│   ├── 2026_01_reporting.pdf
│   └── ...
└── charte/
    ├── charte_graphique.pdf
    └── logos.zip
```

---

## Notes techniques

- **Moteur** : InnoDB (support des clés étrangères)
- **Charset** : `utf8mb4` (support des emojis)
- **Stockage fichiers** : sur le serveur dans `uploads/`, jamais en base (contrairement au localStorage qui stockait le contenu en base64)
- **UUIDs** : générés côté serveur ou via `UUID()` en MySQL
- **Nommage** : convention `snake_case` pour toutes les colonnes

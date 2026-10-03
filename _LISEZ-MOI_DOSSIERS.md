# Plan du site : à quoi sert chaque dossier

Ce site est construit avec **Jekyll** et le thème **al-folio**. Beaucoup de fichiers
viennent du thème : ils sont nécessaires même si tu ne les modifies jamais.

> Ce fichier commence par `_`, donc Jekyll l'ignore : il n'apparaît pas sur le site.

---

## 1. Ce que tu modifies (ton contenu)

| Dossier / fichier | Rôle |
|---|---|
| `_pages/` | **Les pages du site.** `about.md` = accueil, `research.md` = Research, `teaching.md` = Teaching, `about-me.md` = About me, `cv.md` = CV, `404.md` = page d'erreur. |
| `_projects/` | Pages « projets » (encore remplies avec le texte d'exemple du thème, brouillons en cours). |
| `_data/` | Données structurées : `socials.yml` (liens et icônes : email, Scholar, CV…), `cv.yml` (contenu de la page CV), `coauthors.yml`, `venues.yml`, etc. |
| `_bibliography/papers.bib` | Tes publications au format BibTeX. |
| `assets/img/` | Images : photo de profil (`prof_pic.jpg`), logo, poster, images des projets (`1.jpg` à `12.jpg`). |
| `assets/files/` | **Les PDF à partager** (thèse, slides, rapports, lettres de recommandation). Lien direct : `https://adrien-rougier.github.io/assets/files/NOM.pdf` |
| `assets/pdf/` | CV en PDF, poster ActiveTigger. |
| `_config.yml` | Réglages généraux du site (nom, langue, options). À toucher avec précaution. |
| `Codes_pour_modifier_le_site.txt` | Ton aide-mémoire : comment modifier le texte et publier. |

## 2. Le moteur du thème (ne pas toucher, ne pas supprimer)

| Dossier / fichier | Rôle |
|---|---|
| `_layouts/` | Gabarits HTML des pages (squelette de chaque type de page). |
| `_includes/` | Morceaux réutilisables : en-tête, pied de page, menu… |
| `_sass/` | Styles (couleurs, polices, mise en page). |
| `_plugins/` | Petits programmes Ruby qui ajoutent des fonctions à Jekyll. |
| `_scripts/` | Scripts JavaScript (galerie photo, recherche…). |
| `assets/css`, `assets/js`, `assets/fonts`, `assets/webfonts` | Feuilles de style, scripts et polices utilisés par le thème. Ton propre style est dans `assets/css/minimal.css`. |
| `Gemfile`, `Gemfile.lock` | Liste des modules Ruby nécessaires à Jekyll. |
| `purgecss.config.js` | Utilisé par le déploiement pour alléger le CSS. |
| `.github/workflows/deploy.yml` | **Le déploiement** : à chaque `git push`, GitHub construit le site et le publie (branche `gh-pages`). Indispensable. |
| `.github/workflows/jekyll.yml` | Second déploiement, ajouté à la main (doublon probable de `deploy.yml`). |
| `robots.txt` | Indications pour les moteurs de recherche. |
| `LICENSE`, `README.md` | Licence du thème, description du dépôt. |

## 3. Généré automatiquement (ne pas modifier, supprimable sans risque)

| Dossier | Rôle |
|---|---|
| `_site/` | Le site construit en local par `bundle exec jekyll serve`. Recréé à chaque fois (environ 200 Mo). |
| `.jekyll-cache/` | Cache de Jekyll. Recréé automatiquement. |
| `vendor/`, `.bundle/` | Modules Ruby installés en local (environ 180 Mo). Nécessaires pour voir le site en local ; `bundle install` les réinstalle. |
| `.git/` | Historique git. **Ne jamais supprimer.** |
| `.DS_Store` | Fichier caché du Finder macOS. Inutile. |

## 4. Fichiers RStudio (personnels)

| Fichier | Rôle |
|---|---|
| `adrien-rougier.github.io.Rproj`, `.Rproj.user/` | Projet RStudio, si tu ouvres le site avec RStudio. |
| `.Rhistory`, `_pages/.Rhistory`, `_projects/.Rhistory` | Historique des commandes R. Inutiles pour le site. |
| `Liens pour ameliorer/` | Tes notes R / Rmd. |

## 5. Ménage du 3 octobre 2026

Supprimés car inutiles pour ce site : fichiers Docker, outils de développement du thème,
tests automatiques GitHub (il ne reste que `deploy.yml` et `jekyll.yml`), rapports
lighthouse, fichiers de démo (audio, vidéo, jupyter, plotly, images d'exemple) et le
dossier `A_ajouter/`, qui ne contenait que des doublons. Tout reste récupérable dans
l'historique git.

`_config.yml` → `exclude:` liste les fichiers que Jekyll ne doit **pas** publier en ligne
(tes notes, le projet RStudio, l'aide-mémoire). Si tu ajoutes un fichier personnel à la
racine, ajoute-le aussi à cette liste.

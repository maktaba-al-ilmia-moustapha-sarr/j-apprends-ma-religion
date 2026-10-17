# AK Dreams Book — J'apprends ma religion

Plateforme éducative statique (sans backend), 113 cartes FR/WO/AR validées.
Traduction arabe ajoutée et validée par le propriétaire.

Design : vert émeraude profond + doré sobre + fonds ivoire, Amiri (AR) + Inter (FR/WO),
mise en page aérée tous âges. Image d'accueil : `assets/cover.jpg` (couverture réelle, page 1 du PDF).

## Lancer localement
```bash
cd "/Users/user/Desktop/j'apprends ma religion"
python3 -m http.server 8000
# ouvrir http://localhost:8000
```
Double-clic sur `index.html` marche aussi, mais le serveur local est recommandé.

## Publier
- **Netlify Drop** : glisser le dossier sur app.netlify.com/drop.
- **GitHub Pages** : pousser le dossier, activer Pages (branche main, dossier root).
- **Vercel** : `vercel` dans le dossier.

## Admin
Ouvrir `admin.html`, mot de passe défaut `akdreams2026`.
Modifications sauvegardées en `localStorage` (durable sur l'appareil) + Export/Import JSON pour partager.
Sécurité réelle multi-utilisateurs = backend nécessaire (Supabase/Firebase) — non inclus, dit honnêtement dans la page.

## Validation humaine requise
- Cartes `r:1` (≈45) : ordre FR/WO incertain, wolof manquant, doublons (ex. « 99 noms » p.2/p.5, « Cite cinq prophètes » p.6/p.7).
- Tout le champ AR à faire relire par un enseignant, jamais auto-traduit.
- Noms propres wolof (ex. Kunyas, tribus) à faire valider.

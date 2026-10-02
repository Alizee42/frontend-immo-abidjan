# ImmoAbidjan — Frontend

Application web Angular SSR (Server-Side Rendering) pour une plateforme immobilière ciblant Abidjan, Côte d'Ivoire. Permet aux visiteurs de parcourir les annonces de vente et de location, de lire des articles de blog et de contacter l'agence.

## Stack technique

| Technologie | Version |
|---|---|
| Angular | 19.2 |
| Angular SSR (`@angular/ssr`) | 19.2.19 |
| Express (serveur SSR) | 4.18 |
| TypeScript | 5.7 |
| RxJS | 7.8 |
| Netlify Angular runtime | 3.0 |
| Angular CLI | 19.2.19 |

## Prérequis

- Node.js 18+
- Angular CLI 19 (`npm install -g @angular/cli@19`)
- Backend `backend-immo-abidjan` démarré sur `localhost:8082`

## Installation et lancement

```bash
npm install

# Serveur de développement
ng serve
# Application disponible sur http://localhost:4200

# Build de production (SSR)
ng build
node dist/frontend-immo-abidjan/server/server.mjs
```

## Pages

| Route | Description |
|---|---|
| `/` | Page d'accueil |
| `/acheter-louer` | Liste des biens avec filtres (type, quartier, statut) |
| `/blog` | Articles de blog |
| `/contact` | Formulaire de contact |
| `/projet` | Présentation du projet immobilier |

## Fonctionnalités

- Filtrage des biens par type (`VENTE` / `LOCATION`), quartier et statut (`DISPONIBLE` / `RESERVE` / `VENDU`)
- Composants Angular standalone chargés en lazy-loading
- SSR avec Node.js / Express pour l'indexation SEO
- Déploiement Netlify via `@netlify/angular-runtime`

## Services principaux

- `PropertyService` — récupère et filtre les biens
- `BlogService` — récupère les articles de blog
- `ContactService` — envoie les formulaires de contact

#P02_E01_Et01: Observations d'architecture


- Anti-pattern : `HomeComponent` injecte `HttpClient` et charge directement les données depuis `assets/mock/olympic.json` au lieu de passer par un service dédié. 
(`src/app/pages/home/home.component.ts:19-22`).

- Anti-pattern : `HomeComponent` contient directement la transformation des données métier (années, pays et médailles). 
(`src/app/pages/home/home.component.ts:25-30`).

- Anti-pattern : `HomeComponent` construit directement le graphique avec Chart.js ; cette logique pourrait être isolée dans un service ou un composant de visualisation. 
(`src/app/pages/home/home.component.ts:39-65`).

- Problématique de typage : `HomeComponent` utilise `any[]` et plusieurs paramètres `any`, ce qui masque la structure des données métier. 
(`src/app/pages/home/home.component.ts:22-30`).

- Anti-pattern : `CountryComponent` injecte `HttpClient` et charge directement les données depuis `assets/mock/olympic.json` au lieu de passer par un service dédié. 
(`src/app/pages/country/country.component.ts:21-27`).

- Anti-pattern : `CountryComponent` contient directement la recherche du pays et le calcul des participations, médailles et athlètes. 
(`src/app/pages/country/country.component.ts:30-37`).

- Anti-pattern : `CountryComponent` construit directement le graphique avec Chart.js et mélange affichage et logique de visualisation. 
(`src/app/pages/country/country.component.ts:48-69`).

- Problématique de typage : `CountryComponent` utilise `any[]`, `any` et `totalEntries: any` pour les données métier. 
(`src/app/pages/country/country.component.ts:15-18` et `src/app/pages/country/country.component.ts:22-37`).

- Problématique de robustesse : `CountryComponent` accède à `selectedCountry.country` sans vérifier que le pays demandé existe, ce qui peut provoquer une erreur à l'exécution. 
(`src/app/pages/country/country.component.ts:30-31`).

- Code inutile : les appels HTTP utilisent `.pipe()` sans opérateur ; cet appel peut être supprimé.
(`src/app/pages/home/home.component.ts:22` et `src/app/pages/country/country.component.ts:27`).

- Emplacement des fichiers : aucun service n'a été trouvé dans `src/app/components`; il n'y a donc pas de service mal placé à signaler actuellement.

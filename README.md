# PoupiGames

Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Installation du projet

### Installer les prérequis
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)

### Cloner le dépôt

Dans un terminal exécuter :
```bash
git clone https://github.com/zangdaarrr/poupi-games
```

### Installer les dépendance
Dans un terminal exécuter :
```bash
npm ci
```

## Démarrer le serveur de développement
Exécuter `npm start` pour le serveur de développement. L'application est disponible à l'URL `http://localhost:4200/`. L'application redémarre automatiquement lors d'un changement de fichier.

## Déployer le projet

Exécuter `npm run build` pour construire le projet avant déploiement.

Une fois le projet construit, exécuter `npx firebase deploy`

## Liens

* [Excalibur](https://excaliburjs.com/docs)
* [Angular](https://angular.io)

## Etapes de contruction du projet

Pour créer Poupi Games, on a utilisé Angular CLI :

```bash
npx @angular/cli new poupi-games
```

Création des composants qui correspondent aux pages du site :

```bash
npx ng generate component jeux1
```

Configuration les routes pour les composants :

```typescript
const routes: Routes = [
  { path: 'jeux1', component: Jeux1Component },
  ...
];
```
Ajout des liens dans le composants racine :

```html
<li><a routerLink="/jeux1"><i class="fas fa-gamepad"></i>Casse-briques</a></li>
...
<router-outlet></router-outlet>
```



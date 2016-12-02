# Boilerplate

Pack de démarrage pour une solution statique. Le site est généré dans un dist.

## Installation

- Dernière version stable de [Node.js](https://nodejs.org/en/) (>= 4.1)
- Dépendances `npm i`

## Commandes

- Démarrer le projet : `npm start`
- Build production : `npm run build`

## Structure

- assets : contient les images, icones, CSS et JS globals
- components : éléments du site découpés sous forme de composants
- utils : fonction JS et/ou classes CSS à but principalement utilitaire
- views : pages du site

## Compatibilité navigateurs

Ce boilerplate utilise [autoprefixer](https://github.com/postcss/autoprefixer) qui lit le fichier `browserlist` à la racine.
Par défaut, il est configuré sur IE8+. Vous pouvez retrouver les différentes options [sur le github de Browserlist](https://github.com/ai/browserslist).

**Note importante :** ce projet utilise EcmaScript 2015 via Babel, certaines fonctionnalités nécessitent [d'être polyfié](https://babeljs.io/docs/usage/polyfill/).

## Priorité aux composants

Permet un meilleur support et une possibilité de ré-utilisation
Un composant peut comporter :

- index.js
- index.css

## Chemin import

Dans les fichiers JavaScript, les `import` des composants ou autres fichiers se fait à partir de **src**. Pour changer cette configuration, il faut changer l'objet `resolve` dans __webpack.config.js__.

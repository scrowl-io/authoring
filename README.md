# Scrowl Authoring

## Getting Started

This project uses [yarn](https://yarnpkg.com/) to manage dependencies, you will need to have that installed.

`npm install yarn -g`

Install [lerna](https://lerna.js.org/) globally.

`yarn global lerna`

Next install the project.

`lerna bootstrap`

After that is complete, you can start the project.

`yarn start`

## Developing

The core project is in `packages/editor`, it is an [electron](https://www.electronjs.org/) app. The backend (main) and frontend (renderer) processes are both in [typescript](https://www.typescriptlang.org/). The frontend uses [react](https://reactjs.org/) and [react bootstrap](https://react-bootstrap.github.io/).

# Scrowl



This project is an Content Authoring tool built with [Electron](https://www.electronjs.org/). This application can be used to create courses for Learning Management Systems (LMSs). What makes this tool different than others, is the dynamic template system. Our template system allows developers to code their own, offering a great degree of flexibility.

## Acknowledgement
![tri-wordmark](https://raw.githubusercontent.com/scrowl-io/authoring/main/eo-tri-wordmark-english-black.png)
This Employment Ontario project is funded in part by the Government of Canada and the Government of Ontario

## Getting Started

This project uses [yarn](https://yarnpkg.com/) to manage dependencies, you will need to have that installed.

`npm install yarn -g`

Install [lerna](https://lerna.js.org/) globally.

`yarn global lerna`

Next install the project.

`lerna bootstrap`

After that is complete, you'll need to build a few internal packages

`yarn update`

Finally, you can start the project

`yarn start`

## Developing

This project is mono repo consisting of a number of packages, each of which is written in [typescript](https://www.typescriptlang.org/). Additionally, any package that contains UI is written with [react](https://reactjs.org/).

#### Editor

This package is the electron application and is the core of the project.

`yarn start` will launch the application.

`yarn start:update` will build internal packages that the app relies on, then launch.

`yarn package` will build internal packages and then build platform specific executables.

<br />

> Whenever you make changes to any package that isn't the editor, use `yarn start:update` to get those changes to be applied to the editor.

<br />

#### Player

When a user publishes a project, this package is used to run that content as a course in an LMS.

While within the player package, you can `yarn start` to launch a dev environment for isolated development.

#### Runtime

This package is a helper library that facilitates communication between the player and the LMS. The standard for this communication is [SCORM](https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/).

#### Templates

> **Core** is not an actual template but a provider of useful APIs to manage content.

Within the package of each template (with exception to core), you can `yarn start` to launch a dev environment and develop the template in isolation.

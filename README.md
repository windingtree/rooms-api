# Rooms API

This repository contains the source code for the Rooms API. It is written in TypeScript, uses [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/). The UI for Rooms project is available at [windingtree/rooms-ui](https://github.com/windingtree/rooms-ui).

## Prerequisites

Please run `npm install` in the project root directory. Also, please see the documentation in [_docker/README.md](./_docker/README.md), which describes how to run MongoDB locally as a Docker container (with proper seeding).

## Building for production use

To build API source code:

```shell
npm run build
```

This generates JS code in `build` folder.

## Local dev

To develop, it is recommended to use the following approach.

First, we continuously generate the JS source code using `tsc` watch mode:

```shell
npm run build:watch
```

Then, in a separate terminal, run the server in watch mode (utilizing [nodemon](https://www.npmjs.com/package/nodemon) under the hood):

```shell
npm run start
```

## Tests

To run unit tests:

```shell
npm run test
```

## Linting

To lint API source code against project defined ESLint rules:

```shell
npm run lint
```

To make ESLint try and automatically fix errors/warnings:

```shell
npm run lint:fix
```

## Code documentation

You can find more details about the structure of the code base, and a discussion of some architectural decisions in [docs/README](./docs/README.md) file.


## License

This project is licensed under the MIT license. See [LICENSE](./LICENSE) for more details.

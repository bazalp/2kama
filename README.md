<div align="center" style="text-align: center"><img src="https://raw.githubusercontent.com/souricevincent/2kama/master/media/2kama-logo.svg" width="230" alt="2kama logo"/></div>


# 2kama
2kama is a development framework based on [esbuild](https://esbuild.github.io/). It comes to correct some performance problems that we encounter when we develop with other builders and mainly [create-react-app](https://create-react-app.dev/) which works with [webpack](https://webpack.js.org/).

## Why ?
If you have already created a react application with create-react-app you must have realized that it is too slow for 2022.
Moreover, I think that the builder still has a future in development because it allows to keep close the development framework and the production.

## His ambitions
Nevertheless, with 2kama the objective is to offer a pleasant and turnkey development experience by offering features that are dear to us developers.

## Philosophy
Moreover, the philosophy of this project is: small and fast, that's why it relies on a handful of carefully chosen packages.

## Road map
- [x] Creation of a test react app
- [x] Setting up esbuild
- [x] Proxy between the browser and the esbuild server
- [x] watching the source folder files
- [x] Setting up the socket server
- [x] Esbuild plugin to add the socket client to the entry point
- [ ] Client socket
- [ ] Socket messages for hot reload
- [ ] Port Discovery
- [ ] React-refresh
- [ ] Typescript
- [ ] Write tests
...And many others, but not too many either!

## Participation
It's with great pleasure that I would accept participations to this project

To start the project :
- Create a fork
- git clone
- npm run watch:dev
- Make great features
- Make a PR

## Some resources to help me
- Port Discovery : https://github.com/http-party/node-portfinder

- To parse XML : ttps://www.npmjs.com/package/fast-xml-parser

# react-ideation
A react app all about ideation.

## Technology stack

**📏 [React](https://facebook.github.io/react/) 🦄 [Babel](https://babeljs.io/) 🐣 [CSS modules](https://github.com/css-modules/css-modules) 🤷‍♂️  [Jest](https://facebook.github.io/jest/) 🕶 [Enzyme](http://airbnb.io/enzyme/)**

## Prerequisites

- [Node.js v8.3.0+](https://nodejs.org/)
- Node package manager v5.3.0+
- Run `npm install`

## Debugging

To start debugging run `npm run debug`, this will start a debug development server at http://localhost:9001.

## Building

To build the web application run `npm run build`, this will generate a static version of the web application in the directory `dist`.

_Note that you must expose an API BASE URL via the environmental variable_ `API_BASE_URL`<br>
_In example_ `npx cross-env API_BASE_URL=https://my.api`

## Testing

To lint the source code run `npm run lint`, this will report any linting issues, to unit test the source code run `npm run unit`, this will report any unit test failures and source coverage.

**To run all tests run `npm test`**

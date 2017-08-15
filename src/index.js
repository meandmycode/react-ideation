/* globals API_BASE_URI */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';

import JsonRest from './services/json-rest';
import GraphSerializer from './utils/graph-serializer';

import createStore from './store';
import App from './containers/app';

import './styles/host.css';

const ideasService = new JsonRest(`${API_BASE_URI}/ideas`, GraphSerializer);

const deps = {
    ideasService,
};

const statePersister = persistState(undefined, { ...GraphSerializer });
const devtoolsEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const enhancers = devtoolsEnhancer
    ? [statePersister, devtoolsEnhancer]
    : [statePersister];

const store = createStore(deps, enhancers);

const root = (
    <Provider store={store}>
        <App />
    </Provider>
);

render(root, document.querySelector('[data-app-root]'));

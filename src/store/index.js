import { createStore, applyMiddleware, compose } from 'redux';

import async from './async-middleware';
import dependencies from './depends-middleware';
import reducer from '../reducer';

export default (deps, enhancers) => {

    const middleware = [
        dependencies(deps),
        async,
    ];

    const middlewareEnhancer = applyMiddleware(...middleware);
    const enhancer = compose(middlewareEnhancer, ...enhancers);

    return createStore(reducer, enhancer);

};

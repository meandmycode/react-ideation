import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import async from './async-middleware';
import reducer from '../reducer';

export default (deps, enhancers) => {

    const middleware = [
        thunk.withExtraArgument(deps),
        async,
    ];

    const middlewareEnhancer = applyMiddleware(...middleware);
    const enhancer = compose(middlewareEnhancer, ...enhancers);

    return createStore(reducer, enhancer);

};

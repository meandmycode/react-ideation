import configureStore from 'redux-mock-store';

import { STATUS_PENDING, STATUS_SUCCESS, STATUS_FAILURE } from '../constants/async-states';

import asyncMiddleware from './async-middleware';

test('Dispatches a successful async sequence for a resolved promise', async () => {

    // arrange
    const middleware = [
        asyncMiddleware,
    ];

    const store = configureStore(middleware)();

    const type = 'FAKE_ACTION';
    const result = 42;
    const payload = Promise.resolve(result);

    // act
    store.dispatch({ type, payload });

    await payload;

    // assert
    expect(store.getActions()).toEqual([
        { type, status: STATUS_PENDING },
        { type, status: STATUS_SUCCESS, payload: result },
    ]);

});

test('Dispatches a failing async sequence for a rejected promise', async () => {

    // arrange
    const middleware = [
        asyncMiddleware,
    ];

    const store = configureStore(middleware)();

    const type = 'FAKE_ACTION';
    const error = new Error('FAKE_ERROR');
    const payload = Promise.reject(error);

    // act
    store.dispatch({ type, payload });

    await payload.catch(() => {});

    // assert
    expect(store.getActions()).toEqual([
        { type, status: STATUS_PENDING },
        { type, status: STATUS_FAILURE, error },
    ]);

});

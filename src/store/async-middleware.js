import { STATUS_PENDING, STATUS_FAILURE, STATUS_SUCCESS } from '../constants/async-states';

export default ({ dispatch }) => next => action => {

    // for async actions, we expect a 'payload' property that will be awaited,
    // we don't want to dispatch the action with the promise so we split it out
    // such that 'etc' then contains the rest of the properties that will act
    // as the base event when dispatching the async status changes
    const { payload, ...etc } = action;

    // however, if we didn't get a payload property, or it isn't 'thenable'
    // then we should just bail out and continue to the next middleware
    if (payload == null || typeof payload.then !== 'function') {
        return next(action);
    }

    // as the async work starts, fire off a pending action
    dispatch({ ...etc, status: STATUS_PENDING });

    // and then hookup to the promise, dispatching success or failure
    payload.then(
        payload => dispatch({ ...etc, status: STATUS_SUCCESS, payload }),
        error => dispatch({ ...etc, status: STATUS_FAILURE, error }),
    );
};

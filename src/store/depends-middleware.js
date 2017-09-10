export default dependencies => () => next => maybeAction => {

    const action = typeof maybeAction === 'function'
        ? maybeAction(dependencies)
        : maybeAction;

    return next(action);
};

import configureStore from 'redux-mock-store';

import { SET_IDEA_SORT_TYPE, SET_IDEA_SORT_DESCENDING } from '../constants/action-types';

import * as ideaViewActions from './ideas-view';

test('Dispatches a set sort type action correctly', () => {

    // arrange
    const store = configureStore()();
    const sortType = 'sorter';

    // act
    store.dispatch(ideaViewActions.setSortType(sortType));

    // assert
    expect(store.getActions()).toEqual([
        { type: SET_IDEA_SORT_TYPE, sortType },
    ]);

});

test('Dispatches a set sort descending action correctly', () => {

    // arrange
    const store = configureStore()();
    const sortDescending = true;

    // act
    store.dispatch(ideaViewActions.setSortDescending(sortDescending));

    // assert
    expect(store.getActions()).toEqual([
        { type: SET_IDEA_SORT_DESCENDING, sortDescending },
    ]);

});

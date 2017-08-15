import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import { LIST_IDEAS, UPSERT_IDEA, REMOVE_IDEA } from '../constants/action-types';

import * as ideaActions from './ideas';

const createMockStore = (deps = {}) => {

    const middleware = [
        thunk.withExtraArgument(deps),
    ];

    const mockStore = configureStore(middleware);

    return mockStore();
};

test('Dispatches a list action correctly', () => {

    // arrange
    const payload = [];

    const list = () => payload;

    const ideasService = {
        list,
    };

    const store = createMockStore({ ideasService });

    // act
    store.dispatch(ideaActions.list());

    // assert
    expect(store.getActions()).toEqual([
        { type: LIST_IDEAS, payload },
    ]);

});

test('Invokes `ideasService.list` when invoking the list action', () => {

    // arrange
    const list = sinon.spy();

    const ideasService = {
        list,
    };

    const store = createMockStore({ ideasService });

    // act
    store.dispatch(ideaActions.list());

    // assert
    expect(list.args).toEqual([[]]);

});

test('Dispatches an upsert action correctly for a non-flushing upsert', () => {

    // arrange
    const item = {};
    const entity = {};

    const store = createMockStore();

    // act
    store.dispatch(ideaActions.upsert(item, entity));

    // assert
    expect(store.getActions()).toEqual([
        { type: UPSERT_IDEA, item, entity },
    ]);

});

test('Invokes `ideasService.create` when invoking the upsert action when flushing and no entity reference', () => {

    // arrange
    const create = sinon.spy();

    const ideasService = {
        create,
    };

    const store = createMockStore({ ideasService });

    const item = {};

    // act
    store.dispatch(ideaActions.upsert(item, null, true));

    // assert
    expect(create.args).toEqual([[item]]);

});

test('Invokes `ideasService.update` when invoking the upsert action when flushing with an entity reference', () => {

    // arrange
    const update = sinon.spy();

    const ideasService = {
        update,
    };

    const store = createMockStore({ ideasService });

    const key = 42;
    const item = {};
    const entity = { key };

    // act
    store.dispatch(ideaActions.upsert(item, entity, true));

    // assert
    expect(update.args).toEqual([[key, item]]);

});

test('Dispatches a remove action correctly for a non-flushing remove', () => {

    // arrange
    const entity = {};

    const store = createMockStore();

    // act
    store.dispatch(ideaActions.remove(entity));

    // assert
    expect(store.getActions()).toEqual([
        { type: REMOVE_IDEA, entity },
    ]);

});

test('Invokes `ideasService.remove` when invoking the remove action when flushing', () => {

    // arrange
    const remove = sinon.spy();

    const ideasService = {
        remove,
    };

    const store = createMockStore({ ideasService });

    const key = 42;
    const entity = { key };

    // act
    store.dispatch(ideaActions.remove(entity, true));

    // assert
    expect(remove.args).toEqual([[key]]);

});

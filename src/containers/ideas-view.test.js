import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { IdeasView } from './ideas-view';
import Idea from '../components/idea';

test('Invokes onList when mounting', () => {

    // arrange
    const onList = sinon.spy();

    const ideas = [];
    const ideasView = {
        sorter: {},
    };

    const props = { ideas, ideasView, onList };

    // act
    mount(<IdeasView {...props} />);

    // assert
    expect(onList.args).toEqual([[]]);

});

test('Invokes onUpsert with the change, entity and without flush when a child idea is changing', () => {

    // arrange
    const onUpsert = sinon.spy();

    const entity = {
        ephemeral: 1,
    };

    const ideas = [entity];

    const ideasView = {
        sorter: {},
    };

    const props = { ideas, ideasView, onUpsert };

    const change = {};

    // act
    const wrapper = shallow(<IdeasView {...props} />);

    wrapper.find(Idea).props().onChanging(change);

    // assert
    expect(onUpsert.args).toEqual([[change, entity]]);

});

test('Invokes onUpsert with the change, entity and flush when a child idea has changed', () => {

    // arrange
    const onUpsert = sinon.spy();

    const entity = {
        ephemeral: 1,
    };

    const ideas = [entity];

    const ideasView = {
        sorter: {},
    };

    const props = { ideas, ideasView, onUpsert };

    const change = {};

    // act
    const wrapper = shallow(<IdeasView {...props} />);

    wrapper.find(Idea).props().onChanged(change);

    // assert
    expect(onUpsert.args).toEqual([[change, entity, true]]);

});

test('Invokes onRemove with entity and flush when a child idea is removed', () => {

    // arrange
    const onRemove = sinon.spy();

    const entity = {
        ephemeral: 1,
    };

    const ideas = [entity];

    const ideasView = {
        sorter: {},
    };

    const props = { ideas, ideasView, onRemove };

    // act
    const wrapper = shallow(<IdeasView {...props} />);

    wrapper.find(Idea).props().onRemove();

    // assert
    expect(onRemove.args).toEqual([[entity, true]]);

});

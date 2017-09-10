import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { IdeasView } from './ideas-view';
import Idea from '../components/idea';

test('Invokes onList when mounting', () => {

    // arrange
    const onList = sinon.spy();

    const ideas = [];

    const props = { ideas, onList };

    // act
    mount(<IdeasView {...props} />);

    // assert
    expect(onList.args).toEqual([[]]);

});

test('Invokes onUpdate with the change, entity and without flush when a child idea is changing', () => {

    // arrange
    const onUpdate = sinon.spy();

    const entity = {
        trackingKey: 1,
    };

    const ideas = [entity];

    const props = { ideas, onUpdate };

    const change = {};

    // act
    const wrapper = shallow(<IdeasView {...props} />);

    wrapper.find(Idea).props().onChanging(change);

    // assert
    expect(onUpdate.args).toEqual([[change, entity]]);

});

test('Invokes onUpdate with the change, entity and flush when a child idea has changed', () => {

    // arrange
    const onUpdate = sinon.spy();

    const entity = {
        trackingKey: 1,
    };

    const ideas = [entity];

    const props = { ideas, onUpdate };

    const change = {};

    // act
    const wrapper = shallow(<IdeasView {...props} />);

    wrapper.find(Idea).props().onChanged(change);

    // assert
    expect(onUpdate.args).toEqual([[change, entity, true]]);

});

test('Invokes onRemove with entity and flush when a child idea is removed', () => {

    // arrange
    const onRemove = sinon.spy();

    const entity = {
        trackingKey: 1,
    };

    const ideas = [entity];

    const props = { ideas, onRemove };

    // act
    const wrapper = shallow(<IdeasView {...props} />);

    wrapper.find(Idea).props().onRemove();

    // assert
    expect(onRemove.args).toEqual([[entity, true]]);

});

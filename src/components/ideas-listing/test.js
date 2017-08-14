import React from 'react';
import { shallow } from 'enzyme';

import IdeaListing from './';
import Idea from '../idea';

test('Can render a collection of entities', () => {

    // act
    const wrapper = shallow(
        <IdeaListing>
            <Idea />
            <Idea />
            <Idea />
        </IdeaListing>,
    );

    // assert
    expect(wrapper.find(Idea).length).toBe(3);

});

import React from 'react';
import { shallow } from 'enzyme';

import Filterbar from './';

const ChildComponent = () => null;

test('Can render a collection of entities', () => {

    // act
    const wrapper = shallow(
        <Filterbar>
            <ChildComponent />
            <ChildComponent />
            <ChildComponent />
            <ChildComponent />
        </Filterbar>,
    );

    // assert
    expect(wrapper.find(ChildComponent).length).toBe(4);

});

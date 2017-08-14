import React from 'react';
import { shallow } from 'enzyme';

import Filterbar from './';

test('Can render a collection of entities', () => {

    // act
    const wrapper = shallow(
        <Filterbar>
            <div />
            <div />
            <div />
            <div />
        </Filterbar>,
    );

    // assert
    expect(wrapper.find('div').length).toBe(5);

});

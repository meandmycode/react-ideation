import React from 'react';
import { shallow } from 'enzyme';

import Textarea from './';

// TODO: ideally we make some assertions about the input and spoof dimensions
// being linked on mount and update, however since we're rendering into jsdom,
// we dont have a layout, so we cannot make good assertions here

test('When a maxLength is not specified then `accepted` should match the value and `overspill` should be empty', () => {

    // arrange
    const value = 'Hello world';
    const onChange = () => {};

    const props = {
        value,
        onChange,
    };

    // act
    const wrapper = shallow(<Textarea {...props} />);

    // assert
    expect(wrapper.find('[data-part="accepted"]').text()).toBe(value);
    expect(wrapper.find('[data-part="overspill"]').text()).toBe('');

});

test('When a maxLength is given then `accepted` should match everything until that position with `overspill` being everything after', () => {

    // arrange
    const value = 'Hello world';
    const maxLength = 5;
    const onChange = () => {};

    const props = {
        value,
        maxLength,
        onChange,
    };

    // act
    const wrapper = shallow(<Textarea {...props} />);

    // assert
    expect(wrapper.find('[data-part="accepted"]').text()).toBe(value.slice(0, maxLength));
    expect(wrapper.find('[data-part="overspill"]').text()).toBe(value.slice(maxLength));

});

import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Button from './';

test('Can render the button', () => {

    // act
    const wrapper = shallow(<Button>Hello world</Button>);

    // assert
    expect(wrapper.text()).toBe('Hello world');

});

test('Sets a default tab index', () => {

    // act
    const wrapper = mount(<Button>Hello world</Button>);

    // assert
    expect(wrapper.getDOMNode().tabIndex).toBe(0);

});

test('Respects an overriden tab index', () => {

    // act
    const wrapper = mount(<Button tabIndex={42}>Hello world</Button>);

    // assert
    expect(wrapper.getDOMNode().tabIndex).toBe(42);

});

test('Invokes onClick when clicking', () => {

    // arrange

    const onClick = sinon.spy();

    // act
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click', 42);

    // assert
    expect(onClick.args).toEqual([[42]]);

});

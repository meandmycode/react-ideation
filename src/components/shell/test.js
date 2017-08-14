import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Shell from './';

test('Can render the shell', () => {

    // act
    const wrapper = shallow(<Shell />);

    // assert
    expect(wrapper.find('[name="header"]').exists()).toBeTruthy();
    expect(wrapper.find('[name="heading"]').exists()).toBeTruthy();
    expect(wrapper.find('[name="filters"]').exists()).toBeTruthy();
    expect(wrapper.find('[name="view"]').exists()).toBeTruthy();

});

test('Invokes onCreateIdea when clicking the create button', () => {

    // arrange

    const onCreateIdea = sinon.spy();

    // act
    const wrapper = shallow(<Shell onCreateIdea={onCreateIdea} />);
    wrapper.find('[name="createIdea"]').simulate('click');

    // assert
    expect(onCreateIdea.args).toEqual([[]]);

});

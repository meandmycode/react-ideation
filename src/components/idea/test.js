import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Idea from './';

test('Can render an idea', () => {

    // arrange
    const idea = {
        title: 'Hello world',
        body: 'Hello body',
    };

    // act
    const wrapper = shallow(<Idea idea={idea} />);

    // assert
    expect(wrapper.find('[name="title"]').props().value).toBe(idea.title);
    expect(wrapper.find('[name="body"]').props().value).toBe(idea.body);
    expect(wrapper.find('[name="counter"]').text()).toBe(String(140 - idea.body.length));

});

test('Automatically focuses on the title input when mounting if autofocus is specified', () => {

    // act
    const wrapper = mount(<Idea autofocus />);

    // assert
    expect(wrapper.find('[name="title"]').getDOMNode()).toBe(document.activeElement);

});

test('Specifies body content is overspilling when longer than 140 characters', () => {

    // arrange
    const idea = {
        body: 'Gummies oat cake gummi bears. Gummi bears cake cotton candy chocolate gummi bears powder gummies gummies. Croissant apple pie marzipan cookie danish gummies chocolate jelly.',
    };

    // act
    const wrapper = mount(<Idea idea={idea} />);

    // assert
    expect(wrapper.find('[name="counter"]').getDOMNode().hasAttribute('data-overspill')).toBeTruthy();

});

test('Specifies an error exists when an issue is specified', () => {

    // arrange
    const issue = {};

    // act
    const wrapper = mount(<Idea issue={issue} />);

    // assert
    expect(wrapper.getDOMNode().hasAttribute('data-error')).toBeTruthy();

});

test('Invokes onChanging when the title changes', () => {

    // arrange
    const idea = {
        title: 'Hello world',
    };

    const newTitle =  'Ch-ch-ch-ch-changes';

    const onChanging = sinon.spy();

    // act
    const wrapper = shallow(<Idea idea={idea} onChanging={onChanging} />);
    wrapper.find('[name="title"]').simulate('change', { target: { name: 'title', value: newTitle } });

    // assert
    expect(onChanging.args).toEqual([[{ ...idea, title: newTitle }]]);

});

test('Invokes onChanged when the title loses focus and the value has changed', () => {

    // arrange
    const idea = {
        title: 'Hello world',
    };

    const newTitle =  'Ch-ch-ch-ch-changes';

    const onChanged = sinon.spy();

    // act
    const wrapper = shallow(<Idea idea={idea} onChanged={onChanged} />);
    wrapper.find('[name="title"]').simulate('blur', { target: { name: 'title', value: newTitle } });

    // assert
    expect(onChanged.args).toEqual([[{ ...idea, title: newTitle }]]);

});

test('Invokes onChanging when the body changes', () => {

    // arrange
    const idea = {
        body: 'Hello body',
    };

    const newBody =  'Ch-ch-ch-ch-changes';

    const onChanging = sinon.spy();

    // act
    const wrapper = shallow(<Idea idea={idea} onChanging={onChanging} />);
    wrapper.find('[name="body"]').simulate('change', { target: { name: 'body', value: newBody } });

    // assert
    expect(onChanging.args).toEqual([[{ ...idea, body: newBody }]]);

});

test('Invokes onRemove when the delete button clicked', () => {

    // arrange
    const onRemove = sinon.spy();

    // act
    const wrapper = shallow(<Idea onRemove={onRemove} />);
    wrapper.find('[name="deleteButton"]').simulate('click');

    // assert
    expect(onRemove.called).toBe(true);

});

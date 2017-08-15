import React from 'react';

import styles from './style.css';

import { SORT_FIELD_CREATED_AT, SORT_FIELD_TITLE } from '../../constants/sort-types';
import Filterbar from '../filterbar';
import Button from '../button';
import Dropdown from '../dropdown';

const sorts = new Map([
    [SORT_FIELD_CREATED_AT, 'Date'],
    [SORT_FIELD_TITLE, 'Title'],
]);

export default class Shell extends React.PureComponent {

    handleCreateIdea = () => this.props.onCreateIdea();
    handleChangeSortDescending = () => this.props.onChangeSortDescending(!this.props.sortDescending);

    render() {

        // note: since we're going to spread all other props onto our host, we bring
        // a bunch of handled props into scope here on purpose so they don't pass down
        // eslint-disable-next-line no-unused-vars
        const { children, sortType, sortDescending, sortTypes, onCreateIdea, onChangeSortType, onChangeSortDescending, ...props } = this.props;

        return (
            <div className={styles.host} {...props}>
                <div name='header' className={styles.header}>
                    <div name='heading' className={styles.heading} title='Ideation.app'>IA</div>
                    <Filterbar name='filters' className={styles.commands}>
                        <Dropdown
                            name='changeSortType'
                            options={sortTypes}
                            selected={sortType}
                            title='Change sort type'
                            onChange={onChangeSortType}>
                            {sortType => sorts.get(sortType)}
                        </Dropdown>
                        <Button onClick={this.handleChangeSortDescending} title='Change sort direction'>
                            <div style={{ transform: 'scale(1.4)' }}>
                                {sortDescending ? '🠕' : '🠗'}
                            </div>
                        </Button>
                        <Button name='createIdea' onClick={this.handleCreateIdea} title='Record a new idea' data-cta>
                            +
                        </Button>
                    </Filterbar>
                </div>
                <div name='view' className={styles.view}>
                    {children}
                </div>
            </div>
        );
    }
}

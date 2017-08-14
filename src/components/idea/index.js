import React from 'react';
import classNames from 'classnames';

import Textarea from '../textarea';

import styles from './style.css';

const MAX_TITLE_LENGTH = 18;
const MAX_BODY_LENGTH = 140;

export default class Idea extends React.PureComponent {

    static defaultProps = {
        idea: {},
        autofocus: false,
    }

    handleChange = event => {

        const { name, value } = event.target;
        const { idea, onChanging } = this.props;

        onChanging({ ...idea, [name]: value });

    }

    handleBlur = event => {

        const { name, value } = event.target;
        const { idea, onChanged } = this.props;

        onChanged({ ...idea, [name]: value });

    }

    componentDidMount() {

        if (this.props.autofocus) {
            this.title.focus();
        }

    }

    render() {

        // note: since we're going to spread all other props onto our host, we bring
        // a bunch of handled props into scope here on purpose so they don't pass down
        // eslint-disable-next-line no-unused-vars
        const { idea, issue, className, autofocus, onChanging, onChanged, onRemove, ...props } = this.props;
        const remaining = MAX_BODY_LENGTH - (idea.body ? idea.body.length : 0);

        return (
            <div className={classNames(styles.host, className)} data-error={issue ? '' : null} {...props}>
                <input
                    name='title'
                    ref={title => this.title = title}
                    className={styles.title}
                    value={idea.title || ''}
                    maxLength={MAX_TITLE_LENGTH}
                    placeholder='The best idea'
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <Textarea
                    name='body'
                    className={styles.body}
                    value={idea.body || ''}
                    maxLength={MAX_BODY_LENGTH}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <div className={styles.statusBar}>
                    <div
                        name='counter'
                        className={styles.remainingCounter}
                        data-overspill={0 > remaining ? '' : null}>
                        {remaining}
                    </div>
                </div>
                <div
                    name='deleteButton'
                    className={styles.removeBtn}
                    title='Delete this idea'
                    onClick={onRemove}
                />
            </div>
        );
    }
}

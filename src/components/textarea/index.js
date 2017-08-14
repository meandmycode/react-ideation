import React from 'react';
import classNames from 'classnames';

import styles from './style.css';

export default class Textarea extends React.PureComponent {

    updateInput() {

        const { spoof, input } = this;
        const { height } = spoof.getBoundingClientRect();

        input.style.height = `${height}px`;
        input.scrollTop = 0;

    }

    componentDidMount() {
        this.updateInput();
    }

    componentDidUpdate() {
        this.updateInput();
    }

    render() {

        const { value, name, maxLength = value.length, placeholder, className, onChange, onFocus, onBlur, ...props } = this.props;
        const accepted = value.slice(0, maxLength);
        const over = value.slice(maxLength);

        return (
            <div className={classNames(styles.host, className)} {...props}>
                <div ref={spoof => this.spoof = spoof} data-part='spoof' className={styles.highlighter}>
                    <span className={styles.accepted} data-part='accepted'>{accepted}</span>
                    <span className={styles.overspill} data-part='overspill'>{over}</span>
                </div>
                <textarea
                    name={name}
                    data-part='input'
                    ref={input => this.input = input}
                    className={styles.input}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
        );
    }
}

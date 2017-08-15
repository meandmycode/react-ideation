import React from 'react';
import classNames from 'classnames';

import styles from './style.css';

export default class Button extends React.PureComponent {

    render() {

        const { className, tabIndex = 0, children, ...props } = this.props;

        return (
            <div className={classNames(styles.host, className)} tabIndex={tabIndex} {...props}>
                {children}
            </div>
        );
    }
}

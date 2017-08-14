import React from 'react';
import classNames from 'classnames';

import styles from './style.css';

export default class Filterbar extends React.PureComponent {

    handleRenderChild = child => {

        const className = classNames(child.props.className, styles.filter);
        const props = { ...child.props, className };

        return React.cloneElement(child, props);
    }

    render() {

        const { children, className, ...props } = this.props;

        return (
            <div className={classNames(styles.host, className)} {...props}>
                {React.Children.map(children, this.handleRenderChild)}
            </div>
        );
    }
}

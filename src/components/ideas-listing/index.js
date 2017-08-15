import React from 'react';
import classNames from 'classnames';

import styles from './style.css';

export default class IdeasListing extends React.PureComponent {

    handleRenderChild = child => {

        const className = classNames(child.props.className, styles.item);
        const props = { ...child.props, className };

        return React.cloneElement(child, props);
    }

    render() {

        const { children } = this.props;

        return (
            <div className={styles.host}>
                <div className={styles.ideas}>
                    {React.Children.map(children, this.handleRenderChild)}
                </div>
            </div>
        );
    }
}

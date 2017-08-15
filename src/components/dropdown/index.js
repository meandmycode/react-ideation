import React from 'react';
import classNames from 'classnames';

import styles from './style.css';

// TODO: unit tests

export default class Dropdown extends React.PureComponent {

    state = {
        open: false,
        focal: false,
    }

    handleClicked = () => {
        const open = !this.state.open;
        this.setState({ open });
    }

    handleKeyDown = event => {

        if (event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
        }
    }

    handleKeyUp = event => {

        if (event.key === ' ') {

            const open = !this.state.open;
            this.setState({ open });

        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {

            const open = true;
            this.setState({ open });

        }

        // TODO: implement up and down for keyboard use

    }

    handleActivate = event => {
        const focal = event.type === 'focus';
        const open = event.type === 'blur' ? false : this.state.open;
        this.setState({ open, focal });
    }

    handleSelect = option => () => {
        if (option === this.props.selected) return;
        this.props.onChange(option);
    }

    render() {

        const { options, selected = options[0], className, children: selector, tabIndex = 0, ...props } = this.props;
        const { open } = this.state;

        return (
            <div className={classNames(styles.host, className)}
                tabIndex={tabIndex}
                data-focal={open ? '' : null}
                onClick={this.handleClicked}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onFocus={this.handleActivate}
                onBlur={this.handleActivate}
                {...props}>
                <div className={styles.label}>
                    {selector(selected)}
                </div>
                <div className={styles.list} hidden={!open}>
                    {options.map((option, i) => (
                        <div key={i} className={styles.option} onClick={this.handleSelect(option)}>{selector(option)}</div>
                    ))}
                </div>
            </div>
        );
    }
}

import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

type SwitcherProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Switcher: React.FC<SwitcherProps> = ({ className = '', disabled = false, children, ...props }) => {
    return (
        <label
            className={cx(styles.switchContainer, className, {
                [styles.disabled]: disabled
            })}
        >
            <input
                className={cx(styles.switcher, {
                    [styles.withLabel]: !!children
                })}
                type="checkbox"
                {...props}
            />
            {children}
        </label>
    );
};

export default Switcher;

import React, { memo } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface IButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'danger' | 'tertiary';
    icon?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = (
    {
        children,
        variant = 'primary',
        className = '',
        icon,
        ...props
    }) => {
    const baseClass = styles[variant as keyof typeof styles];

    return (
        <button
            className={cx({
                [styles.commonBtn]: true,
                [baseClass]: true,
                [className]: !!className
            })}
            {...props}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
};

export default memo(Button);

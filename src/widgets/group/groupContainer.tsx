import React, {FC, PropsWithChildren} from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

type GroupContainerProps = {
    color: string
    isSelected: boolean
    onClick: () => void
};

const GroupContainer: FC<PropsWithChildren<GroupContainerProps>> = (
    { color, isSelected, onClick, children }
) => {
    return (
        <div
            className={cx(styles.groupContainer, { [styles.selected]: isSelected })}
            style={{ border: `3px solid ${color}`}}
        >
            <header>
                <div className={styles.checkbox} onClick={onClick}>
                    <input type='checkbox' checked={isSelected} onChange={onClick}/>
                    <label/>
                </div>
            </header>
            {children}
        </div>
    );
};

export default GroupContainer;
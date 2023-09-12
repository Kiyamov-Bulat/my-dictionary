import React, {FC, PropsWithChildren} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectIsGroupSelected} from '../../store/selectors/dictionary';
import {toggleSelectedGroup} from '../../store/slices/dictionary';
import styles from './styles.module.scss';
import cx from 'classnames';

type GroupContainerProps = {
    id: string
    color: string
};

const GroupContainer: FC<PropsWithChildren<GroupContainerProps>> = ({ id, color, children }) => {
    const dispatch = useDispatch();
    const isSelected = useSelector(getSelectIsGroupSelected(id));
    const select = () => dispatch(toggleSelectedGroup(id));

    return (
        <div
            className={cx(styles.groupContainer, { [styles.selected]: isSelected })}
            style={{ border: `3px solid ${color}`}}
        >
            <header>
                <div className={styles.checkbox} onClick={select}>
                    <input type='checkbox' checked={isSelected}/>
                    <label/>
                </div>
            </header>
            {children}
        </div>
    );
};

export default GroupContainer;
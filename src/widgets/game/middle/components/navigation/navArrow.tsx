import React, {FC, ReactNode} from 'react';
import cx from 'classnames';
import styles from '../../styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {nextUnit, prevUnit} from '../../../../../store/slices/game';
import {RootState} from '../../../../../store';
import useHotkey from '../../../../../components/hotkeyManger/useHotkey';

type NavArrowProps = {
    hideSelector: (state: RootState) => boolean
    action: () => any
    hotkey: string
    className?: string
    children?: ReactNode
};

const NavArrow: FC<NavArrowProps> = ({ className,  hideSelector, action, hotkey, children }) => {
    const dispatch = useDispatch();
    const hide = useSelector(hideSelector);
    const goTo = (): void => {
        dispatch(action());
    };
    useHotkey(hotkey, goTo, { block: hide });

    if (hide) {
        return null;
    }

    return (
        <div onClick={goTo} className={cx(styles.navArrow, className)}>
            {children}
        </div>
    );
};

export default NavArrow;
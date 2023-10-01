import React, {FC} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import {EPanelView} from '../../../models/configuration';
import {useDispatch} from 'react-redux';
import {setPanelView} from '../../../store/slices/configuration';

type TabProps = {
    isSelected: boolean
    panelView: EPanelView
    children: React.ReactNode
};

const Tab: FC<TabProps> = ({ isSelected, children, panelView }) => {
    const dispatch = useDispatch();
    const openPanel = () => dispatch(setPanelView(panelView));
    return (
        <div
            onClick={openPanel}
            className={cx(styles.tab, { [styles.isSelected]: isSelected })}>
            {children}
        </div>
    );
};

export default Tab;
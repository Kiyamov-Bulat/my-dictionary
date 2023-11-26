import React, {FC} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import Button from '../../../components/button';
import ConfigurationModel from '../../../models/configuration';
import {EPanelView} from '../../../models/types';

type TabProps = {
    isSelected: boolean
    panelView: EPanelView
    children: React.ReactNode
};

const Tab: FC<TabProps> = ({ isSelected, children, panelView }) => {
    const openPanel = () => {
        ConfigurationModel.saveMainPanelView(panelView);
    };
    return (
        <Button
            variant={'primary'}
            onClick={openPanel}
            className={cx(styles.tab, { [styles.isSelected]: isSelected })}>
            {children}
        </Button>
    );
};

export default Tab;
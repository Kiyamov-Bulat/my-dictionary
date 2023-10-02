import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {selectPanelView} from '../../../store/selectors/configuration';
import {EPanelView} from '../../../models/configuration';
import Tab from './tab';
import styles from './styles.module.scss';

const TABS = {
    [EPanelView.TEXT]: {
        content: 'Интерактивный перевод'
    },
    [EPanelView.GAMES_LIST]: {
        content: 'Тренажеры',
    },
    [EPanelView.NOTES]: {
        content: 'Заметки',
    }
};

const Navigation: FC = () => {
    const currentPanelView = useSelector(selectPanelView);

    return (
        <nav className={styles.navContainer}>
            {Object.entries(TABS).map(([tab, tabData]) =>
                <Tab key={tab} isSelected={tab === currentPanelView} panelView={tab as EPanelView}>
                    {tabData.content}
                </Tab>
            )}
        </nav>
    );
};

export default Navigation;
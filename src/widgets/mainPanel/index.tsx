import React, {FC} from 'react';
import Games from '../game';
import {useDispatch, useSelector} from 'react-redux';
import {selectPanelView} from '../../store/selectors/configuration';
import Text from '../text';
import styles from './styles.module.scss';
import Help from '../help';
import {selectGameState} from '../../store/selectors/game';
import {EGameState} from '../../models/game';
import {EPanelView} from '../../models/configuration';
import Navigation from './navigation/navigation';

const getPanel = (panelView: EPanelView) => {
    switch(panelView) {
        case EPanelView.GAMES_LIST:
            return <Games/>;
        case EPanelView.TEXT:
            return <Text/>;
    }
};

const MainPanel: FC = () => {
    const panelView = useSelector(selectPanelView);
    const state = useSelector(selectGameState);

    return (
        <div className={styles.mainPanelContainer}>
            <Navigation/>
            {state === EGameState.SELECT &&
                <div className={styles.header}>
                    <Help/>
                </div>
            }
            {getPanel(panelView)}
        </div>
    );
};

export default MainPanel;
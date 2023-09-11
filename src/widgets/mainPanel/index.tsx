import React, {FC} from 'react';
import Games from '../game';
import Switch from '../../components/switch';
import {togglePanelView} from '../../store/slices/configuration';
import {useDispatch, useSelector} from 'react-redux';
import {selectPanelViewIsGamesList} from '../../store/selectors/configuration';
import Text from '../text';
import styles from './styles.module.scss';
import useHotkey from '../../components/hotkeyManger/useHotkey';
import HOTKEYS from '../../utils/hotkeys';
import Help from '../help';
import {selectGameState} from '../../store/selectors/game';
import {EGameState} from '../../models/game';

const MainPanel: FC = () => {
    const dispatch = useDispatch();
    const panelViewIsGamesList = useSelector(selectPanelViewIsGamesList);
    const switchPanel = () => dispatch(togglePanelView());
    const state = useSelector(selectGameState);

    useHotkey(HOTKEYS.SWITCH_PANEL_VIEW.key, switchPanel, { ctrl: HOTKEYS.SWITCH_PANEL_VIEW.ctrl });

    return (
        <div className={styles.mainPanelContainer}>
            {state === EGameState.SELECT &&
                <div className={styles.header}>
                    <Help/>
                    <Switch className={styles.switch} value={panelViewIsGamesList} onChange={switchPanel}/>
                </div>
            }
            {panelViewIsGamesList ? <Games/> : <Text/>}
        </div>
    );
};

export default MainPanel;
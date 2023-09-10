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

const MainPanel: FC = () => {
    const dispatch = useDispatch();
    const panelViewIsGamesList = useSelector(selectPanelViewIsGamesList);
    const switchPanel = () => dispatch(togglePanelView());

    useHotkey(HOTKEYS.SWITCH_PANEL_VIEW.key, switchPanel, { ctrl: HOTKEYS.SWITCH_PANEL_VIEW.ctrl });

    return (
        <div className={styles.mainPanelContainer}>
            <div className={styles.header}>
                <Help/>
                <Switch className={styles.switch} value={panelViewIsGamesList} onChange={switchPanel}/>
            </div>
            {panelViewIsGamesList ? <Games/> : <Text/>}
        </div>
    );
};

export default MainPanel;
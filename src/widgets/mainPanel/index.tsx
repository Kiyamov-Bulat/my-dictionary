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

const MainPanel: FC = () => {
    const dispatch = useDispatch();
    const panelViewIsGamesList = useSelector(selectPanelViewIsGamesList);
    const switchPanel = () => dispatch(togglePanelView());

    useHotkey(HOTKEYS.SWITCH_PANEL_VIEW, switchPanel);

    return (
        <div>
            <Switch className={styles.switch} value={panelViewIsGamesList} onChange={switchPanel}/>
            {panelViewIsGamesList ? <Games/> : <Text/>}
        </div>
    );
};

export default MainPanel;
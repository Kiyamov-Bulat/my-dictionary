import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSettingsIsOpen} from '../../store/selectors/configuration';
import styles from './styles.module.scss';
import Dictionary from '../dictionary';
import Translate from '../translate';
import AddGroup from '../addGroup';
import {closeSetting, openSettings} from '../../store/slices/configuration';
import useHotkey from '../../components/hotkeyManger/useHotkey';
import HOTKEYS from '../../utils/hotkeys';

const Settings: FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectSettingsIsOpen);
    const close = () => dispatch(closeSetting());
    const open = () => dispatch(openSettings());

    useHotkey([HOTKEYS.CLOSE_SETTINGS.key, HOTKEYS.OPEN_SETTINGS.key], close, { block: !isOpen });
    useHotkey(HOTKEYS.OPEN_SETTINGS.key, open, { block: isOpen, ctrl: HOTKEYS.OPEN_SETTINGS.ctrl });

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.settingsWrapper} onClick={(e) => e.target === e.currentTarget && close()}>
            <div className={styles.settingsContainer}>
                <Translate
                    placeholder={'Здесь будет ваш текст'}
                    className={styles.translate}
                    extended={true}
                />
                <div className={styles.groupsContainer}>
                    <AddGroup/>
                    <Dictionary className={styles.dictionary}/>
                </div>
            </div>
        </div>
    );
};

export default Settings;
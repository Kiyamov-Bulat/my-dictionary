import React, {FC} from 'react';
import {DownloadIcon, ExportIcon, PlusIcon, SwapIcon} from '../../icons';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import {selectSelectedGroupsTitlesAsString} from '../../store/selectors/dictionary';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {swapSelectedGroupsTextAndTranslation} from '../../store/slices/dictionary';
import DictionaryModel from '../../models/dictionary';

const ControlPanel: FC = () => {
    const selectedGroupsTitles = useSelector(selectSelectedGroupsTitlesAsString);
    const downloadDictionary = () => DictionaryModel.download();

    return (
        <div className={styles.controlPanelContainer}>
            <p className={styles.selectedGroups}>Выбраны: {selectedGroupsTitles}</p>
            <div className={styles.btns}>
                {/*<ButtonWithTooltip Icon={SettingIcon} action={openSettings} tipContent={'Настройки'}/>*/}
                {/*<ButtonWithTooltip Icon={DownloadIcon} action={} tipContent={'Импортировать словарь'} disp={false}/>*/}
                {/*<ButtonWithTooltip Icon={PlusIcon} action={} tipContent={'Добавить в группы'}/>*/}
                <ButtonWithTooltip Icon={ExportIcon} action={downloadDictionary} tipContent={'Экспортировать словарь'} disp={false}/>
                <ButtonWithTooltip Icon={SwapIcon} action={swapSelectedGroupsTextAndTranslation} tipContent={'Поменять местами'}/>
            </div>
        </div>
    );
};

export default ControlPanel;
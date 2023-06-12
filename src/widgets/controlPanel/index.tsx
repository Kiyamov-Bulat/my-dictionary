import React, {FC} from 'react';
import {DownloadIcon, ExportIcon, SwapIcon} from '../../icons';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import {selectSelectedGroupsTitlesAsString} from '../../store/selectors/dictionary';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {swapSelectedGroupsTextAndTranslation} from '../../store/slices/dictionary';
import DictionaryModel from '../../models/dictionary';
import Notice from '../../components/notice';

const ControlPanel: FC = () => {
    const selectedGroupsTitles = useSelector(selectSelectedGroupsTitlesAsString);
    const downloadDictionary = () => DictionaryModel.download();

    return (
        <div className={styles.controlPanelContainer}>
            <p className={styles.selectedGroups}>Выбраны: {selectedGroupsTitles}</p>
            <div className={styles.btns}>
                {/*<ButtonWithTooltip Icon={SettingIcon} action={openSettings} tipContent={'Настройки'}/>*/}
                {/*<ButtonWithTooltip Icon={DownloadIcon} action={() => Notice.notImpl()} tipContent={'Импортировать словарь'} disp={false}/>*/}
                <ButtonWithTooltip Icon={ExportIcon} action={downloadDictionary} tipContent={'Экспортировать словарь'}/>
                <ButtonWithTooltip Icon={SwapIcon} action={swapSelectedGroupsTextAndTranslation} tipContent={'Поменять местами'}/>
            </div>
        </div>
    );
};

export default ControlPanel;
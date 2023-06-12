import React, {FC} from 'react';
import TooltipWrapper, {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import Button from '../../components/button';
import {openSettings} from '../../store/slices/configuration';
import {DownloadIcon, ExportIcon, SettingIcon, SwapIcon} from '../../icons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.module.scss';
import {selectDictionaryValue, selectSelectedGroupsTitlesAsString} from '../../store/selectors/dictionary';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {swapSelectedGroupsTextAndTranslation, swapTextAndTranslation} from '../../store/slices/dictionary';
import downloadObjectAsJson from '../../utils/downloadObjectAsJson';
import store from '../../store';
import DictionaryModel from '../../models/dictionary';

const ControlPanel: FC = () => {
    const selectedGroupsTitles = useSelector(selectSelectedGroupsTitlesAsString);
    const downloadDictionary = () => DictionaryModel.download();

    return (
        <div className={styles.controlPanelContainer}>
            <p className={styles.selectedGroups}>Выбраны: {selectedGroupsTitles}</p>
            <div className={styles.btns}>
                {/*<ButtonWithTooltip Icon={SettingIcon} action={openSettings} tipContent={'Настройки'}/>*/}
                {/*<ButtonWithTooltip Icon={DownloadIcon} action={downloadDictionary} tipContent={'Загрузить словарь'} disp={false}/>*/}
                <ButtonWithTooltip Icon={ExportIcon} action={downloadDictionary} tipContent={'Экспортировать словарь'}/>
                <ButtonWithTooltip Icon={SwapIcon} action={swapSelectedGroupsTextAndTranslation} tipContent={'Поменять местами'}/>
            </div>
        </div>
    );
};

export default ControlPanel;
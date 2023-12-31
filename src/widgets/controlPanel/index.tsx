import React, {FC} from 'react';
import {ExportIcon, SwapIcon} from '../../icons';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import {selectSelectedGroupsTitlesAsString} from '../../store/selectors/dictionary';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {swapSelectedGroupsTextAndTranslation} from '../../store/slices/dictionary';
import DictionaryModel from '../../models/dictionary';
import AddUnitsButton from './addUnitsButton';

const ControlPanel: FC = () => {
    const selectedGroupsTitles = useSelector(selectSelectedGroupsTitlesAsString);
    const downloadDictionary = () => DictionaryModel.download();

    return (
        <div className={styles.controlPanelContainer}>
            <p className={styles.selectedGroups}>Выбраны: {selectedGroupsTitles}</p>
            <div className={styles.btns}>
                {/*<ButtonWithTooltip Icon={SettingIcon} action={openSettings} tipContent={'Настройки'}/>*/}
                <AddUnitsButton/>
                {/*<ImportDictButton/>*/}
                <ButtonWithTooltip Icon={ExportIcon} action={downloadDictionary} tipContent={'Экспортировать словарь'}/>
                <ButtonWithTooltip Icon={SwapIcon} action={swapSelectedGroupsTextAndTranslation} tipContent={'Поменять местами'} disp={true}/>
            </div>
        </div>
    );
};

export default ControlPanel;
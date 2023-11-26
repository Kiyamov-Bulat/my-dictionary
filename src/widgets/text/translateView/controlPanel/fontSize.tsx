import React, {FC} from 'react';
import EditableLabel from '../../../../components/editableLabel';
import ConfigurationModel from '../../../../models/configuration';
import {useSelector} from 'react-redux';
import {selectInteractiveTextFontSize} from '../../../../store/selectors/configuration';
import styles from './styles.module.scss';
import ButtonWithTooltip from '../../../../components/button/ButtonWithTooltip';
import TooltipWrapper, {ETooltipPosition} from '../../../../components/tooltip/TooltipWrapper';

const FontSize: FC = () => {
    const textFontSize = useSelector(selectInteractiveTextFontSize);
    const changeFontSize = (text: string | number) => {
        ConfigurationModel.saveInteractiveTextFontSize(text);
        return true;
    };
    const increaseFontSize = () => changeFontSize(textFontSize + 1);
    const decreaseFontSize = () => changeFontSize(textFontSize - 1);

    return (
        <div className={styles.fontSizeContainer}>
            <div className={styles.fontSize}>
                <ButtonWithTooltip
                    position={ETooltipPosition.S} action={decreaseFontSize} tipContent={'Уменьшить'}>
                    -
                </ButtonWithTooltip>
                <TooltipWrapper tipContent={'Размер шрифта'} position={ETooltipPosition.S} className={styles.value}>
                    <div className={styles.label}>FS:</div>
                    <EditableLabel value={String(textFontSize)} onSetInactive={changeFontSize}/>
                </TooltipWrapper>
                <ButtonWithTooltip
                    position={ETooltipPosition.S} action={increaseFontSize} tipContent={'Увеличить'}>
                    +
                </ButtonWithTooltip>
            </div>
        </div>
    );
};

export default FontSize;
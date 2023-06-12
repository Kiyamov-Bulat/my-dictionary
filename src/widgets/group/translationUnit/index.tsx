import React, {FC} from 'react';
import {TranslationUnit as ITranslationUnit} from '../../../models/types';
import styles from './styles.module.scss';
import MemoryChart from '../memoryChart';
import RemoveBtn from '../../../components/removeBtn';
import {removeTranslationUnit, resetTranslationUnit, swapTextAndTranslation} from '../../../store/slices/dictionary';
import {useDispatch} from 'react-redux';
import {ETooltipPosition} from '../../../components/tooltip/TooltipWrapper';
import ButtonWithTooltip from '../../../components/button/ButtonWithTooltip';
import {RestIcon, SwapIcon} from '../../../icons';

const TranslationUnit: FC<ITranslationUnit> = (translationUnit) => {
    const { text, translation, textLang, transLang, memoryPercent } = translationUnit;
    const dispatch = useDispatch();
    const swapTextAndTransl = () => swapTextAndTranslation(translationUnit);
    const rmTransitionUnit = () => dispatch(removeTranslationUnit(translationUnit));
    const resetTransitionUnit = () => resetTranslationUnit(translationUnit);

    return (
        <span className={styles.translationUnit}>
            <span className={styles.text}>
                {text}
                <span className={styles.lang}>({textLang})</span>
                - {translation}
                <span className={styles.lang}>({transLang})</span>
            </span>
            <span className={styles.controls}>
                <ButtonWithTooltip
                    className={styles.swapBtn}
                    action={swapTextAndTransl}
                    Icon={SwapIcon}
                    tipContent={'Поменять местами'}
                    position={ETooltipPosition.N}/>
                <ButtonWithTooltip
                    action={resetTransitionUnit}
                    Icon={RestIcon}
                    tipContent={'Сбросить'}
                    position={ETooltipPosition.N}/>
                <RemoveBtn className={styles.rmBtn} onClick={rmTransitionUnit}/>
                <MemoryChart
                    current={memoryPercent}
                    total={100} size={14} lineWidth={3}
                    position={ETooltipPosition.NE}
                />
            </span>
        </span>
    );
};

export default TranslationUnit;
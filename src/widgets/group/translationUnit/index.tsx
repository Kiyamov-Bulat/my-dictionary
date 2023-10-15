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
import TranslationUnitCard from '../../translationUnitCard';

const TranslationUnit: FC<ITranslationUnit> = (translationUnit) => {
    const dispatch = useDispatch();
    const swapTextAndTransl = () => dispatch(swapTextAndTranslation(translationUnit));
    const rmTransitionUnit = () => dispatch(removeTranslationUnit(translationUnit));
    const resetTransitionUnit = () => dispatch(resetTranslationUnit(translationUnit));

    return (
        <div className={styles.translationUnit}>
            <TranslationUnitCard unit={translationUnit} showImage={false} className={styles.text}/>
            <div className={styles.controls}>
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
                    current={translationUnit.memoryPercent}
                    total={100} size={14} lineWidth={3}
                    position={ETooltipPosition.NE}
                />
            </div>
        </div>
    );
};

export default TranslationUnit;
import React, {FC, memo, useEffect} from 'react';
import {TranslationUnit as ITranslationUnit} from '../../../models/types';
import styles from './styles.module.scss';
import MemoryChart from '../memoryChart';
import RemoveBtn from '../../../components/removeBtn';
import {
    openTranslationUnit,
    removeTranslationUnit,
    resetTranslationUnit,
    swapTextAndTranslation
} from '../../../store/slices/dictionary';
import {useDispatch} from 'react-redux';
import {ETooltipPosition} from '../../../components/tooltip/TooltipWrapper';
import ButtonWithTooltip from '../../../components/button/ButtonWithTooltip';
import {RestIcon, SwapIcon} from '../../../icons';
import TranslationUnitCard from '../../translationUnitCard';

const actions = [
    swapTextAndTranslation, removeTranslationUnit,
    resetTranslationUnit, openTranslationUnit
];

const TranslationUnit: FC<ITranslationUnit> = (translationUnit) => {
    const dispatch = useDispatch();
    const [swap, remove, reset, open] = actions.map((act) =>
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            dispatch(act(translationUnit));
        });

    return (
        <div className={styles.translationUnit} onClick={open}>
            <TranslationUnitCard unit={translationUnit} showImage={false} className={styles.text}/>
            <div className={styles.controls}>
                <ButtonWithTooltip
                    className={styles.swapBtn}
                    action={swap}
                    Icon={SwapIcon}
                    tipContent={'Поменять местами'}
                    position={ETooltipPosition.N}/>
                <ButtonWithTooltip
                    action={reset}
                    Icon={RestIcon}
                    tipContent={'Сбросить'}
                    position={ETooltipPosition.N}/>
                <RemoveBtn className={styles.rmBtn} onClick={remove}/>
                <MemoryChart
                    current={translationUnit.memoryPercent}
                    total={100} size={14} lineWidth={3}
                    position={ETooltipPosition.NE}
                />
            </div>
        </div>
    );
};

export default memo(TranslationUnit);
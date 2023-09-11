import React, {FC, useEffect, useRef} from 'react';
import styles from '../../styles.module.scss';
import NavArrow from './navArrow';
import {
    selectHasAnswer,
    selectIsFirstUnit,
    selectIsLastUnit,
    selectIsNotLastUnit
} from '../../../../../store/selectors/game';
import {endGame, nextUnit, prevUnit} from '../../../../../store/slices/game';
import HOTKEYS from '../../../../../utils/hotkeys';
import {useDispatch, useSelector} from 'react-redux';

const Navigation: FC = () => {
    const hasAnswer = useSelector(selectHasAnswer);
    const $timeoutId = useRef<number | null>(null);
    const dispatch = useDispatch();
    const isLastUnit = useSelector(selectIsLastUnit);

    const goNext = () => {
        $timeoutId.current && window.clearTimeout($timeoutId.current);
        $timeoutId.current = null;
        return nextUnit();
    };
    
    useEffect(() => {
        if (hasAnswer) {
            $timeoutId.current = window.setTimeout(() =>
                dispatch(isLastUnit ? endGame() : goNext())
            , 1500);
        }
        return () => {
            $timeoutId.current && window.clearTimeout($timeoutId.current);
        };
    }, [hasAnswer, isLastUnit]);

    return (
        <div className={styles.navigationContainer}>
            <NavArrow hotkey={HOTKEYS.PREV_UNIT.key} className={styles.prevArrow} hideSelector={selectIsFirstUnit} action={prevUnit}>
                Назад
            </NavArrow>
            <NavArrow hotkey={HOTKEYS.NEXT_UNIT.key} hideSelector={selectIsLastUnit} action={nextUnit}>
                Вперед
            </NavArrow>
            <NavArrow hotkey={HOTKEYS.NEXT_UNIT.key} hideSelector={selectIsNotLastUnit} action={endGame}>
                Завершить
            </NavArrow>
        </div>
    );
};

export default Navigation;
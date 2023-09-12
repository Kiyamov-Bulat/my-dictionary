import React, {FC} from 'react';
import styles from '../../styles.module.scss';
import NavArrow from './navArrow';
import {selectIsFirstUnit, selectIsLastUnit, selectIsNotLastUnit} from '../../../../../store/selectors/game';
import {endGame, nextUnit, prevUnit} from '../../../../../store/slices/game';
import HOTKEYS from '../../../../../utils/hotkeys';
import useAutoNextNavigation from './useAutoNextNavigation';

const Navigation: FC = () => {
    useAutoNextNavigation();
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
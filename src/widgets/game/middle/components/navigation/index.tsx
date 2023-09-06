import React, {FC} from 'react';
import styles from '../../styles.module.scss';
import NavArrow from './navArrow';
import {selectIsFirstUnit, selectIsLastUnit, selectIsNotLastUnit} from '../../../../../store/selectors/game';
import {endGame, nextUnit, prevUnit} from '../../../../../store/slices/game';
import HOTKEYS from '../../../../../utils/hotkeys';

const Navigation: FC = () => {
    return (
        <div className={styles.navigationContainer}>
            <NavArrow hotkey={HOTKEYS.PREV_UNIT} className={styles.prevArrow} hideSelector={selectIsFirstUnit} action={prevUnit}>
                Назад
            </NavArrow>
            <NavArrow hotkey={HOTKEYS.NEXT_UNIT} hideSelector={selectIsLastUnit} action={nextUnit}>
                Вперед
            </NavArrow>
            <NavArrow hotkey={HOTKEYS.NEXT_UNIT} hideSelector={selectIsNotLastUnit} action={endGame}>
                Завершить
            </NavArrow>
        </div>
    );
};

export default Navigation;
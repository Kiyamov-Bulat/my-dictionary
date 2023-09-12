import React, {FC, useEffect, useRef} from 'react';
import Score from '../../score';
import styles from '../styles.module.scss';
import UnitList from '../components/unitList';
import Navigation from '../components/navigation';
import {useSelector} from 'react-redux';
import {selectCurrentUnit, selectHasAnswer, selectIsLastUnit} from '../../../../store/selectors/game';
import cx from 'classnames';
import GameModel from '../../../../models/game';
import {random} from 'lodash';
import GameTemplate from '../components/gameTemplate';

const WORDFALL_DURATION = 3000;
const ANIMATION_INTERVAL_MS = 1000 / 60;

const Wordfall: FC = () => {
    const $word = useRef<HTMLParagraphElement | null>(null);
    const currentUnit = useSelector(selectCurrentUnit);
    const isLastUnit = useSelector(selectIsLastUnit);
    const hasAnswer = useSelector(selectHasAnswer);

    useEffect(() => {
        if (isLastUnit && hasAnswer) {
            return;
        }

        let passed = 0;

        if ($word.current) {
            $word.current.style.left = `${random(40, 60)}%`;
        }
        const intervalId = setInterval(() => {
            passed += ANIMATION_INTERVAL_MS;

            if (passed > WORDFALL_DURATION) {
                clearInterval(intervalId);
                GameModel.provideEmptyAnswer();
                return;
            }
            // if (!$word.current) { return; }
            // $word.current.style.top = `${passed / WORDFALL_DURATION * 100}%`;
        }, ANIMATION_INTERVAL_MS);
        
        return () => {
            clearInterval(intervalId);
        };
    }, [currentUnit, hasAnswer, isLastUnit]);
    
    return (
        <GameTemplate className={styles.wordfallContainer} reverse={true}>
            <p
                key={currentUnit?.id}
                className={styles.fallingWord}
                style={{ animationDuration: `${WORDFALL_DURATION}ms`}}
                ref={$word}
            >{currentUnit?.translation}</p>
        </GameTemplate>
    );
};

export default Wordfall;
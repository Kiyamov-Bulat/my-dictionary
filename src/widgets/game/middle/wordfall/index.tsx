import React, {FC, useEffect, useRef} from 'react';
import styles from '../styles.module.scss';
import {useSelector} from 'react-redux';
import {selectCurrentUnit, selectHasAnswer} from '../../../../store/selectors/game';
import GameModel from '../../../../models/game';
import {random} from 'lodash';
import GameTemplate from '../components/gameTemplate';

const WORDFALL_DURATION = 3000;
const ANIMATION_INTERVAL_MS = 1000 / 60;

const Wordfall: FC = () => {
    const $word = useRef<HTMLParagraphElement | null>(null);
    const currentUnit = useSelector(selectCurrentUnit);
    const hasAnswer = useSelector(selectHasAnswer);

    useEffect(() => {
        if (!$word.current) { return; }
        if (hasAnswer) {
            $word.current.style.animationPlayState = 'paused';
            return;
        }


        $word.current.style.animationPlayState = 'running';
        $word.current.style.left = `${random(40, 60)}%`;

        let passed = 0;
        const intervalId = setInterval(() => {
            passed += ANIMATION_INTERVAL_MS;

            if (passed > WORDFALL_DURATION) {
                clearInterval(intervalId);
                GameModel.provideEmptyAnswer();
                return;
            }
        }, ANIMATION_INTERVAL_MS);
        
        return () => {
            clearInterval(intervalId);
        };
    }, [currentUnit, hasAnswer]);
    
    return (
        <GameTemplate className={styles.wordfallContainer} reverse={true} hideNavigation={true} nextNavigationTimeout={500}>
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
import React, {FC, useEffect, useRef} from 'react';
import Score from '../../score';
import styles from '../styles.module.scss';
import UnitList from '../components/unitList';
import Navigation from '../components/navigation';
import {useSelector} from 'react-redux';
import {selectCurrentUnit} from '../../../../store/selectors/game';
import cx from 'classnames';
import GameModel from '../../../../models/game';
import getRandomInt from '../../../../utils/getRandomInt';

const WORDFALL_DURATION = 3000;
const ANIMATION_INTERVAL_MS = 1000 / 60;

const Wordfall: FC = () => {
    const $word = useRef<HTMLParagraphElement | null>(null);
    const currentUnit = useSelector(selectCurrentUnit);

    useEffect(() => {
        let passed = 0;

        if ($word.current) {
            $word.current.style.left = `${getRandomInt(20, 80)}%`;
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
    }, [currentUnit]);
    
    return (
        <div className={cx(styles.wordfallContainer, styles.middleContainer)}>
            <p
                className={styles.fallingWord}
                style={{ animationDuration: `${WORDFALL_DURATION}ms`}}
                ref={$word}
            >{currentUnit?.translation}</p>
            <Score className={styles.score}/>
            <UnitList reverse={true}/>
            <Navigation/>
        </div>
    );
};

export default Wordfall;
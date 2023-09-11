import React, {FC, useEffect} from 'react';
import useTimer from './useTimer';
import styles from './styles.module.scss';
import {useDispatch} from 'react-redux';
import {toMiddleOfGame} from '../../../store/slices/game';

const COUNTDOWN_DURATION = 0;

const Start: FC = () => {
    const dispatch = useDispatch();
    const countdown = useTimer(COUNTDOWN_DURATION, 0.75);

    useEffect(() => {
        if (countdown === 0) {
            dispatch(toMiddleOfGame());
        }
    }, [countdown]);
    return (
        <div className={styles.startContainer}>{countdown}</div>
    );
};

export default Start;
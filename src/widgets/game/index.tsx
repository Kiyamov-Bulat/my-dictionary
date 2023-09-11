import React, {FC, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectGameState} from '../../store/selectors/game';
import GameModel, {EGameState, EGameType} from '../../models/game';
import End from './end';
import Middle from './middle';
import Start from './start';
import Select from './select';
import styles from './styles.module.scss';

const GAME_WIDGETS = {
    [EGameState.SELECT]: Select,
    [EGameState.START]: Start,
    [EGameState.MIDDLE]: Middle,
    [EGameState.END]: End,
};

const Game: FC = () => {
    const state = useSelector(selectGameState);
    const Widget = GAME_WIDGETS[state];

    useEffect(() => {
        GameModel.startGame(EGameType.WORDFALL);
    }, []);
    return <div className={styles.gameContainer}><Widget/></div>;
};

export default Game;
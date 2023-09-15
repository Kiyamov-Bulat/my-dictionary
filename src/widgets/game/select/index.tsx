import React, {FC} from 'react';
import {GAME_TYPES} from '../../../models/game';
import GameCard from './gameCard';
import styles from './styles.module.scss';

const Select: FC = () => {

    // useEffect(() => {
    //     GameModel.startGame(EGameType.TRANSLATION_FROM_LIST);
    // }, []);
    return (
        <div className={styles.selectContainer}>
            {GAME_TYPES.map((gameType) => <GameCard key={gameType} type={gameType}/>)}
        </div>
    );
};

export default Select;
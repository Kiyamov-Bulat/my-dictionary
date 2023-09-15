import React, {FC} from 'react';
import styles from './styles.module.scss';
import GameModel, {EGameType, GAME_PROPS} from '../../../../models/game';
import Notice from '../../../../components/notice';
import cx from 'classnames';

export type GameCardProps = {
    type: EGameType
}

const GameCard: FC<GameCardProps> = ({ type }) => {
    const { Icon, title, disabled = false } = GAME_PROPS[type] as (typeof GAME_PROPS[EGameType] & { disabled?: boolean });

    const startGame = () => {
        if (disabled) {
            Notice.notImpl();
            return;
        }

        if (GameModel.hasUnlearnedUnits()) {
            GameModel.startGame(type);
        } else {
            //@TODO
            Notice.warn('Группа пуста!');
        }
     };
    return (
        <div onClick={startGame} className={cx(styles.gameCardContainer, { [styles.disabled]: disabled })}>
            <p className={styles.title}>{title}</p>
            <Icon/>
        </div>
    );
};

export default GameCard;
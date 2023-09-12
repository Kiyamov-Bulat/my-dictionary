import React, {FC, PropsWithChildren} from 'react';
import styles from '../../styles.module.scss';
import Score from '../../../score';
import Unit from '../unit';
import UnitList from '../unitList';
import Navigation from '../navigation';
import EndGameButton from '../endGameButton';
import cx from 'classnames';

type GameTemplateProps = {
    reverse?: boolean
    className?: string
}

const GameTemplate: FC<PropsWithChildren<GameTemplateProps>> = (
    {
        reverse = false,
        className,
        children = <Unit reverse={reverse}/>
    }) => {

    return (
        <div className={cx(styles.middleContainer, className)}>
            <Score className={styles.score}/>
            <EndGameButton/>
            {children}
            <UnitList reverse={reverse}/>
            <Navigation/>
        </div>
    );
};

export default GameTemplate;
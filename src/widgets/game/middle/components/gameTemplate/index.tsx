import React, {FC, PropsWithChildren} from 'react';
import styles from '../../styles.module.scss';
import Score from '../../../score';
import Unit from '../unit';
import UnitList from '../unitList';
import Navigation from '../navigation';
import EndGameButton from '../endGameButton';
import cx from 'classnames';
import useAutoNextNavigation from '../navigation/useAutoNextNavigation';
import AnswerMark from '../answerMark';

type GameTemplateProps = {
    reverse?: boolean
    className?: string
    hideNavigation?: boolean
    nextNavigationTimeout?: number
}

const GameTemplate: FC<PropsWithChildren<GameTemplateProps>> = (
    {
        hideNavigation = false,
        reverse = false,
        className,
        children = <Unit reverse={reverse}/>,
        nextNavigationTimeout,
    }) => {
    useAutoNextNavigation(nextNavigationTimeout);

    return (
        <div className={cx(styles.middleContainer, className)}>
            <Score className={styles.score}/>
            <EndGameButton/>
            <AnswerMark/>
            {children}
            <UnitList reverse={reverse}/>
            {hideNavigation || <Navigation/>}
        </div>
    );
};

export default GameTemplate;
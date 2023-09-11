import React, {FC} from 'react';
import styles from '../styles.module.scss';
import {TranslationUnit} from '../../../../models/types';
import GameModel from '../../../../models/game';
import {useSelector} from 'react-redux';
import cx from 'classnames';
import {selectAnswer, selectCurrentUnit} from '../../../../store/selectors/game';
import useHotkey from '../../../../components/hotkeyManger/useHotkey';
import TranslationUnitModel from '../../../../models/translationUnit';

type OptionProps = {
    index: number
    unit: TranslationUnit
    reverse?: boolean
};

const Option: FC<OptionProps> = ({ unit, index, reverse }) => {
    const answer = useSelector(selectAnswer);
    const currentUnit = useSelector(selectCurrentUnit);
    const className = cx(styles.unit,
        {
            [styles.hasAnswer]: !!answer,
            [styles.correctAnswer]: answer && unit.id === currentUnit?.id,
            [styles.incorrectAnswer]: answer && answer.unit.id === unit.id && !answer.isCorrect
        }
    );

    const provideAnswer = () => {
        GameModel.provideAnswer(unit);
        // GameModel.playAnswerSound(unit);
        !reverse && currentUnit && TranslationUnitModel.vocalize(currentUnit);
    };

    useHotkey(`${index + 1}`, provideAnswer);

    return (
        <p className={className} key={unit.id} onClick={provideAnswer}>
            <span className={styles.index}>{index + 1}.</span> {reverse ? unit.text : unit.translation}
        </p>
    );
};

export default Option;
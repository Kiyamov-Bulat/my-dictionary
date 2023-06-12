import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {selectCorrectAnswersNumber, selectUnitsNumber} from '../../../store/selectors/game';

export type ScoreProps = {
    className?: string
    description?: boolean
}

const SCORE_DESCRIPTIONS = ['Ещё нужно подучить...', 'Неплохо!', 'Хорошо!', 'Великолепно!'] as const;

const getScoreDescription = (correctAnswers: number, total: number): typeof SCORE_DESCRIPTIONS[number] => {
    return SCORE_DESCRIPTIONS[(() => {
        const score = Math.floor(correctAnswers / total * 100);

        if (score < 50) {
            return 0;
        }
        if (score < 70) {
            return 1;
        }
        if (score < 100) {
            return 2;
        }
        return 3;
    })()];
};

const Score: FC<ScoreProps> = ({ className, description = false }) => {
    const answers = useSelector(selectCorrectAnswersNumber);
    const total = useSelector(selectUnitsNumber);

    return (
        <div className={className}>
            {description && <p>{getScoreDescription(answers, total)}</p>}
            <p>Счет: {answers} / {total}</p>
        </div>
    );
};

export default Score;
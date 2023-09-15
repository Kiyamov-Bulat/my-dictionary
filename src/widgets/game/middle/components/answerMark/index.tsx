import React, {FC} from 'react';
import {CheckIcon, CrossIcon} from '../../../../../icons';
import {selectAnswer} from '../../../../../store/selectors/game';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import cx from 'classnames';
const AnswerMark: FC = () => {
    const answer = useSelector(selectAnswer);

    if (!answer) { return null; }
    
    return <div className={cx(styles.answerMark, {[styles.check]: answer?.isCorrect })}>
        <div>{(
            answer?.isCorrect ? <CheckIcon/> : <CrossIcon/>
        )}
        </div>
    </div>;
};

export default AnswerMark;
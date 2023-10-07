import React, {FC} from 'react';
import styles from './styles.module.scss';
import useWordsStatistics from './useWordsStatistics';
import TooltipWrapper, {ETooltipPosition} from '../../../../components/tooltip/TooltipWrapper';

const Statistics: FC = () => {
    const { words, wordsInGroups, letters } = useWordsStatistics();

    return (
        <div className={styles.statistics}>
            <TooltipWrapper tipContent={'Слов'} position={ETooltipPosition.S}>
                <p><span className={styles.type}>W: </span>{words}</p>
            </TooltipWrapper>
            <TooltipWrapper tipContent={'Символов'} position={ETooltipPosition.S}>
                <p><span className={styles.type}>S: </span>{letters}</p>
            </TooltipWrapper>
            <TooltipWrapper className={styles.added} tipContent={'Добавлено слов'} position={ETooltipPosition.S}>
                <p>+{wordsInGroups}</p>
            </TooltipWrapper>
        </div>
    );
};

export default Statistics;
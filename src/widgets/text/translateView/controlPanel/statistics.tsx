import React, {FC} from 'react';
import styles from './styles.module.scss';
import useWordsStatistics from './useWordsStatistics';
import TooltipWrapper, {ETooltipPosition} from '../../../../components/tooltip/TooltipWrapper';

const Statistics: FC = () => {
    const { words, letters } = useWordsStatistics();

    return (
        <div className={styles.statistics}>
            <TooltipWrapper tipContent={'Слов'} position={ETooltipPosition.S}>
                <p><span className={styles.type}>W:</span> {words}</p>
            </TooltipWrapper>
            <TooltipWrapper tipContent={'Символов'} position={ETooltipPosition.S}>
                <p><span className={styles.type}>S:</span> {letters}</p>
            </TooltipWrapper>
        </div>
    );
};

export default Statistics;
import React, {FC} from 'react';
import styles from './styles.module.scss';

type WordProps = {
    value: string
    onClick: (word: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
};

const Word: FC<WordProps> = ({ value, onClick }) => {

    return (
        <span
            className={styles.word}
            onClick={onClick.bind(null, value)}>
            {value}
        </span>
    );
};

export default Word;
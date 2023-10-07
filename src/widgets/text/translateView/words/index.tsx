import React, {FC} from 'react';
import styles from './styles.module.scss';
import Word from './word';
import {useWords} from '../wordsContext';
import isSpace from '../../../../utils/isSpace';

const Words: FC = () => {
    const words = useWords();

    return (
        <section className={styles.words}>
            {words.map((word, idx) => isSpace(word) ? word : <Word key={idx} value={word}/>)}
        </section>
    );
};

export default Words;
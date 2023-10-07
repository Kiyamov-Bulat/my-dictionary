import React, {FC} from 'react';
import styles from './styles.module.scss';
import Switch from '../../../components/switch';
import {useWordsContext} from './wordsContext';

const Header: FC = () => {
    const { words, reverseTranslate, setReverseTranslate } = useWordsContext();
    const wordsWOSpaces = words.filter((w) => !/\s+/.test(w));
    const letters = wordsWOSpaces.reduce((acc, word) => acc + word.length, 0);

    return (
        <header>
            <h1>Интерактивный перевод</h1>
            <p><span>Слов: {wordsWOSpaces.length}</span> | <span>Символов: {letters}</span></p>
            <div className={styles.reverseTranslateContainer}>
                Перевод наоборот
                <Switch
                    className={styles.reverseTranslate}
                    value={reverseTranslate}
                    onChange={() => setReverseTranslate((prevState) => !prevState)}/>
            </div>
        </header>
    );
};

export default Header;
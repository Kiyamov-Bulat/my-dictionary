import React, {FC, useMemo, useState} from 'react';
import Button from '../../../components/button';
import styles from './styles.module.scss';
import Switch from '../../../components/switch';
import TranslatedText from './translatedText';
import Word from './word';

type TranslateViewProps = {
    text: string
    onBack: () => void
};

const TranslateView: FC<TranslateViewProps> = ({ text, onBack }) => {
    const words = useMemo(() => text.split(/(\s+)/), [text]);
    const [reverseTranslate, setReverseTranslate] = useState(false);
    const wordsWOSpaces = words.filter((w) => !/\s+/.test(w));
    const letters = wordsWOSpaces.reduce((acc, word) => acc + word.length, 0);

    return (
        <div className={styles.container}>
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
            <article className={styles.wordsPanel}>
                <TranslatedText text={text}/>
                <section className={styles.words}>
                    {words?.map((word, idx) => /\s+/.test(word)
                        ? word : <Word key={idx} value={word} reverseTranslate={reverseTranslate}/>)}
                </section>
            </article>
            <Button variant={'primary'} onClick={onBack}>
                Вернутся
            </Button>
        </div>
    );
};

export default TranslateView;
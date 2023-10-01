import React, {FC, useMemo, useState} from 'react';
import Button from '../../../components/button';
import styles from './styles.module.scss';
import TranslationUnitPopup from './translationUnitPopup';
import Switch from '../../../components/switch';
import TranslatedText from './translatedText';
import Word from './word';

type TranslateViewProps = {
    text: string
    onBack: () => void
};

const POPUP_MARGIN = 16;

const TranslateView: FC<TranslateViewProps> = ({ text, onBack }) => {
    const [selectedWord, setSelectedWord] = useState('');
    const words = useMemo(() => text.split(/(\s+)/), [text]);
    const [popupCoords, setPopupCoords] = useState<{ x: number, y: number } | null>(null);
    const [reverseTranslate, setReverseTranslate] = useState(false);
    const wordsWOSpaces = words.filter((w) => !/\s+/.test(w));
    const letters = wordsWOSpaces.reduce((acc, word) => acc + word.length, 0);
    const openPopup = (word: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        if (!selectedWord) {
            setSelectedWord(word);
        }
        setPopupCoords({
            x: target.offsetLeft + target.offsetWidth / 2,
            y: target.offsetTop + target.offsetHeight + POPUP_MARGIN
        });
    };

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
                        ? word : <Word key={idx} value={word} onClick={openPopup}/>)}
                </section>
            </article>
            <Button variant={'primary'} onClick={onBack}>
                Вернутся
            </Button>
            {popupCoords && <TranslationUnitPopup
                text={selectedWord}
                coords={popupCoords}
                reverse={reverseTranslate}
                onClose={() => {
                    setSelectedWord('');
                    setPopupCoords(null);
                }}
            />}
        </div>
    );
};

export default TranslateView;
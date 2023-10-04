import React, {FC, useMemo, useState} from 'react';
import Button from '../../../components/button';
import styles from './styles.module.scss';
import Switch from '../../../components/switch';
import TranslatedText from './translatedText';
import Word from './word';
import {ArrowDownIcon, StarIcon} from '../../../icons';
import useModalState from '../../../hooks/useModalState';
import cx from 'classnames';
import NoteModel, {Note} from '../../../models/note';

type TranslateViewProps = {
    note: Note
    onBack: () => void
};

const TranslateView: FC<TranslateViewProps> = ({ note, onBack }) => {
    const words = useMemo(() => note.text.split(/(\s+)/), [note.text]);
    const [reverseTranslate, setReverseTranslate] = useState(true);
    const wordsWOSpaces = words.filter((w) => !/\s+/.test(w));
    const letters = wordsWOSpaces.reduce((acc, word) => acc + word.length, 0);
    const { isOpen: translatedTextIsOpen, toggle } = useModalState(false);

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
                <div className={styles.btnsPanel}>
                    <Button
                        variant={'primary'}
                        onClick={toggle}
                        className={cx(styles.openTranslatedTextBtn, { [styles.isOpen]: translatedTextIsOpen })}
                    >
                        <ArrowDownIcon fill={'white'}/>
                    </Button>
                    <Button
                        variant={'primary'}
                        onClick={() => NoteModel.save(note, true)}
                        className={styles.addNoteBtn}
                        >
                        <StarIcon stroke={'white'}/>
                    </Button>
                </div>
                <TranslatedText text={note.text} isOpen={translatedTextIsOpen}/>
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
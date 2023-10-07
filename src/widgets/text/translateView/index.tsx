import React, {FC} from 'react';
import Button from '../../../components/button';
import styles from './styles.module.scss';
import TranslatedText from './translatedText';
import {ArrowDownIcon} from '../../../icons';
import useModalState from '../../../hooks/useModalState';
import cx from 'classnames';
import Header from './header';
import {useNoteContext} from '../noteContext';
import Words from './words';
import WordsContextProvider from './wordsContext';

const TranslateView: FC = () => {
    const { note, setIsEdit } = useNoteContext();
    const { isOpen: translatedTextIsOpen, toggle } = useModalState(false);
    const onBack = () => setIsEdit(true);

    return (
        <WordsContextProvider>
            <div className={styles.container}>
                <Header/>
                <article className={styles.wordsPanel}>
                    <div className={styles.btnsPanel}>
                        <Button
                            variant={'primary'}
                            onClick={toggle}
                            className={cx(styles.openTranslatedTextBtn, { [styles.isOpen]: translatedTextIsOpen })}
                        >
                            <ArrowDownIcon fill={'white'}/>
                        </Button>
                    </div>
                    <TranslatedText text={note.text} isOpen={translatedTextIsOpen}/>
                    <Words/>
                </article>
                <Button variant={'primary'} onClick={onBack}>
                    Вернутся
                </Button>
            </div>
        </WordsContextProvider>
    );
};

export default TranslateView;
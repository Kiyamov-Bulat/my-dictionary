import React, {FC} from 'react';
import styles from './styles.module.scss';
import TranslatedText from './translatedText';
import Header from './header/header';
import Words from './words';
import WordsContextProvider from './wordsContext';

const TranslateView: FC = () => {
    return (
        <WordsContextProvider>
            <div className={styles.container}>
                <Header/>
                <article className={styles.wordsPanel}>
                    <TranslatedText/>
                    <Words/>
                </article>
            </div>
        </WordsContextProvider>
    );
};

export default TranslateView;
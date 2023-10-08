import React, {FC} from 'react';
import styles from './styles.module.scss';
import TranslatedText from './translatedText';
import Words from './words';
import WordsContextProvider from './wordsContext';
import ControlPanel from './controlPanel';

const TranslateView: FC = () => {
    return (
        <WordsContextProvider>
            <div className={styles.container}>
                <article>
                    <ControlPanel/>
                    <TranslatedText/>
                    <Words/>
                </article>
            </div>
        </WordsContextProvider>
    );
};

export default TranslateView;
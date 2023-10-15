import React, {FC, useRef, useState} from 'react';
import styles from './styles.module.scss';
import Word from './word';
import {useWithSpacesWords} from '../wordsContext';
import isSpace from '../../../../utils/isSpace';
import TranslationUnitPopup from '../translationUnitPopup/translationUnitPopup';
import minmax from '../../../../utils/minmax';

const POPUP_MARGIN = 8;

type PopupInfo = {
    selection: string
    wordElement: HTMLElement
}

const getPopupInitialCoords = (
    wordsContainer: HTMLElement | null,
    word: HTMLElement | null,
    popup: HTMLElement
) => {
    if (!wordsContainer) {
        return { x: 0, y: 0 };
    }
    const min = { x: wordsContainer.offsetLeft, y: wordsContainer.offsetTop };

    if (!word) {
        return min;
    }

    const pos = {
        x: word.offsetLeft + word.offsetWidth / 2 - popup.offsetWidth / 2,
        y: word.offsetTop + word.offsetHeight + POPUP_MARGIN,
    };
    const max = {
        x: min.x + wordsContainer.offsetWidth - popup.offsetWidth,
        y: pos.y
    };

    return {
        x: minmax(pos.x, min.x, max.x),
        y: minmax(pos.y, min.y, max.y)
    };
};

 const Words: FC = () => {
    const $wordsContainer = useRef<HTMLElement | null>(null);
    const words = useWithSpacesWords();
    const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

    const openPopup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, selection: string) => {
        setPopupInfo({ selection, wordElement: e.target as HTMLElement });
    };

    return (
        <section className={styles.words} ref={$wordsContainer}>
            {words.map((word, idx) =>
                isSpace(word) ? word : <Word key={idx} value={word} onClick={openPopup}/>)
            }
            <TranslationUnitPopup
                isOpen={!!popupInfo}
                getInitialPosition={(popup) =>
                    getPopupInitialCoords($wordsContainer.current, popupInfo?.wordElement || null, popup)
                }
                text={popupInfo?.selection || ''}
                onClose={() => setPopupInfo(null)}
            />
        </section>
    );
};

export default Words;
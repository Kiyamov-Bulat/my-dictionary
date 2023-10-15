import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import TranslationUnitPopup from '../translationUnitPopup/translationUnitPopup';
import cx from 'classnames';
import {useWordsContext} from '../wordsContext';
import useWordSelection from './useWordSelection';

type WordProps = {
    value: string
};

const POPUP_MARGIN = 8;

const Word: FC<WordProps> = ({ value }) => {
    const $element = useRef(null);
    const { hasWordInGroups } = useWordsContext();
    const [popupCoords, setPopupCoords] = useState<{ x: number, y: number } | null>(null);
    const translateIsCached = useRef(false);
    const { selection, saveSelection, clearSelection } = useWordSelection($element.current);

    const openPopup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        setPopupCoords({
            x: target.offsetLeft + target.offsetWidth / 2,
            y: target.offsetTop + target.offsetHeight + POPUP_MARGIN
        });
    };

    return (
        <>
            <span
                ref={$element}
                onMouseDown={saveSelection}
                className={cx(styles.word, { [styles.cached]: translateIsCached.current, [styles.hasWord]: hasWordInGroups(value) })}
                onClick={openPopup}>
                {value}
            </span>
            <TranslationUnitPopup
                text={selection}
                coords={popupCoords}
                onClose={() => {
                    translateIsCached.current = selection === value;
                    setPopupCoords(null);
                    clearSelection();
                }}
            />
        </>
    );
};

export default Word;
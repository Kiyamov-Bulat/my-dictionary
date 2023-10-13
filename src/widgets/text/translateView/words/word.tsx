import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import TranslationUnitPopup from '../translationUnitPopup/translationUnitPopup';
import cx from 'classnames';
import {useWordsContext} from '../wordsContext';

type WordProps = {
    value: string
};

const POPUP_MARGIN = 8;

const isCorrectSelection = (element: HTMLElement | null) => {
    const selection = window.getSelection();
    const parent = element?.parentElement;

    return (
        element && selection && parent &&
        parent.contains(selection.anchorNode) &&
        parent.contains(selection.focusNode) &&
        selection.containsNode(element, true)
    );
};

const Word: FC<WordProps> = ({ value }) => {
    const $element = useRef(null);
    const { hasWordInGroups } = useWordsContext();
    const [popupCoords, setPopupCoords] = useState<{ x: number, y: number } | null>(null);
    const translateIsCached = useRef(false);
    const $selection = useRef('');

    const saveSelection = () => {
        if (isCorrectSelection($element.current)) {
            $selection.current = window.getSelection()?.toString() || '';
        }
    };

    const openPopup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        setPopupCoords({
            x: target.offsetLeft + target.offsetWidth / 2,
            y: target.offsetTop + target.offsetHeight + POPUP_MARGIN
        });
    };

    useEffect(() => {
        $selection.current = '';
    }, [value]);

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
                text={$selection.current || value}
                coords={popupCoords}
                onClose={() => {
                    translateIsCached.current = !$selection.current;
                    setPopupCoords(null);
                    $selection.current = '';
                }}
            />
        </>
    );
};

export default Word;
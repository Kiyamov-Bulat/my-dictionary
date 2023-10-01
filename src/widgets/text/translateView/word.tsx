import React, {FC, useRef, useState} from 'react';
import styles from './styles.module.scss';
import TranslationUnitPopup from './translationUnitPopup';
import cx from 'classnames';

type WordProps = {
    value: string
    reverseTranslate: boolean
};

const POPUP_MARGIN = 8;

const Word: FC<WordProps> = ({ value, reverseTranslate }) => {
    const [popupCoords, setPopupCoords] = useState<{ x: number, y: number } | null>(null);
    const translateIsCached = useRef(false);
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
                className={cx(styles.word, { [styles.cached]: translateIsCached.current })}
                onClick={openPopup}>
                {value}
            </span>
            <TranslationUnitPopup
                text={value}
                coords={popupCoords}
                reverse={reverseTranslate}
                onClose={() => {
                    translateIsCached.current = true;
                    setPopupCoords(null);
                }}
            />
        </>
    );
};

export default Word;
import React, {FC, useMemo, useRef, useState} from 'react';
import styles from './styles.module.scss';
import TranslationUnitPopup from '../translationUnitPopup/translationUnitPopup';
import cx from 'classnames';
import {getSelectHasWord} from '../../../../store/selectors/dictionary';
import {useSelector} from 'react-redux';

type WordProps = {
    value: string
};

const POPUP_MARGIN = 8;

const Word: FC<WordProps> = ({ value }) => {
    const [popupCoords, setPopupCoords] = useState<{ x: number, y: number } | null>(null);
    const translateIsCached = useRef(false);
    const selectHasWord = useMemo(() => getSelectHasWord(value), [value]);
    const hasWord = useSelector(selectHasWord);

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
                className={cx(styles.word, { [styles.cached]: translateIsCached.current, [styles.hasWord]: hasWord })}
                onClick={openPopup}>
                {value}
            </span>
            <TranslationUnitPopup
                text={value}
                coords={popupCoords}
                onClose={() => {
                    translateIsCached.current = true;
                    setPopupCoords(null);
                }}
            />
        </>
    );
};

export default Word;
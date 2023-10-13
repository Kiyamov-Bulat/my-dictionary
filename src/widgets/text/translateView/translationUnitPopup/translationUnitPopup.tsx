import React, {FC, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import TranslationUnitCard from '../../../translationUnitCard';
import styles from './styles.module.scss';
import useOutsideAlerter from '../../../../hooks/useOutsideAlerter';
import TranslationUnitModel from '../../../../models/translationUnit';
import {addTranslationUnit} from '../../../../store/slices/dictionary';
import useTranslation from './useTranslation';
import {useWordsContext} from '../wordsContext';

type TranslationUnitPopupProps = {
    text: string
    coords: { x: number, y: number } | null
    onClose: () => void
};

const INITIAL_POSITION = { x: -10000, y: -10000 };

const TranslationUnitPopup: FC<TranslationUnitPopupProps> = ({ text, onClose, coords }) => {
    const $popup = useRef<HTMLDivElement | null>(null);
    const { reverseTranslate } = useWordsContext();
    const [unit, translate] = useTranslation(text, reverseTranslate);
    const [position, setPosition] = useState(INITIAL_POSITION);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!coords) { return; }
        if (!unit) {
            translate();
            return;
        }

        return TranslationUnitModel.vocalize(unit);
    }, [unit, coords, translate]);

    useOutsideAlerter(() => {
        setPosition(INITIAL_POSITION);
        onClose();
    }, $popup);
    
    // @TODO loader and error manager
    if (!unit || !coords) { return null; }
    
    const initPosition = (instance: HTMLDivElement | null) => {
        $popup.current = instance;

        if (instance && position.x === -10000) {
            const x = Math.min(Math.max(coords.x - instance.offsetWidth / 2, 0), window.innerWidth);
            const y = Math.max(coords.y, 0);

            setPosition({ x, y });
        }
    };
    
    return (
        <div
            onClick={() => dispatch(addTranslationUnit(unit))}
            ref={initPosition}
            className={styles.translationPopup}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <TranslationUnitCard unit={unit}/>
        </div>
    );
};

export default TranslationUnitPopup;
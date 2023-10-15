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
    getInitialPosition: (instance: HTMLElement) => Point
    onClose: () => void
    isOpen: boolean
};

const INITIAL_POSITION = { x: -10000, y: -10000 };

const TranslationUnitPopup: FC<TranslationUnitPopupProps> = ({ isOpen, text, onClose, getInitialPosition }) => {
    const $popup = useRef<HTMLDivElement | null>(null);
    const { reverseTranslate } = useWordsContext();
    const [unit, translate] = useTranslation(text, reverseTranslate);
    const [position, setPosition] = useState(INITIAL_POSITION);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isOpen) { return; }
        if (!unit) {
            translate();
            return;
        }

        return TranslationUnitModel.vocalize(unit);
    }, [unit, isOpen, translate]);

    useOutsideAlerter(() => {
        setPosition(INITIAL_POSITION);
        onClose();
    }, $popup);
    
    // @TODO loader and error manager
    if (!unit || !isOpen) { return null; }
    
    const initPosition = (instance: HTMLDivElement | null) => {
        $popup.current = instance;

        if (instance && position.x === INITIAL_POSITION.x) {
            setPosition(getInitialPosition(instance));
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
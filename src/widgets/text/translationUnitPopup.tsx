import React, {FC, useEffect, useRef, useState} from 'react';
import {selectTransLang} from '../../store/selectors/configuration';
import {useSelector} from 'react-redux';
import TranslationUnitCard from '../translationUnitCard';
import styles from './styles.module.scss';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import TranslationUnitModel from '../../models/translationUnit';
import {DEFAULT_TEXT_LANG} from '../../models/configuration';
import {TranslationUnit} from '../../models/types';

type TranslationUnitPopupProps = {
    text: string
    coords: { x: number, y: number }
    onClose: () => void
};

const TranslationUnitPopup: FC<TranslationUnitPopupProps> = ({ text, onClose, coords }) => {
    const $popup = useRef<HTMLElement | null>(null);
    const [unit, setUnit] = useState<TranslationUnit | null>(null);
    const transLang = useSelector(selectTransLang);
    const [position, setPosition] = useState({ x: -10000, y: -10000 });

    useEffect(() => {
        TranslationUnitModel
            .translate(text, DEFAULT_TEXT_LANG, transLang).then(setUnit);
    }, [text]);

    useEffect(() => {
        unit && TranslationUnitModel.vocalize(unit);
    }, [unit]);

    useOutsideAlerter(onClose, $popup);
    
    // @TODO loader and error manager
    if (!unit) { return null; }
    
    return (
        <div
            ref={(instance) => {
                $popup.current = instance;

                if (instance && position.x === -10000) {
                    setPosition({
                        x: coords.x - instance.offsetWidth / 2,
                        y: coords.y,
                    });
                }
            }}
            className={styles.translationPopup}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <TranslationUnitCard unit={unit}/>
        </div>
    );
};

export default TranslationUnitPopup;
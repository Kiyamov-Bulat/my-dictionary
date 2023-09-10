import React, {FC, useEffect, useRef, useState} from 'react';
import {selectTransLang} from '../../store/selectors/configuration';
import {useSelector} from 'react-redux';
import TranslationUnitCard from '../translationUnitCard';
import styles from './styles.module.scss';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

type TranslationUnitPopupProps = {
    text: string
    coords: { x: number, y: number }
    onClose: () => void
};

const TranslationUnitPopup: FC<TranslationUnitPopupProps> = ({ text, onClose, coords }) => {
    const $popup = useRef<HTMLElement | null>(null);
    const [unit, setUnit] = useState({
        'id': 'a33261d1-5a4f-4799-a682-c63220b7b7b0',
        'textLang': 'auto',
        'transLang': 'ko',
        'text': 'text',
        'translation': '텍스트',
        'createdAt': 1694351673011,
        'group': 'Main',
        'memoryPercent': 0,
        'currMistakes': 0,
        'totalMistakes': 0,
        'totalResets': 0,
        'imageSrc': 'https://live.staticflickr.com/65535/53177555665_e807b2c2ac_b.jpg'
    });
    const transLang = useSelector(selectTransLang);
    const [position, setPosition] = useState({ x: -10000, y: -10000 });

    useEffect(() => {
        // TranslationUnitModel
        //     .translate(text, DEFAULT_TEXT_LANG, transLang).then(setUnit as any);
    }, [text]);

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
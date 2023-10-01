import React, {FC, useEffect, useRef, useState} from 'react';
import {selectTextLang, selectTransLang} from '../../../store/selectors/configuration';
import {useDispatch, useSelector} from 'react-redux';
import TranslationUnitCard from '../../translationUnitCard';
import styles from './styles.module.scss';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';
import TranslationUnitModel from '../../../models/translationUnit';
import {TranslationUnit} from '../../../models/types';
import {addTranslationUnit} from '../../../store/slices/dictionary';

type TranslationUnitPopupProps = {
    text: string
    coords: { x: number, y: number }
    onClose: () => void
    reverse?: boolean
};

const TranslationUnitPopup: FC<TranslationUnitPopupProps> = ({ text, onClose, coords, reverse = false }) => {
    const $popup = useRef<HTMLElement | null>(null);
    const [unit, setUnit] = useState<TranslationUnit | null>(null);
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const [position, setPosition] = useState({ x: -10000, y: -10000 });
    const dispatch = useDispatch();

    useEffect(() => {
        TranslationUnitModel
            .translate(text, textLang, transLang)
            .then((unit) => {
                if (unit.text === unit.translation) {
                    return new Promise<TranslationUnit>(resolve => {
                        setTimeout(() =>
                            resolve(TranslationUnitModel.translate(text, transLang, textLang))
                        , 300);
                    });
                }
                return unit;
            })
            .then((unit) => reverse ? TranslationUnitModel.swapTextAndTranslation(unit) : unit)
            .then(setUnit);
    }, [text, textLang, transLang, reverse]);

    useEffect(() => {
        unit && TranslationUnitModel.vocalize(unit);
    }, [unit]);

    useOutsideAlerter(onClose, $popup);
    
    // @TODO loader and error manager
    if (!unit) { return null; }
    
    return (
        <div
            onClick={() => dispatch(addTranslationUnit(unit))}
            ref={(instance) => {
                $popup.current = instance;

                if (instance && position.x === -10000) {
                    const x = Math.min(Math.max(coords.x - instance.offsetWidth / 2, 0), window.innerWidth);
                    const y = Math.min(Math.max(coords.y, 0), window.innerHeight);

                    setPosition({ x, y });
                }
            }}
            className={styles.translationPopup}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <TranslationUnitCard unit={unit}/>
        </div>
    );
};

export default TranslationUnitPopup;
import React, {FC, useMemo, useState} from 'react';
import Button from '../../components/button';
import styles from './styles.module.scss';
import text from './index';
import TranslationUnitPopup from './translationUnitPopup';

type TranslateViewProps = {
    text: string
    onBack: () => void
};

const POPUP_MARGIN = 16;

const TranslateView: FC<TranslateViewProps> = ({ text, onBack }) => {
    const [selectedWord, setSelectedWord] = useState('text');
    const words = useMemo(() => 'text for test! the world is the beautiful place'.split(' '), [text]);
    const [popupCoords, setPopupCoords] = useState<{ x: number, y: number } | null>(null);
    const openPopup: React.MouseEventHandler = (e) => {
        const target = e.target as HTMLElement;

        setPopupCoords({
            x: target.offsetLeft + target.offsetWidth / 2,
            y: target.offsetTop + target.offsetHeight + POPUP_MARGIN
        });
    };

    return (
        <div className={styles.container}>
            <h1>Интерактивный перевод</h1>
            <p className={styles.words}>
                {words?.map((word, idx) =>
                    <span key={idx}>
                        {!!idx && ' '}
                        <span className={styles.word} key={idx} onClick={openPopup}>{word}</span>
                    </span>
                )}
            </p>
            <Button variant={'primary'} onClick={onBack}>
                Вернутся
            </Button>
            {popupCoords && <TranslationUnitPopup
                text={text}
                coords={popupCoords}
                onClose={() => setPopupCoords(null)}
            />}
        </div>
    );
};

export default TranslateView;
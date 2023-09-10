import React, {FC, useRef} from 'react';
import styles from './styles.module.scss';
import HOTKEYS from '../../utils/hotkeys';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

type HelpContentProps = { onClose: () => void }
const HelpContent: FC<HelpContentProps> = ({ onClose }) => {
    const $container = useRef<HTMLDivElement | null>(null);

    useOutsideAlerter(onClose, $container);
    return (
        <div className={styles.helpContent} ref={$container}>
            <div className={styles.hotkeys}>
                <h2 className={styles.title}>Горящие клавиши:</h2>
                <ul className={styles.hotkeysList}>
                    {HOTKEYS.toStringList((key, description) =>
                        <p key={key}><span>{description}</span><span className={styles.key}>{key}</span></p>
                    )}
                </ul>
            </div>
            <div className={styles.separator}></div>
        </div>
    );
};

export default HelpContent;
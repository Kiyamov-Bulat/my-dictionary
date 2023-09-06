import React, {FC} from 'react';
import styles from './styles.module.scss';
import HOTKEYS from '../../utils/hotkeys';

const HelpContent: FC = () => {

    return (
        <div className={styles.helpContent}>
            <div className={styles.hotkeys}>
                <h2 className={styles.title}>Горящие клавиши:</h2>
                <ul className={styles.hotkeysList}>
                    {HOTKEYS.toStringList((key, description) =>
                        <p><span>{description}</span><span className={styles.key}>{key}</span></p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default HelpContent;
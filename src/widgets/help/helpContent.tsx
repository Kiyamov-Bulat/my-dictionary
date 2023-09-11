import React, {FC, useRef} from 'react';
import styles from './styles.module.scss';
import HOTKEYS from '../../utils/hotkeys';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

type HelpContentProps = { onClose: () => void }
const HelpContent: FC<HelpContentProps> = ({ onClose }) => {
    const $container = useRef<HTMLDivElement | null>(null);

    useOutsideAlerter(onClose, $container);
    return (
        <article className={styles.helpContent} ref={$container}>
            <section className={styles.hotkeys}>
                <h2 className={styles.title}>Горящие клавиши:</h2>
                <ul className={styles.hotkeysList}>
                    {HOTKEYS.toStringList((key, description) =>
                        <li key={key}><span>{description}</span><span className={styles.key}>{key}</span></li>
                    )}
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>Группы:</h2>
                <ul className={styles.groups}>
                    <li>
                        Словарь поделен на группы,
                        в словаре всегда существует главная группа
                        "<span className={styles.attention}>Main</span>" и,
                        если не выбраны другие группы, она выбирается по умолчанию.
                    </li>
                    <li>
                        Чтобы создать группу откройте виджет группы,
                        переключив виджет перевода при помощи кнопки в правом верхнем углу.
                    </li>
                    <li>
                        Чтобы выделить или снять выделение с группы зажмите левую кнопку на этой группе.
                        Все новые слова, которые вы добавите, будут добавляться в выделенные группы.
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default HelpContent;
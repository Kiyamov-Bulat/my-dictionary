import React, {FC, ReactNode} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export type ModalProps = {
    isOpen: boolean
    title?: string
    onClose: () => void
    text?: string
    className?: string
    children?: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, title, text, className, onClose, children }) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className={cx(styles.modalWrapper, className)} onClick={onClose}>
            <section className={styles.modal} onClick={e => e.stopPropagation()}>
                {title && <h1>{title}</h1>}
                <article className={styles.content}>{text || children}</article>
            </section>
        </div>
    );
};

export default Modal;
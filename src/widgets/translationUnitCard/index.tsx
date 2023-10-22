import React, {FC, PropsWithChildren} from 'react';
import {TranslationUnit} from '../../models/types';
import styles from './styles.module.scss';
import cx from 'classnames';
import EditableLabel from '../../components/editableLabel';

type TranslationUnitCardProps = {
    className?: string
    unit: TranslationUnit
    showImage?: boolean
    editable?: boolean
}

const TranslationUnitCard: FC<PropsWithChildren<TranslationUnitCardProps>> = (
    {
        className,
        unit,
        showImage = true,
        children,
        editable = false,
    }
) => {

    return (
        <section className={cx(styles.translationUnitCardContainer, className)}>
            {showImage && <aside className={styles.imgWrapper}>
                <img src={unit.imageSrc}/>
            </aside>}
            <article className={styles.unitDataContainer}>
                <div className={styles.text}>
                    <EditableLabel value={unit.text} disabled={!editable}/>
                    <div className={styles.lang}>({unit.textLang})</div>
                    &nbsp;-&nbsp;
                    <EditableLabel value={unit.translation} disabled={!editable}/>
                    <div className={styles.lang}>({unit.transLang})</div>
                </div>
                {children}
            </article>
        </section>
    );
};

export default TranslationUnitCard;
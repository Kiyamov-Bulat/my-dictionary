import React, {FC} from 'react';
import {TranslationUnit} from '../../models/types';
import styles from './styles.module.scss';
import cx from 'classnames';

type TranslationUnitCardProps = {
    className?: string
    unit: TranslationUnit
}

const TranslationUnitCard: FC<TranslationUnitCardProps> = ({ className, unit }) => {

    return (
        <div className={cx(styles.translationUnitCardContainer, className)}>
            <div className={styles.imgWrapper}>
                <img src={unit.imageSrc}/>
            </div>
            <p className={styles.text}>
                <span>{unit.text}</span>
                <span className={styles.lang}>({unit.textLang})</span>
                &nbsp;-&nbsp;
                <span>{unit.translation}</span>
                <span className={styles.lang}>({unit.transLang})</span>
            </p>
        </div>
    );
};

export default TranslationUnitCard;
import React, {FC, useEffect} from 'react';
import styles from '../../styles.module.scss';
import {useSelector} from 'react-redux';
import {selectCurrentUnit, selectCurrentUnitNumber} from '../../../../../store/selectors/game';
import TranslationUnitModel from '../../../../../models/translationUnit';
import noImageSrc from '../../../../../assets/noImage.svg';
type UnitProps = { reverse?: boolean };

const Unit: FC<UnitProps> = ({ reverse }) => {
    const currentUnit = useSelector(selectCurrentUnit);
    const currentUnitNumber = useSelector(selectCurrentUnitNumber);

    useEffect(() => {
        if (reverse && currentUnit) {
            TranslationUnitModel.vocalize(currentUnit);
        }
    }, [currentUnit, reverse]);

    return (
        <div className={styles.unitToStudy}>
            <div className={styles.imageWrapper}>
                <img src={currentUnit?.imageSrc || noImageSrc}/>
            </div>
            <p>
                {currentUnitNumber}. {reverse ? currentUnit?.translation :  currentUnit?.text}
            </p>
        </div>
    );
};

export default Unit;
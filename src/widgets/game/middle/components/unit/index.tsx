import React, {FC} from 'react';
import styles from '../../styles.module.scss';
import {useSelector} from 'react-redux';
import {selectCurrentUnit, selectCurrentUnitNumber} from '../../../../../store/selectors/game';

type UnitProps = { reverse?: boolean };

const Unit: FC<UnitProps> = ({ reverse }) => {
    const currentUnit = useSelector(selectCurrentUnit);
    const currentUnitNumber = useSelector(selectCurrentUnitNumber);

    return (
        <div className={styles.unitToStudy}>
            <div className={styles.imageWrapper}>
                <img src={currentUnit?.imageSrc}/>
            </div>
            <p>
                {currentUnitNumber}. {reverse ? currentUnit?.translation :  currentUnit?.text}
            </p>
        </div>
    );
};

export default Unit;
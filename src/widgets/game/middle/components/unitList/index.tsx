import React, {FC} from 'react';
import styles from '../../styles.module.scss';
import Option from '../option';
import {useSelector} from 'react-redux';
import {selectNextUnitList} from '../../../../../store/selectors/game';

type UnitListProps = { reverse?: boolean };

const UnitList: FC<UnitListProps> = ({ reverse }) => {
    const units = useSelector(selectNextUnitList);

    return (
        <div className={styles.unitList}>
            {units.map((u, idx) => <Option key={u.id} index={idx} unit={u} reverse={reverse}/>)}
        </div>
    );
};

export default UnitList;
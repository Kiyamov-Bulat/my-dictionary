import React, {FC, useRef, useState} from 'react';
import GroupModel, {Group as IGroup} from '../../models/group';
import Dropdown from '../../components/dropdown';
import TranslationUnitComponent from './translationUnit';
import {TranslationUnit} from '../../models/types';
import {DropdownOption} from '../../components/dropdown/dropdownList';
import styles from './styles.module.scss';
import cx from 'classnames';
import RemoveBtn from '../../components/removeBtn';
import {useDispatch, useSelector} from 'react-redux';
import {removeGroup, toggleSelectedGroup} from '../../store/slices/dictionary';
import MemoryChart from './memoryChart';
import Selectable from '../../components/selectable';
import {getSelectIsGroupSelected} from '../../store/selectors/dictionary';
import GroupContainer from './groupContainer';

const toDropdownOptions = (units: TranslationUnit[]): DropdownOption[] => {
    if (units.length) {

        return units.map((u) => ({
            key: u.id,
            value: <TranslationUnitComponent key={u.id} {...u}/>
        }));
    }
    return [{ key: '1', value: 'Группа пуста' }];
};

const Group: FC<IGroup> = (group) => {
    const dispatch = useDispatch();
    const { units, title, id, color } = group;
    const [isOpen, setIsOpen] = useState(true);
    const memorizedUnitsNumber = GroupModel.getMemorizedUnitsNumber(units);
    const toggleIsOpen = () => setIsOpen((isOpen) => !isOpen);
    

    return (
        <GroupContainer id={id} color={color}>
            <Dropdown
                onClick={toggleIsOpen}
                className={cx(styles.group, {[styles.noUnits]: units.length === 0})}
                isOpen={isOpen}
                btnSize={18}
                selectedOption={''}
                options={toDropdownOptions(units)}
            >
                <div className={styles.header}>
                    <p className={styles.title}>
                        {title} {memorizedUnitsNumber} / {units.length}
                    </p>
                    <MemoryChart current={memorizedUnitsNumber} total={units.length}/>
                    {!GroupModel.isMain(group) &&
                        <RemoveBtn className={styles.rmBtn} onClick={() => dispatch(removeGroup(id))}/>
                    }
                </div>
            </Dropdown>
        </GroupContainer>
    );
};

export default Group;
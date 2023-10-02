import React, {FC, useState} from 'react';
import GroupModel, {Group as IGroup} from '../../models/group';
import Dropdown from '../../components/dropdown';
import TranslationUnitComponent from './translationUnit';
import {TranslationUnit} from '../../models/types';
import {DropdownOption} from '../../components/dropdown/dropdownList';
import styles from './styles.module.scss';
import cx from 'classnames';
import RemoveBtn from '../../components/removeBtn';
import {useDispatch} from 'react-redux';
import {removeGroup, toggleOpen, toggleSelected} from '../../store/slices/dictionary';
import MemoryChart from './memoryChart';
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
    const { units, title, id, color, selected, open } = group;
    const memorizedUnitsNumber = GroupModel.getMemorizedUnitsNumber(units);
    const toggleIsSelected = () => dispatch(toggleSelected(id));
    const toggleIsOpen = () => dispatch(toggleOpen(id));


    return (
        <GroupContainer isSelected={selected} color={color} onClick={toggleIsSelected}>
            <Dropdown
                onClick={toggleIsOpen}
                className={cx(styles.group, {[styles.noUnits]: units.length === 0})}
                isOpen={open}
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
import React, {FC, useState} from 'react';
import AddField from '../../components/addField';
import styles from './styles.module.scss';
import {useDispatch} from 'react-redux';
import {addGroup} from '../../store/slices/dictionary';
import GroupModel from '../../models/group';

const AddGroup: FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const onAdd = () => {
        //@TODO title check
        dispatch(addGroup(GroupModel.create(title)));
        setTitle('');
    };
    return (
        <div className={styles.addGroupContainer}>
            <p className={styles.title}>Группы</p>
            <AddField
                onAdd={onAdd}
                textFieldProps={{ onChange: setTitle, className: styles.addField }}
            />
        </div>
    );
};

export default AddGroup;
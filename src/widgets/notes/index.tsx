import React, {FC} from 'react';
import {selectNotes} from '../../store/selectors/note';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import Note from './note';

const Notes: FC = () => {
    const notes = useSelector(selectNotes);

    return (
        <div className={styles.notesContainer}>
            {notes.map((n) => <Note key={n.id} note={n}/>)}
        </div>
    );
};

export default Notes;
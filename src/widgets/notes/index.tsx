import React, {FC} from 'react';
import {selectNotes} from '../../store/selectors/note';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';

const Notes: FC = () => {
    const notes = useSelector(selectNotes);

    return (
        <div className={styles.notesContainer}>
            {notes.map((n) => <p className={styles.noteContainer}>{n.text}</p>)}
        </div>
    );
};

export default Notes;
import React, {FC} from 'react';
import {useNoteContext} from '../../noteContext';
import styles from './styles.module.scss';
import Statistics from './statistics';
import NoteHeader from '../../../notes/noteHeader';
import Controls from './controls';

const ControlPanel: FC = () => {
    const { note, saveNote, added } = useNoteContext();

    return (
        <div className={styles.controlPanelContainer}>
            <NoteHeader note={note} className={styles.header} onUpdateNote={(note) => saveNote(note, added)}/>
            <Controls/>
            <Statistics/>
        </div>
    );
};

export default ControlPanel;
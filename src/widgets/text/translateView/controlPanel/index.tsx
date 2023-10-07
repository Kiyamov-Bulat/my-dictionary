import React, {FC} from 'react';
import Button from '../../../../components/button';
import NoteModel, {Note} from '../../../../models/note';
import {StarIcon} from '../../../../icons';
import {useNoteContext} from '../../noteContext';
import styles from './styles.module.scss';

const ControlPanel: FC = () => {
    const { note, saveNote } = useNoteContext();

    return (
        <div className={styles.controlPanelContainer}>
            <Button
                variant={'primary'}
                onClick={() => NoteModel.save(note, true)}
                className={styles.addNoteBtn}
            >
                <StarIcon stroke={'white'}/>
            </Button>
        </div>
    );
};

export default ControlPanel;
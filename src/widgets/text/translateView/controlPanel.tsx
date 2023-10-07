import React, {FC} from 'react';
import Button from '../../../components/button';
import NoteModel, {Note} from '../../../models/note';
import styles from './styles.module.scss';
import {StarIcon} from '../../../icons';
import {useNoteContext} from '../noteContext';

type ControlPanelProps = {
    note: Note
};

const ControlPanel: FC<ControlPanelProps> = () => {
    const { note } = useNoteContext();

    return (
        <div>
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
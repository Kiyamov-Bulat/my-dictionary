import React, {FC} from 'react';
import styles from './styles.module.scss';
import NoteModel, {Note as NoteType} from '../../models/note';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {setPanelView} from '../../store/slices/configuration';
import {EPanelView} from '../../models/configuration';
import {useDispatch} from 'react-redux';

type NoteProps = {
    note: NoteType
};

const Note: FC<NoteProps> = ({ note }) => {
    const dispatch = useDispatch();
    const goToTranslate = () => {
        NoteModel.saveInCache({ value: note, added: true });
        dispatch(setPanelView(EPanelView.TEXT, ));
    };
    return (
        <div className={styles.noteContainer}>
            <div>
                {note.text}
            </div>
            <div>
                <ButtonWithTooltip action={goToTranslate} tipContent={'Переводить'}>
                    Переводить
                </ButtonWithTooltip>
            </div>
        </div>

    );
};

export default Note;
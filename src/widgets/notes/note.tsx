import React, {FC} from 'react';
import styles from './styles.module.scss';
import NoteModel, {Note as NoteType} from '../../models/note';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {setPanelView} from '../../store/slices/configuration';
import ConfigurationModel, {EPanelView} from '../../models/configuration';
import {useDispatch} from 'react-redux';
import {PenIcon} from '../../icons';
import RemoveBtn from '../../components/removeBtn';
import {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import NoteHeader from './noteHeader';

type NoteProps = {
    note: NoteType
};

const Note: FC<NoteProps> = ({ note }) => {
    const dispatch = useDispatch();

    const goToTranslate = () => {
        const panel = EPanelView.TEXT;

        NoteModel.saveInCache({ value: note, added: true });
        dispatch(setPanelView(panel));
        ConfigurationModel.saveMainPanelView(panel);
    };

    return (
        <div className={styles.noteContainer}>
            <div className={styles.btns}>
                <ButtonWithTooltip position={ETooltipPosition.N} Icon={PenIcon} action={goToTranslate} tipContent={'Переводить'}/>
                <RemoveBtn onClick={() => NoteModel.remove(note)}/>
            </div>
            <div className={styles.contentContainer}>
                <NoteHeader note={note}/>
                <div>
                    {note.text}
                </div>
            </div>
        </div>

    );
};

export default Note;
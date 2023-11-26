import React, {FC} from 'react';
import styles from './styles.module.scss';
import NoteModel, {Note as NoteType} from '../../models/note';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import ConfigurationModel from '../../models/configuration';
import {PenIcon} from '../../icons';
import RemoveBtn from '../../components/removeBtn';
import {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import NoteHeader from './noteHeader';
import {EPanelView} from '../../models/types';

type NoteProps = {
    note: NoteType
};

const Note: FC<NoteProps> = ({ note }) => {
    const goToTranslate = () => {
        NoteModel.saveInCache({ value: note, added: true });
        ConfigurationModel.saveMainPanelView(EPanelView.TEXT);
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
import React, {FC} from 'react';
import styles from './styles.module.scss';
import NoteModel, {Note as NoteType} from '../../models/note';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {setPanelView} from '../../store/slices/configuration';
import {EPanelView} from '../../models/configuration';
import {useDispatch} from 'react-redux';
import {PenIcon} from '../../icons';
import EditableLabel from '../../components/editableLabel';
import RemoveBtn from '../../components/removeBtn';
import {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import Tag from './tag';
import Notice from '../../components/notice';

type NoteProps = {
    note: NoteType
};

const Note: FC<NoteProps> = ({ note }) => {
    const dispatch = useDispatch();
    const saveTitle = (title: string) => {
        NoteModel.save({ ...note, title }, true);
        return true;
    };

    const saveTag = (tag: string) => {
        if (note.tags.includes(tag)) {
            Notice.warn('Такой тэг уже существует');
            return false;
        }
        NoteModel.save({ ...note, tags: [...note.tags, tag] }, true);
        return true;
    };

    const goToTranslate = () => {
        NoteModel.saveInCache({ value: note, added: true });
        dispatch(setPanelView(EPanelView.TEXT, ));
    };
    const tags = note.title !== NoteModel.DEFAULT_TITLE ? [note.title, ...note.tags] : note.tags;

    return (
        <div className={styles.noteContainer}>
            <div className={styles.btns}>
                <ButtonWithTooltip position={ETooltipPosition.N} Icon={PenIcon} action={goToTranslate} tipContent={'Переводить'}/>
                <RemoveBtn onClick={() => NoteModel.remove(note)}/>
            </div>
            <div className={styles.contentContainer}>
                <EditableLabel
                    className={styles.title}
                    value={note.title || NoteModel.DEFAULT_TITLE}
                    onSetInactive={saveTitle}
                />
                <div className={styles.tagList}>
                    <EditableLabel
                        className={styles.tag}
                        value={'Новый тэг'}
                        onSetInactive={saveTag}/>
                    {tags.map((tag, idx) => <Tag name={tag} key={tag + idx}/>)}
                </div>
                <div>
                    {note.text}
                </div>
            </div>
        </div>

    );
};

export default Note;
import React, {FC, useMemo} from 'react';
import EditableLabel from '../../components/editableLabel';
import styles from './styles.module.scss';
import NoteModel, {Note} from '../../models/note';
import Tag from './tag';
import Notice from '../../components/notice';

type NoteHeaderProps = {
    note: Note
    className?: string
    onUpdateNote?: (note: Note, add: boolean) => void
};

const NoteHeader: FC<NoteHeaderProps> = (
    {
        note,
        className,
        onUpdateNote = NoteModel.save
    }) => {
    const saveTitle = (title: string) => {
        onUpdateNote({ ...note, title }, true);
        return true;
    };

    const saveTag = (tag: string) => {
        if (!tag) {
            return false;
        }
        if (note.tags.includes(tag)) {
            Notice.warn('Такой тэг уже существует');
            return false;
        }
        onUpdateNote({ ...note, tags: [...note.tags, tag] }, true);
        return true;
    };

    const removeTag = (tag: string) => {
        onUpdateNote({ ...note, tags: note.tags.filter((t) => t !== tag) }, true);
    };

    return (
        <div className={className}>
            <EditableLabel
                className={styles.title}
                value={note.title || NoteModel.DEFAULT_TITLE}
                onSetInactive={saveTitle}
            />
            <div className={styles.tagList}>
                <EditableLabel
                    value={''}
                    placeholder={'Новый тэг'}
                    className={styles.tag}
                    onSetInactive={saveTag}/>
                {note.tags.map((tag, idx) =>
                    <Tag onRemove={removeTag} name={tag} key={tag + idx}/>)}
            </div>
        </div>
    );
};

export default NoteHeader;
import React, {FC} from 'react';
import EditableLabel from '../../components/editableLabel';
import styles from './styles.module.scss';
import NoteModel, {Note} from '../../models/note';
import Tag from './tag';
import Notice from '../../components/notice';
import cx from 'classnames';
import TagModel, { Tag as ITag } from '../../models/tag';

type NoteHeaderProps = {
    note: Note
    className?: string
    onUpdateNote?: (note: Note, add: boolean) => void
};

const NoteHeader: FC<NoteHeaderProps> = (
    {
        note,
        className,
        onUpdateNote = NoteModel.addOrUpdate.bind(NoteModel)
    }) => {
    const saveTitle = (title: string) => {
        onUpdateNote({ ...note, title }, true);
        return true;
    };

    const saveTag = (strTag: string) => {
        if (!strTag) {
            return false;
        }
        const tag = TagModel.create(strTag);

        if (NoteModel.hasTag(note, tag)) {
            Notice.warn('Такой тэг уже существует');
            return false;
        }
        onUpdateNote(NoteModel.addTag(note, tag), true);
        return true;
    };

    const removeTag = (tag: ITag) => {
        onUpdateNote(NoteModel.removeTag(note, tag), true);
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
                    className={cx(styles.tag, styles.createTag)}
                    onSetInactive={saveTag}/>
                {note.tags.map((tag) =>
                    <Tag onRemove={removeTag} {...tag} key={tag.id}/>)}
            </div>
        </div>
    );
};

export default NoteHeader;
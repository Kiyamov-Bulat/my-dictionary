import React, {FC} from 'react';
import styles from './styles.module.scss';
import ButtonWithTooltip from '../../../../components/button/ButtonWithTooltip';
import {ETooltipPosition} from '../../../../components/tooltip/TooltipWrapper';
import cx from 'classnames';
import {PenIcon, StarIcon, SwapIcon} from '../../../../icons';
import {useNoteContext} from '../../noteContext';
import {useWordsContext} from '../wordsContext';
import NoteModel from '../../../../models/note';
import GroupModel from '../../../../models/group';
import {addGroup} from '../../../../store/slices/dictionary';
import {useDispatch} from 'react-redux';
import FontSize from './fontSize';

const Controls: FC = () => {
    const dispatch = useDispatch();
    const { note, saveNote, added, setIsEdit } = useNoteContext();
    const { reverseTranslate, setReverseTranslate } = useWordsContext();

    const newNote = () => {
        saveNote(NoteModel.clone(note), false);
        setIsEdit(true);
    };
    const addNoteGroup = () => {
        const group = GroupModel.create(note.title);

        dispatch(addGroup(group));
        saveNote({...note, groups: [...note.groups, group.id]});
    };
    return (
        <div className={styles.btns}>
            <ButtonWithTooltip
                position={ETooltipPosition.SW}
                tipContent={'Новая заметка'}
                className={cx(styles.btn, styles.leftTip, styles.textIcon, styles.active)}
                action={() => newNote()}>
                New
            </ButtonWithTooltip>
            <ButtonWithTooltip
                Icon={StarIcon}
                position={ETooltipPosition.SW}
                tipContent={added ? 'Обновить группы' : 'Добавить заметку'}
                className={cx(styles.btn, { [styles.active]: added })}
                action={() => saveNote(note, true)}/>
            <ButtonWithTooltip
                Icon={SwapIcon}
                position={ETooltipPosition.SW}
                tipContent={reverseTranslate ? 'Выключить обратный перевод' : 'Включить обратный перевод'}
                className={cx(styles.btn, { [styles.active]: reverseTranslate })}
                action={() => setReverseTranslate((prevState) => !prevState)}/>
            {added &&
                <>
                    <ButtonWithTooltip
                        position={ETooltipPosition.S}
                        action={addNoteGroup}
                        tipContent={'Добавить группу'}
                        className={cx(styles.btn, styles.textIcon, styles.active)}
                    >
                        +G
                    </ButtonWithTooltip>
                    <ButtonWithTooltip
                        Icon={PenIcon}
                        position={ETooltipPosition.S}
                        tipContent={'Редактировать'}
                        className={cx(styles.btn, styles.active)}
                        action={() => setIsEdit(true)}
                    />
                </>}
            <FontSize/>
        </div>
    );
};

export default Controls;
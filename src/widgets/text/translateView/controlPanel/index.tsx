import React, {FC} from 'react';
import {PenIcon, StarIcon, SwapIcon} from '../../../../icons';
import {useNoteContext} from '../../noteContext';
import styles from './styles.module.scss';
import {useWordsContext} from '../wordsContext';
import cx from 'classnames';
import {ETooltipPosition} from '../../../../components/tooltip/TooltipWrapper';
import ButtonWithTooltip from '../../../../components/button/ButtonWithTooltip';
import Statistics from './statistics';
import NoteModel from '../../../../models/note';
import TranslatedText from '../translatedText';

const ControlPanel: FC = () => {
    const { note, saveNote, added, setIsEdit } = useNoteContext();
    const { reverseTranslate, setReverseTranslate } = useWordsContext();
    const newNote = () => {
        saveNote(NoteModel.clone(note), false);
        setIsEdit(true);
    };
    return (
        <div className={styles.controlPanelContainer}>
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
                {added && <ButtonWithTooltip
                    Icon={PenIcon}
                    position={ETooltipPosition.S}
                    tipContent={'Редактировать'}
                    className={cx(styles.btn, styles.active)}
                    action={() => setIsEdit(true)}
                />}
            </div>
            <Statistics/>
        </div>
    );
};

export default ControlPanel;
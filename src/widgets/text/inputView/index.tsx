import React, {FC, useEffect, useRef, useState} from 'react';
import TextField from '../../../components/textField';
import Button from '../../../components/button';
import styles from './styles.module.scss';
import {useNoteContext} from '../noteContext';

const InputView: FC = () => {
    const { note, saveNote, setIsEdit } = useNoteContext();
    const $textField = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState(note.text);
    const onSubmit = () => {
        saveNote({ ...note, text });
        setIsEdit(false);
    };
    useEffect(() => setText(note.text), [note.text]);
    useEffect(() => $textField.current?.setSelectionRange(0, text.length), []);
    return (
        <div className={styles.container}>
            <TextField
                autoFocus={true}
                ref={$textField}
                className={styles.textField}
                placeholder={'Что нибудь интересное...'}
                multiline={true}
                value={text}
                maxLength={1000} //@TODO max
                onChange={setText}/>
            <Button onClick={onSubmit} variant={'primary'}>
                Подготовить
            </Button>
        </div>
    );
};

export default InputView;
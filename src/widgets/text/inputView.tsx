import React, {FC, useEffect, useRef} from 'react';
import TextField from '../../components/textField';
import Button from '../../components/button';
import styles from './styles.module.scss';

type InputViewProps = {
    text: string
    onChange: (text: string) => void
    onSubmit: () => void
};

const InputView: FC<InputViewProps> = ({ text, onChange, onSubmit }) => {
    const $textField = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => $textField.current?.setSelectionRange(0, text.length), []);
    return (
        <div className={styles.container}>
            <h1>Введите ваш текст</h1>
            <TextField
                autoFocus={true}
                ref={$textField}
                className={styles.textField}
                placeholder={'Что нибудь интересное...'}
                multiline={true}
                value={text}
                onChange={onChange}/>
            <Button onClick={onSubmit} variant={'primary'}>
                Подготовить
            </Button>
        </div>
    );
};

export default InputView;
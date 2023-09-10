import React, {FC} from 'react';
import TextField from '../../components/textField';
import Button from '../../components/button';
import styles from './styles.module.scss';

type InputViewProps = {
    text: string
    onChange: (text: string) => void
    onSubmit: () => void
};

const InputView: FC<InputViewProps> = ({ text, onChange, onSubmit }) => {

    return (
        <div className={styles.container}>
            <h1>Введите ваш текст</h1>
            <TextField
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
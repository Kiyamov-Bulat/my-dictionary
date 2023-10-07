import React, {FC} from 'react';
import {useNoteContext} from './noteContext';
import InputView from './inputView';
import TranslateView from './translateView';

const TextViewController: FC = () => {
    const { isEdit } = useNoteContext();

    return (isEdit ? <InputView/> : <TranslateView/>);
};

export default TextViewController;
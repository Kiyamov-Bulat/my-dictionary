import React, {FC, useMemo, useState} from 'react';
import InputView from './inputView';
import TranslateView from './translateView/translateView';
import NoteModel from '../../models/note';

const Text: FC = () => {
    const { value: note, saved } = useMemo(() => NoteModel.getCached(), []);
    const [text, setText] = useState(note.text);
    const [isInput, setIsInput] = useState(!note.text);
    const toTranslateView = () => {
        NoteModel.save({ ...note, text }, saved);
        setIsInput(false);
    };
    const toInputView = () => setIsInput(true);

    return (isInput
        ? <InputView text={text} onChange={setText} onSubmit={toTranslateView}/>
        : <TranslateView note={note} onBack={toInputView}/>
    );
};

export default Text;
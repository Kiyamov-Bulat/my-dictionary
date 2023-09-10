import React, {FC, useState} from 'react';
import InputView from './inputView';
import TranslateView from './translateView';

const Text: FC = () => {
    const [text, setText] = useState('');
    const [isInput, setIsInput] = useState(false);
    const toTranslateView = () => setIsInput(false);
    const toInputView = () => setIsInput(true);

    return (isInput
        ? <InputView text={text} onChange={setText} onSubmit={toTranslateView}/>
        : <TranslateView text={text} onBack={toInputView}/>
    );
};

export default Text;
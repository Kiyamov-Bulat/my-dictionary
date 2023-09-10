import React, {FC, useMemo, useState} from 'react';
import InputView from './inputView';
import TranslateView from './translateView';
import ConfigurationModel from '../../models/configuration';

const Text: FC = () => {
    const initialText = useMemo(() => ConfigurationModel.getCachedText(), []);
    const [text, setText] = useState(initialText);
    const [isInput, setIsInput] = useState(!initialText);
    const toTranslateView = () => {
        ConfigurationModel.saveText(text);
        setIsInput(false);
    };
    const toInputView = () => setIsInput(true);

    return (isInput
        ? <InputView text={text} onChange={setText} onSubmit={toTranslateView}/>
        : <TranslateView text={text} onBack={toInputView}/>
    );
};

export default Text;
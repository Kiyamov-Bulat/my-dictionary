import React, {FC} from 'react';
import NoteContextProvider from './noteContext';
import TextViewController from './textViewController';

const Text: FC = () => {
    return (
        <NoteContextProvider>
            <TextViewController/>
        </NoteContextProvider>

    );
};

export default Text;
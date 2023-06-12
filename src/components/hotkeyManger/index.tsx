import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';

export type HotkeyBlock = boolean | string | string[];

export type HotkeyManagerProps = {
    block: HotkeyBlock
    children?: ReactNode
};

type HotkeyManagerContextValue = {
    block: HotkeyBlock
    setBlock: (block: HotkeyBlock) => void
}

export const HotkeyManagerContext = createContext<HotkeyManagerContextValue>({
    block: false,
    setBlock: () => void(0)
});

const HotkeyManager: FC<HotkeyManagerProps> = ({ block, children }) => {
    const [value, setValue] = useState(block);

    useEffect(() => {
        setValue(block);
    }, [block]);

    return (
        <HotkeyManagerContext.Provider value={{ block: value, setBlock: setValue }}>{children}</HotkeyManagerContext.Provider>
    );
};

export default HotkeyManager;
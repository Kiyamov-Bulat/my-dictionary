import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';

export type SimpleBlock = boolean | string | string[]

export type ComplexBlock = {
    block: true | string | string[]
    excludeContext: string | string[]
}

export type HotkeyBlock = SimpleBlock | ComplexBlock;

export const isComplexHotkeyBlock = (block: HotkeyBlock): block is ComplexBlock => {
    return typeof block === 'object' && !Array.isArray(block);
};

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

    return (
        <HotkeyManagerContext.Provider value={{ block: value, setBlock: setValue }}>{children}</HotkeyManagerContext.Provider>
    );
};

export default HotkeyManager;
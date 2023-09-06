import {useContext, useEffect} from 'react';
import {HotkeyManagerContext} from './index';

export type UseHotkeyOptions = {
    block?: boolean
    ctrl?: boolean
    keyup?: boolean
}

const skipEvent = (e: KeyboardEvent, key: string[], blocks: string[], ctrl?: boolean) => {
    return (!key.includes(e.key) || (ctrl !== undefined && ctrl !== (e.ctrlKey || e.metaKey)) || blocks.includes(e.key));
};

const useHotkey = (key: string | string[], callback: (e: KeyboardEvent) => void, options?: UseHotkeyOptions) => {
    const { block: globalBlock } = useContext(HotkeyManagerContext);
    const { block = false, ctrl, keyup = false } = options || {} as UseHotkeyOptions;

    useEffect(() => {
        if (block || (typeof globalBlock === 'boolean' && globalBlock)) {
            return;
        }
        const globalBlockArr = typeof globalBlock === 'string' ? [globalBlock] : (globalBlock ? globalBlock : []);

        key = typeof key === 'string' ? [key] : key;

        const handler = (e: KeyboardEvent) => {
            if (!skipEvent(e, key as string[], globalBlockArr, ctrl)) {
                callback(e);
            }
        };
        const type = keyup ? 'keyup' : 'keydown';

        document.addEventListener(type, handler);

        return () => document.removeEventListener(type, handler);
    }, [globalBlock, block, key, callback, ctrl, keyup]);
};

export default useHotkey;
import {useContext, useEffect} from 'react';
import {HotkeyBlock, HotkeyManagerContext, isComplexHotkeyBlock} from './index';

export type UseHotkeyOptions = {
    block?: boolean
    ctrl?: boolean
    keyup?: boolean
    context?: string
}

const skipEvent = (e: KeyboardEvent, key: string[], blocks: string[], ctrl?: boolean) => {
    return (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement ||
        !key.includes(e.key) ||
        (ctrl !== undefined && ctrl !== (e.ctrlKey || e.metaKey))
        || blocks.includes(e.key)
    );
};

const normalizeHotkeyBlock = (block: HotkeyBlock, context: string): string[] => {
    switch (typeof block) {
        case 'boolean':
            return []; // if true does not call this func
        case 'string':
            return [block];
        case 'object':
            if (Array.isArray(block)) {
                return block;
            }
            if (block.excludeContext.includes(context)) {
                return [];
            }
            // if block.block true does not call this func
            return Array.isArray(block.block) ? block.block : [block.block] as string[];
    }
};

const isHotkeyBlockedGlobal = (block: HotkeyBlock, context: string) => {
    return (
        (typeof block === 'boolean' && block) ||
        (
            isComplexHotkeyBlock(block) &&
            (Array.isArray(block.excludeContext)
                ? !block.excludeContext.includes(context)
                : block.excludeContext !== context
            ) &&
            typeof block.block === 'boolean' &&
            block.block
        )
    );
};

const useHotkey = (key: string | string[], callback: (e: KeyboardEvent) => void, options?: UseHotkeyOptions) => {
    const { block: globalBlock } = useContext(HotkeyManagerContext);
    const { block = false, ctrl, keyup = false, context = '' } = options || {} as UseHotkeyOptions;

    useEffect(() => {
        if (block || isHotkeyBlockedGlobal(globalBlock, context)) {
            return;
        }
        const globalBlockArr = normalizeHotkeyBlock(globalBlock, context);

        key = typeof key === 'string' ? [key] : key;

        const handler = (e: KeyboardEvent) => {
            if (!skipEvent(e, key as string[], globalBlockArr, ctrl)) {
                callback(e);
            }
        };
        const type = keyup ? 'keyup' : 'keydown';

        document.addEventListener(type, handler);

        return () => document.removeEventListener(type, handler);
    }, [globalBlock, block, key, callback, ctrl, keyup, context]);
};

export default useHotkey;
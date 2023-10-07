const SWAP_KEY = {
    ArrowRight: '→',
    ArrowLeft: '←',
    ' ': 'Space',
};

const HOTKEYS = {
    NEXT_UNIT: { key: 'ArrowRight', description: 'Следующий юнит', },
    PREV_UNIT: { key: 'ArrowLeft', description: 'Предыдущий юнит', },
    END_GAME: { key: [' ', 'ArrowRight'], description: 'Закончить игру', },
    OPEN_SETTINGS: { key: 's', ctrl: true, description: 'Открыть настройки', },
    CLOSE: { key: 'Escape', description: 'Закрыть', },
    FOCUS_TRANSLATE: { key: '/', description: 'Фокус нв перевод', },
    FOCUS_LANG: { key: 't', description: 'Фокус на язык перевода', },
    OPEN_HELP: { key: '?', description: 'Открыть подсказки', },
    
    toStringList<T = string>(cb?: (key: string, description: string) => T): T[] {
        return (Object.values(this) as ISingleHotkey[]).map((hotkey) => {
            const keyAsStr = singleHotKeyToString(hotkey);
            
            return cb ? cb(keyAsStr, hotkey.description) : `${keyAsStr} - ${hotkey.description}` as T;
        });
    }
};

export const HOTKEYS_LIST = (Object.values(HOTKEYS) as ISingleHotkey[]).reduce(
    (acc, { key }) => Array.isArray(key) ? [...acc, ...key] : [...acc, key], [] as string[]);

export const HOTKEYS_LIST_WITHOUT_ESCAPE = HOTKEYS_LIST.filter((key) => key !== 'Escape');

export const HOTKEYS_LIST_WITHOUT_ESCAPE_AND_ENTER = HOTKEYS_LIST.filter((key) => key !== 'Escape');

Object.defineProperty(HOTKEYS, 'toStringList', { enumerable: false});

type ISingleHotkey = {
    key: string | string[],
    ctrl?: boolean,
    description: string,
}

const singleHotKeyToString = (hotkey: ISingleHotkey): string => {
    const keys = (Array.isArray(hotkey.key) ? hotkey.key : [hotkey.key])
        .map((key) => key in SWAP_KEY ? SWAP_KEY[key as keyof typeof SWAP_KEY] : key);
    const key = keys.join(' / ');

    return hotkey.ctrl ? `ctrl + ${key}` : key;
};

export default HOTKEYS;
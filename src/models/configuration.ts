const TEXT_LANG_LOCAL_STORAGE_KEY = 'text-lang';
const TRANS_LANG_LOCAL_STORAGE_KEY = 'trans-lang';

export const DEFAULT_TEXT_LANG = 'auto';
export const DEFAULT_TRANS_LANG = 'ru';

export enum EPanelView {
    GAMES_LIST = '@panel-view/games-list',
    TEXT = '@panel-view/text',
}

export interface Configuration {
    textLang: string
    transLang: string
}

const ConfigurationModel = {
    saveTextLang(lang: string) {
        localStorage.setItem(TEXT_LANG_LOCAL_STORAGE_KEY, lang);
    },
    saveTransLang(lang: string) {
        localStorage.setItem(TRANS_LANG_LOCAL_STORAGE_KEY, lang);
    },

    get(): Configuration {
        return {
            textLang: localStorage.getItem(TEXT_LANG_LOCAL_STORAGE_KEY) || DEFAULT_TEXT_LANG,
            transLang: localStorage.getItem(TRANS_LANG_LOCAL_STORAGE_KEY) || DEFAULT_TRANS_LANG,
        };
    },
};

export default ConfigurationModel;
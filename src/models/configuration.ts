import text from '../widgets/text';

const TEXT_LANG_LOCAL_STORAGE_KEY = 'text-lang';
const TRANS_LANG_LOCAL_STORAGE_KEY = 'trans-lang';
const TEXT_STORAGE_KEY = 'text';
const MAIN_PANEL_VIEW_KEY = 'main-panel-view';

export const DEFAULT_TEXT_LANG = 'auto';
export const DEFAULT_TRANS_LANG = 'ru';

export enum EPanelView {
    GAMES_LIST = '@panel-view/games-list',
    TEXT = '@panel-view/text',
    NOTES = '@panel-view/notes'
}

export const DEFAULT_PANEL_VIEW = EPanelView.GAMES_LIST;

export interface Configuration {
    textLang: string
    transLang: string
    panelView: EPanelView
}

const ConfigurationModel = {
    saveTextLang(lang: string) {
        localStorage.setItem(TEXT_LANG_LOCAL_STORAGE_KEY, lang);
    },
    saveTransLang(lang: string) {
        localStorage.setItem(TRANS_LANG_LOCAL_STORAGE_KEY, lang);
    },

    saveMainPanelView(panelView: EPanelView): void {
        localStorage.setItem(MAIN_PANEL_VIEW_KEY, panelView);
    },

    get(): Configuration {
        return {
            textLang: localStorage.getItem(TEXT_LANG_LOCAL_STORAGE_KEY) || DEFAULT_TEXT_LANG,
            transLang: localStorage.getItem(TRANS_LANG_LOCAL_STORAGE_KEY) || DEFAULT_TRANS_LANG,
            panelView: localStorage.getItem(MAIN_PANEL_VIEW_KEY) as EPanelView || DEFAULT_PANEL_VIEW,
        };
    },

    saveText(text: string): void {
        localStorage.setItem(TEXT_STORAGE_KEY, text);
    },

    getCachedText(): string {
        return localStorage.getItem(TEXT_STORAGE_KEY) || '';
    },
};

export default ConfigurationModel;
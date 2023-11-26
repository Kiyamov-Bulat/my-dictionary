import {Configuration, EPanelView} from './types';

export const TEXT_LANG_LOCAL_STORAGE_KEY = 'text-lang';
export const TRANS_LANG_LOCAL_STORAGE_KEY = 'trans-lang';
export const MAIN_PANEL_VIEW_KEY = 'main-panel-view';
export const INTERACTIVE_TEXT_FONT_SIZE_KEY = 'interactive-text-font-size-key';

export const DEFAULT_TEXT_LANG = 'auto';
export const DEFAULT_TRANS_LANG = 'ru';

export const INTERACTIVE_TEXT_FONT_SIZE = {
    DEFAULT: 24,
    MIN: 8,
    MAX: 48,
};

export const DEFAULT_PANEL_VIEW = EPanelView.GAMES_LIST;

export const INITIAL_CONFIGURATION: Configuration = {
    textLang: localStorage.getItem(TEXT_LANG_LOCAL_STORAGE_KEY) || DEFAULT_TEXT_LANG,
    transLang: localStorage.getItem(TRANS_LANG_LOCAL_STORAGE_KEY) || DEFAULT_TRANS_LANG,
    panelView: localStorage.getItem(MAIN_PANEL_VIEW_KEY) as EPanelView || DEFAULT_PANEL_VIEW,
    interactiveTextFontSize: Number(localStorage.getItem(INTERACTIVE_TEXT_FONT_SIZE_KEY)) || INTERACTIVE_TEXT_FONT_SIZE.DEFAULT,
} as const;

import store from '../store';
import {setInteractiveTextFontSize, setPanelView, setTextLang, setTransLang} from '../store/slices/configuration';
import {
    INTERACTIVE_TEXT_FONT_SIZE,
    INTERACTIVE_TEXT_FONT_SIZE_KEY,
    MAIN_PANEL_VIEW_KEY,
    TEXT_LANG_LOCAL_STORAGE_KEY,
    TRANS_LANG_LOCAL_STORAGE_KEY
} from './constants';
import {EPanelView} from './types';

const ConfigurationModel = {
    saveTextLang(lang: string) {
        store.dispatch(setTextLang(lang));
        localStorage.setItem(TEXT_LANG_LOCAL_STORAGE_KEY, lang);
    },
    saveTransLang(lang: string) {
        store.dispatch(setTransLang(lang));
        localStorage.setItem(TRANS_LANG_LOCAL_STORAGE_KEY, lang);
    },
    saveMainPanelView(panelView: EPanelView): void {
        store.dispatch(setPanelView(panelView));
        localStorage.setItem(MAIN_PANEL_VIEW_KEY, panelView);
    },
    saveInteractiveTextFontSize(fontSize: number | string): void {
        let fs = Number(fontSize);

        if (Number.isNaN(fs) || fs > INTERACTIVE_TEXT_FONT_SIZE.MAX || fs < INTERACTIVE_TEXT_FONT_SIZE.MIN) {
            fs = INTERACTIVE_TEXT_FONT_SIZE.DEFAULT;
        }
        store.dispatch(setInteractiveTextFontSize(fs));
        localStorage.setItem(INTERACTIVE_TEXT_FONT_SIZE_KEY, fs.toString());
    }
};
export default ConfigurationModel;
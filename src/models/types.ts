export interface RawResponse {
    sentences: (Sentence | SrcTranslit)[];
    src: string;
    confidence: number;
    ld_result: {
        srclangs: string[];
        srclangs_confidences: number[];
        extended_srclangs: string[];
    }
}

export interface Sentence {
    trans: string;
    orig: string;
}

export interface SrcTranslit {
    src_translit: string;
}

export interface BaseObject {
    id: string
    createdAt: number
    updatedAt: number
}

export interface TranslationUnit extends BaseObject {
    group: string
    text: string
    translation: string
    textLang: string
    transLang: string
    memoryPercent: number
    totalResets: number
    currMistakes: number
    totalMistakes: number
    imageSrc: string
}

export enum EPanelView {
    GAMES_LIST = '@panel-view/games-list',
    TEXT = '@panel-view/text',
    NOTES = '@panel-view/notes'
}

export interface Configuration {
    textLang: string;
    transLang: string;
    panelView: EPanelView;
    interactiveTextFontSize: number;
}
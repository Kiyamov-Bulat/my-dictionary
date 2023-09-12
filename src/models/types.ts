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

export interface TranslationUnit {
    id: string
    group: string
    text: string
    translation: string
    textLang: string
    transLang: string
    createdAt: number
    updatedAt: number
    memoryPercent: number
    totalResets: number
    currMistakes: number
    totalMistakes: number
    imageSrc: string
}
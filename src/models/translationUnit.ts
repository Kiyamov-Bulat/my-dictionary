import {v4 as uuidv4} from 'uuid';
import {RawResponse, Sentence, TranslationUnit} from './types';
import {MAIN_GROUP_TITLE} from './group';
import {DropdownOption} from '../components/dropdown/dropdownList';
import {ReactNode} from 'react';
import {DEFAULT_TEXT_LANG, DEFAULT_TRANS_LANG} from './configuration';

export const DEFAULT_GAME_STUDY_PERCENT = 25;

const getTranslationURL = (sourceText: string, sourceLang: string, targetLang: string): string => {
    return (`https://translate.googleapis.com/translate_a/single` +
        '?client=gtx' +
        '&dt=t' +  // return sentences
        '&dt=rm' + // add translit to sentences
        '&dj=1' +  // result as pretty json instead of deep nested arrays
        `&sl=${sourceLang}` +
        `&tl=${targetLang}` +
        `&q=${encodeURI(sourceText)}`);
};

const responseToTranslationUnit = ({ sentences }: RawResponse, sourceLang: string, targetLang: string): TranslationUnit => {
    const res = {} as TranslationUnit;
    const translations = sentences.filter((s): s is Sentence => 'trans' in s);

    res.id = uuidv4();
    res.textLang = sourceLang;
    res.transLang = targetLang;
    res.text = translations.map(s => s.orig).join('');
    res.translation = translations.map(s => s.trans).join('');
    res.createdAt = Date.now();
    res.group = MAIN_GROUP_TITLE;
    res.memoryPercent = 0;
    res.currMistakes = 0;
    res.totalMistakes = 0;
    res.totalResets = 0;

    return res;
};

const TranslationUnitModel = {
    async translate(text: string, textLang = DEFAULT_TEXT_LANG, transLang = DEFAULT_TRANS_LANG): Promise<TranslationUnit> {
        const res = await fetch(getTranslationURL(text, textLang, transLang));

        return responseToTranslationUnit((await res.json()) as RawResponse, textLang, transLang);
    },

    toDropdownOption(unit: TranslationUnit, value: ReactNode): DropdownOption {
        return {
            key: unit.id,
            value
        };
    },

    isMemorized(unit: TranslationUnit): boolean {
        return unit.memoryPercent === 100;
    },

    provideAnswer(answer: TranslationUnit, correct: boolean): TranslationUnit {
        return (correct ? this.provideCorrectAnswer : this.provideIncorrectAnswer).call(this, answer);
    },

    provideCorrectAnswer(unit: TranslationUnit, percent = DEFAULT_GAME_STUDY_PERCENT): TranslationUnit {
        const res = { ...unit };

        res.memoryPercent = Math.min(unit.memoryPercent + percent, 100);
        res.totalResets += Number(this.isMemorized(res));
        return res;
    },

    provideIncorrectAnswer(unit: TranslationUnit) {
        const res = { ...unit };

        res.currMistakes += 1;
        res.totalMistakes += 1;
        return res;
    },
    isTranslationUnit(obj: any): obj is TranslationUnit {
        return typeof obj.text === 'string' && typeof obj.translation === 'string' && typeof obj.transLang === 'string' && typeof obj.textLang === 'string';
    }

};

export default TranslationUnitModel;
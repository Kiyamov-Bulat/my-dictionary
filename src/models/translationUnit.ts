import {v4 as uuidv4} from 'uuid';
import {RawResponse, Sentence, TranslationUnit} from './types';
import {MAIN_GROUP_TITLE} from './group';
import {DropdownOption} from '../components/dropdown/dropdownList';
import {ReactNode} from 'react';
import {DEFAULT_TEXT_LANG, DEFAULT_TRANS_LANG} from './configuration';
import preloadImages from '../utils/preloadImages';
import getRemoteImage from '../utils/getRemoteImage';

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

const responseToTranslationUnit = (
    { sentences }: RawResponse,
    sourceLang: string,
    targetLang: string
): Promise<TranslationUnit> => {
    const translations = sentences.filter((s): s is Sentence => 'trans' in s);

    return TranslationUnitModel.updateImageSrc({
        ...TranslationUnitModel.empty(),
        textLang: sourceLang,
        transLang: targetLang,
        text: translations.map(s => s.orig).join(''),
        translation: translations.map(s => s.trans).join(''),
    });
};

const TranslationUnitModel = {
    empty(): TranslationUnit {
        return {
            id: uuidv4(),
            textLang: DEFAULT_TEXT_LANG,
            transLang: DEFAULT_TRANS_LANG,
            text: '',
            translation: '',
            createdAt: Date.now(),
            group: MAIN_GROUP_TITLE,
            memoryPercent: 0,
            currMistakes: 0,
            totalMistakes: 0,
            totalResets: 0,
            imageSrc: '',
        };
    },

    async translate(text: string, textLang = DEFAULT_TEXT_LANG, transLang = DEFAULT_TRANS_LANG): Promise<TranslationUnit> {
        const res = await fetch(getTranslationURL(text, textLang, transLang));
        //@TODO try/catch
        const unit = await responseToTranslationUnit((await res.json()) as RawResponse, textLang, transLang);

        // this.preloadImage(unit);
        return unit;
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

    provideIncorrectAnswer(unit: TranslationUnit): TranslationUnit {
        const res = { ...unit };

        res.currMistakes += 1;
        res.totalMistakes += 1;
        return res;
    },
    isTranslationUnit(obj: any): obj is TranslationUnit {
        return typeof obj.text === 'string' && typeof obj.translation === 'string' && typeof obj.transLang === 'string' && typeof obj.textLang === 'string';
    },
    
    async updateImageSrc(unit: TranslationUnit): Promise<TranslationUnit> {
        return { ...unit, imageSrc: await getRemoteImage(unit.text) };
    },

    preloadImage(unit: TranslationUnit): void {
        try {
            preloadImages(unit.imageSrc);
        } catch (e) {
            console.error('Не удалось загрузить картинки');
        }
    },

    vocalize(unit: TranslationUnit): void {
        const msg = new SpeechSynthesisUtterance();
        // const voices = window.speechSynthesis.getVoices();

        // msg.voice = voices[0];
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        msg.pitch = 1; // From 0 to 2
        msg.text = unit.translation;
        msg.lang = unit.transLang;
        window.speechSynthesis.speak(msg);
    }
};

export default TranslationUnitModel;
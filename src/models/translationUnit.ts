import {v4 as uuidv4} from 'uuid';
import {RawResponse, Sentence, TranslationUnit} from './types';
import {MAIN_GROUP_TITLE} from './group';
import {DropdownOption} from '../components/dropdown/dropdownList';
import {ReactNode} from 'react';
import {DEFAULT_TEXT_LANG, DEFAULT_TRANS_LANG} from './configuration';
import preloadImages from '../utils/preloadImages';
import getRemoteImage from '../utils/getRemoteImage';
import store from '../store';
import {selectTextLang, selectTransLang} from '../store/selectors/configuration';
import normalizeObject from '../utils/normalize';

const LINES_SEPARATOR = /\n+/;

export const DEFAULT_GAME_STUDY_PERCENT = 25;

const DETECT_LANGUAGE_URL = 'https://translation.googleapis.com/language/translate/v2/detect';
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
    response: RawResponse,
    sourceLang: string,
    targetLang: string
): Promise<TranslationUnit> => {
    const translations = response.sentences.filter((s): s is Sentence => 'trans' in s);

    return TranslationUnitModel.updateImageSrc({
        ...TranslationUnitModel.create(),
        textLang: response.src || sourceLang,
        transLang: targetLang,
        text: translations.map(s => s.orig).join(''),
        translation: translations.map(s => s.trans).join(''),
    });
};

const TranslationUnitModel = {
    create(): TranslationUnit {
        const now = Date.now();

        return {
            id: uuidv4(),
            textLang: DEFAULT_TEXT_LANG,
            transLang: DEFAULT_TRANS_LANG,
            text: '',
            translation: '',
            createdAt: now,
            updatedAt: now,
            group: MAIN_GROUP_TITLE,
            memoryPercent: 0,
            currMistakes: 0,
            totalMistakes: 0,
            totalResets: 0,
            imageSrc: '',
        };
    },

    normalize(tu: Partial<TranslationUnit>): TranslationUnit {
        return normalizeObject(this, tu);
    },

    async translate(
        text: string,
        textLang = selectTextLang(store.getState()),
        transLang = selectTransLang(store.getState())
    ): Promise<TranslationUnit> {
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
        const u = { ...unit };

        try {
            if (unit.text.length < 100) {
                u.imageSrc = await getRemoteImage(unit.text);
            }
        } catch (err) {
            console.error('updateImage error');
        }

        return u;
    },

    preloadImage(unit: TranslationUnit): void {
        try {
            preloadImages(unit.imageSrc);
        } catch (e) {
            console.error('Не удалось загрузить картинки');
        }
    },

    vocalize(unit: TranslationUnit): () => void {
        const msg = new SpeechSynthesisUtterance();
        // const voices = window.speechSynthesis.getVoices();

        // msg.voice = voices[0];
        msg.volume = 1; // From 0 to 1
        msg.rate = 0.8; // From 0.1 to 10
        msg.pitch = 1; // From 0 to 2
        msg.text = unit.translation;
        msg.lang = unit.transLang;
        window.speechSynthesis.speak(msg);
        return () => window.speechSynthesis.cancel();
    },

    async listFromRawString(rawUnits: string): Promise<TranslationUnit[]> {
        const lines = rawUnits.split(LINES_SEPARATOR);
        const wordPairs = lines.map((line) => line.split(/[\s-|,:_]+/));
        const state = store.getState();
        const textLang = selectTextLang(state);
        const transLang = selectTransLang(state);

        if (wordPairs[0].length === 1 && wordPairs.at(-1)?.length === 1) {
            const bigUnit = await TranslationUnitModel.translate(rawUnits, textLang, transLang);
            const translations = bigUnit.translation.split(LINES_SEPARATOR);

            return lines.map((text, idx) =>
                ({ ...bigUnit, id: uuidv4(), text: text.trim(), translation: translations[idx].trim(), imageSrc: '' }));
        }

        return wordPairs.map(([text, translation]) =>
            TranslationUnitModel.normalize(
                { text: text || '', translation: translation || '', textLang, transLang }
            ));
    },
    swapTextAndTranslation(unit: TranslationUnit) {
        const res = { ...unit };
        
        [res.text, res.translation, res.textLang, res.transLang] =
            [res.translation, res.text, res.transLang, res.textLang];
        return res;
    },
    
    isEqual(tu1: TranslationUnit, tu2: TranslationUnit, strict = true) {
        const res = (tu1.text === tu2.text && tu1.textLang === tu2.textLang &&
            tu1.transLang === tu2.transLang);

        return res || (!strict && tu1.text === tu2.translation && tu1.transLang === tu2.textLang && tu1.textLang === tu2.transLang);
    }
};

export default TranslationUnitModel;
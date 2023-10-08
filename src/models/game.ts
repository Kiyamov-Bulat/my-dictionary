import {ListIcon, PuzzleIcon, ReverseListIcon, WaterFallIcon} from '../icons';
import store from '../store';
import {addAnswer, startGame} from '../store/slices/game';
import {selectSelectedGroupsUnits, selectSelectedGroupsUnlearnedUnits} from '../store/selectors/dictionary';
import {TranslationUnit} from './types';
import {selectCurrentUnit, selectGameListSize} from '../store/selectors/game';
import TranslationUnitModel from './translationUnit';
import {updateTranslationUnit} from '../store/slices/dictionary';
import correctAnswerSound from '../assets/audio/piu.mp3';
import incorrectAnswerSound from '../assets/audio/bep2.mp3';
import {random, sampleSize} from 'lodash';

export enum EGameType {
    TRANSLATION_FROM_LIST = '@game-type/translation-from-list',
    TEXT_FROM_LIST = '@game-type/text-from-list',
    WORDFALL = '@game-type/wordfall',
    BUILD_WORD = '@game-type/build-word',
}

export enum EGameState {
    SELECT = '@game-state/select',
    START = '@game-state/start',
    MIDDLE = '@game-state/middle',
    END = '@game-state/end'
}

export type Answer = { unit: TranslationUnit, isCorrect: boolean };
export type GameUnit = { value: TranslationUnit, options: TranslationUnit[], answer?: Answer }

export const GAME_PROPS = {
    [EGameType.TRANSLATION_FROM_LIST]: {
        Icon: ListIcon,
        title: 'Слово - перевод'
    },
    [EGameType.TEXT_FROM_LIST]: {
        Icon: ReverseListIcon,
        title: 'Перевод - слово'
    },
    [EGameType.WORDFALL]: {
        Icon: WaterFallIcon,
        title: 'Словопад',
    },
    [EGameType.BUILD_WORD]: {
        Icon: PuzzleIcon,
        title: 'Построй слово',
        disabled: true,
    }
};

export const GAME_TYPES = Object.values(EGameType);

const GameModel = {
    startGame(type: EGameType): void {
        const state = store.getState();
        const units = selectSelectedGroupsUnits(state);
        const unlearnedUnits = selectSelectedGroupsUnlearnedUnits(state);
        const listSizeM1 = selectGameListSize(state) - 1;
        const gameUnits = unlearnedUnits.map((value) => {
            const unitsWOValue = units.filter((u) => u.id !== value.id);
            const options = sampleSize(unitsWOValue , listSizeM1);

            options.splice(random(0, listSizeM1), 0, value);

            return { value, options };
        });

        store.dispatch(startGame({ type, units: gameUnits }));
    },

    hasUnlearnedUnits() {
        //@TODO
        return selectSelectedGroupsUnlearnedUnits(store.getState()).length > 0;
    },

    isCorrectAnswer(answer: TranslationUnit): boolean {
        const state = store.getState();
        const currUnit = selectCurrentUnit(state);
        // const gameType = selectGameType(state);

        return answer.id === currUnit?.id;
    },
    
    provideAnswer(answer: TranslationUnit): void {
        const currUnit = selectCurrentUnit(store.getState());

        if (!currUnit) {
            return;
        }

        const isCorrect = this.isCorrectAnswer(answer);
        const updatedUnit = TranslationUnitModel.provideAnswer(currUnit, isCorrect);

        store.dispatch(updateTranslationUnit(updatedUnit));
        store.dispatch(addAnswer({ unit: answer, isCorrect }));
    },

    provideEmptyAnswer(): void {
        this.provideAnswer(TranslationUnitModel.create());
    },

    playAnswerSound(answer: TranslationUnit): void {
        const src = this.isCorrectAnswer(answer) ? correctAnswerSound : incorrectAnswerSound;
        const audio = new Audio(src);

        // @TODO ?
        void audio.play();
    }
};

export default GameModel;
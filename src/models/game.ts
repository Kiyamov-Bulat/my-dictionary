import {ListIcon, PuzzleIcon, ReverseListIcon, WaterFallIcon} from '../icons';
import store from '../store';
import {addAnswer, startGame} from '../store/slices/game';
import {selectSelectedGroupsUnlearnedUnits} from '../store/selectors/dictionary';
import {TranslationUnit} from './types';
import {selectCurrentUnit} from '../store/selectors/game';
import TranslationUnitModel from './translationUnit';
import {updateTranslationUnit} from '../store/slices/dictionary';

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
        disabled: true,
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
        const units = selectSelectedGroupsUnlearnedUnits(store.getState());

        store.dispatch(startGame({ type, units }));
    },

    hasUnlearnedUnits() {
        //@TODO
        return selectSelectedGroupsUnlearnedUnits(store.getState()).length > 1;
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

        const isCorrect = this.isCorrectAnswer(answer) as boolean;
        const updatedUnit = TranslationUnitModel.provideAnswer(currUnit, isCorrect);

        store.dispatch(updateTranslationUnit(updatedUnit));
        store.dispatch(addAnswer({ unit: answer, isCorrect }));
    },
};

export default GameModel;
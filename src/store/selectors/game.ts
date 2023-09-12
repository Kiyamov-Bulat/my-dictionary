import {RootState} from '../index';
import {Answer, EGameState, EGameType, GameUnit} from '../../models/game';
import {TranslationUnit} from '../../models/types';

export const selectGame = (state: RootState) => state.game;

export const selectGameType = (state: RootState): EGameType => selectGame(state).type;

export const selectGameListSize = (state: RootState): number => selectGame(state).listSize;

export const selectGameDuration = (state: RootState): number => selectGame(state).duration;

export const selectGameState = (state: RootState): EGameState => selectGame(state).state;

export const selectGameUnits = (state: RootState): GameUnit[] => selectGame(state).units;

export const selectCurrentUnitIndex = (state: RootState): number => selectGame(state).currentUnitIndex;

export const selectCurrentGameUnit = (state: RootState): GameUnit | undefined =>
    selectGameUnits(state)[selectCurrentUnitIndex(state)];

export const selectCurrentUnitOptions = (state: RootState): TranslationUnit[] =>
    selectCurrentGameUnit(state)?.options || [];

export const selectCurrentUnit = (state: RootState): TranslationUnit | undefined =>
    selectCurrentGameUnit(state)?.value;


export const selectUnitsNumber = (state: RootState): number => selectGame(state).unitsNumber || 1;

export const selectCurrentUnitNumber = (state: RootState): number => selectCurrentUnitIndex(state) + 1;

export const selectIsLastUnit = (state: RootState): boolean => {
    const unitsNumber = selectUnitsNumber(state);
    const currentUnitNumber = selectCurrentUnitNumber(state);

    return currentUnitNumber >= unitsNumber;
};

export const selectIsFirstUnit = (state: RootState): boolean => selectCurrentUnitIndex(state) === 0;

export const selectIsNotLastUnit = (state: RootState): boolean => !selectIsLastUnit(state);

export const selectAnswer = (state: RootState): Answer | undefined => selectCurrentGameUnit(state)?.answer;

export const selectHasAnswer = (state: RootState): boolean => !!selectAnswer(state);

export const selectCorrectAnswersNumber = (state: RootState): number =>
    selectGameUnits(state)
        .reduce((acc, unit) => acc + Number(!!unit.answer?.isCorrect), 0);

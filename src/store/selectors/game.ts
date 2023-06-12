import {RootState} from '../index';
import {Answer, EGameState, EGameType} from '../../models/game';
import {TranslationUnit} from '../../models/types';

export const selectGame = (state: RootState) => state.game;

export const selectGameType = (state: RootState): EGameType => selectGame(state).type;

export const selectGameListSize = (state: RootState): number => selectGame(state).listSize;

export const selectGameDuration = (state: RootState): number => selectGame(state).duration;

export const selectGameState = (state: RootState): EGameState => selectGame(state).state;

export const selectGameUnits = (state: RootState): TranslationUnit[] => selectGame(state).units;

export const selectCurrentUnitIndex = (state: RootState): number => selectGame(state).currentUnitIndex;

export const selectNextUnitList = (state: RootState): TranslationUnit[] => {
    const units = selectGameUnits(state);
    const listSize = selectGameListSize(state);
    const index = selectCurrentUnitIndex(state);

    return units.slice(index, index + listSize);
};


export const selectCurrentUnit = (state: RootState): TranslationUnit | undefined => {
    const units = selectGameUnits(state);
    
    return units[selectCurrentUnitIndex(state)];
};

export const selectListSize = (state: RootState): number => selectGame(state).listSize;

export const selectUnitsNumber = (state: RootState): number => selectGame(state).unitsNumber;

export const selectCurrentUnitNumber = (state: RootState): number => {
    const index = selectCurrentUnitIndex(state);
    const listSize = selectListSize(state);
    
    return index / listSize + 1;
};

export const selectIsLastUnit = (state: RootState): boolean => {
    const unitsNumber = selectUnitsNumber(state);
    const currentUnitNumber = selectCurrentUnitNumber(state);

    return currentUnitNumber >= unitsNumber;
};

export const selectIsFirstUnit = (state: RootState): boolean => selectCurrentUnitIndex(state) === 0;

export const selectIsNotLastUnit = (state: RootState): boolean => !selectIsLastUnit(state);

export const selectAnswers = (state: RootState): Answer[] => selectGame(state).answers;

export const selectAnswer = (state: RootState): Answer | undefined => {
    const answers = selectAnswers(state);

    return answers[selectCurrentUnitNumber(state) - 1];
};

export const selectAnswersNumber = (state: RootState): number => selectAnswers(state).length;

export const selectCorrectAnswersNumber = (state: RootState): number => {
    const answers = selectAnswers(state);

    return answers.reduce((acc, answer) => acc + Number(answer.isCorrect), 0);
};
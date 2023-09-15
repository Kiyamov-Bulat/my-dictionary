import {RootState} from '../index';
import {Answer, EGameState, EGameType, GameUnit} from '../../models/game';
import {TranslationUnit} from '../../models/types';
import {createSelector} from '@reduxjs/toolkit';

export const selectGame = (state: RootState) => state.game;

export const selectGameType = (state: RootState): EGameType => selectGame(state).type;

export const selectGameListSize = (state: RootState): number => selectGame(state).listSize;

export const selectGameDuration = (state: RootState): number => selectGame(state).duration;

export const selectGameState = (state: RootState): EGameState => selectGame(state).state;

export const selectGameIsStarted = (state: RootState): boolean => selectGameState(state) === EGameState.START;

export const selectGameUnits = (state: RootState): GameUnit[] => selectGame(state).units;

export const selectCurrentUnitIndex = (state: RootState): number => selectGame(state).currentUnitIndex;

export const selectCurrentGameUnit = createSelector(selectGameUnits, selectCurrentUnitIndex,
    (units, index): GameUnit | undefined => units[index]);

export const selectCurrentUnitOptions = (state: RootState): TranslationUnit[] =>
    selectCurrentGameUnit(state)?.options || [];

export const selectCurrentUnit = (state: RootState): TranslationUnit | undefined =>
    selectCurrentGameUnit(state)?.value;

export const selectUnitsNumber = (state: RootState): number => selectGame(state).unitsNumber || 1;

export const selectCurrentUnitNumber = (state: RootState): number => selectCurrentUnitIndex(state) + 1;

export const selectIsLastUnit = createSelector(selectUnitsNumber, selectCurrentUnitNumber,
    (unitsNumber, currentNumber) => currentNumber >= unitsNumber);

export const selectIsFirstUnit = (state: RootState): boolean => selectCurrentUnitIndex(state) === 0;

export const selectIsNotLastUnit = (state: RootState): boolean => !selectIsLastUnit(state);

export const selectAnswer = (state: RootState): Answer | undefined => selectCurrentGameUnit(state)?.answer;

export const selectHasAnswer = (state: RootState): boolean => !!selectAnswer(state);

export const selectCorrectAnswersNumber = createSelector(selectGameUnits, (units) =>
    units.reduce((acc, unit) => acc + Number(!!unit.answer?.isCorrect), 0));

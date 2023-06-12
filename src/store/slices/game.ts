import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Answer, EGameState, EGameType} from '../../models/game';
import {TranslationUnit} from '../../models/types';
import {shuffle} from 'lodash';

const gameState = {
    state: EGameState.SELECT,
    type: EGameType.TRANSLATION_FROM_LIST,
    listSize: 4,
    duration: 0,
    unitsNumber: 10,
    units: [] as TranslationUnit[],
    currentUnitIndex: 0,
    answers: [] as Answer[],
};

const game = createSlice({
    name: 'game',
    initialState: gameState,
    reducers: {
        startGame(state, { payload }: PayloadAction<{ type: EGameType, units: TranslationUnit[] }>) {
            state.type = payload.type;
            state.units = shuffle(payload.units);
            state.state = EGameState.START;
            state.currentUnitIndex = 0;
            state.answers = [];
            state.unitsNumber = Math.min(state.unitsNumber, Math.floor(state.units.length / state.listSize));
        },
        toMiddleOfGame(state) {
            state.state = EGameState.MIDDLE;
        },
        endGame(state) {
            state.state = EGameState.END;
        },
        toGameList(state) {
            state.state = EGameState.SELECT;
        },
        setDuration(state, { payload }: PayloadAction<number>) {
            state.duration = payload;
        },
        setListSize(state, { payload }: PayloadAction<number>) {
            state.listSize = payload;
        },
        setUnitsNumber(state, { payload }: PayloadAction<number>) {
            state.unitsNumber = payload;
        },
        setUnits(state, { payload }: PayloadAction<TranslationUnit[]>) {
            state.units = shuffle(payload);
        },
        addAnswer(state, { payload }: PayloadAction<Answer>) {
            state.answers[state.currentUnitIndex / state.listSize] = payload;

        },
        prevUnit(state) {
            state.currentUnitIndex -= state.listSize;
        },
        nextUnit(state) {
            state.currentUnitIndex += state.listSize;
        },
    },
});

export const {
    startGame,
    setDuration,
    setListSize,
    setUnitsNumber,
    prevUnit,
    nextUnit,
    addAnswer,
    setUnits,
    toMiddleOfGame,
    endGame,
    toGameList,
} = game.actions;

export default game.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Answer, EGameState, EGameType, GameUnit} from '../../models/game';
import {shuffle} from 'lodash';

const gameState = {
    state: EGameState.SELECT,
    type: EGameType.TRANSLATION_FROM_LIST,
    listSize: 4,
    duration: 0,
    unitsNumber: 10,
    units: [] as GameUnit[],
    currentUnitIndex: 0,
};

const game = createSlice({
    name: 'game',
    initialState: gameState,
    reducers: {
        startGame(state, { payload }: PayloadAction<{ type: EGameType, units: GameUnit[] }>) {
            state.type = payload.type;
            state.units = shuffle(payload.units);
            state.state = EGameState.START;
            state.currentUnitIndex = 0;
            state.unitsNumber = state.units.length;
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
        setUnits(state, { payload }: PayloadAction<GameUnit[]>) {
            state.units = shuffle(payload);
        },
        addAnswer(state, { payload }: PayloadAction<Answer>) {
            state.units[state.currentUnitIndex].answer = payload;
        },
        prevUnit(state) {
            state.currentUnitIndex--;
        },
        nextUnit(state) {
            state.currentUnitIndex++;
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

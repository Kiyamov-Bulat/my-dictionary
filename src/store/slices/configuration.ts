import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INITIAL_CONFIGURATION} from '../../models/constants';
import {EPanelView} from '../../models/types';

const configurationState = {
    ...INITIAL_CONFIGURATION,
    isOpen: false,
};

const configuration = createSlice({
    name: 'configuration',
    initialState: configurationState,
    reducers: {
        setTextLang(state, { payload }: PayloadAction<string>) {
          state.textLang = payload;
        },
        setTransLang(state, { payload }: PayloadAction<string>) {
            state.transLang = payload;
        },
        setInteractiveTextFontSize(state, { payload }: PayloadAction<number>) {
            state.interactiveTextFontSize = payload;
        },
        openSettings(state) {
            state.isOpen = true;
        },
        closeSetting(state) {
            state.isOpen = false;
        },
        setPanelView(state, { payload }: PayloadAction<EPanelView>) {
            state.panelView = payload;
        },
        togglePanelView(state) {
            state.panelView = state.panelView === EPanelView.GAMES_LIST ? EPanelView.TEXT : EPanelView.GAMES_LIST;
        },
    },
});

export const {
    setTextLang,
    setTransLang,
    openSettings,
    closeSetting,
    setPanelView,
    togglePanelView,
    setInteractiveTextFontSize,
} = configuration.actions;

export default configuration.reducer;
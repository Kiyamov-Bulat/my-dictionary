import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ConfigurationModel, {EPanelView} from '../../models/configuration';

const configurationState = {
    ...ConfigurationModel.get(),
    isOpen: false,
    panelView: EPanelView.TEXT,
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
} = configuration.actions;

export default configuration.reducer;
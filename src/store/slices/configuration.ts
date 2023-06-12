import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ConfigurationModel from '../../models/configuration';

const configurationState = {
    ...ConfigurationModel.get(),
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
        openSettings(state) {
            state.isOpen = true;
        },
        closeSetting(state) {
            state.isOpen = false;
        }
    },
});

export const {
    setTextLang,
    setTransLang,
    openSettings,
    closeSetting,
} = configuration.actions;

export default configuration.reducer;
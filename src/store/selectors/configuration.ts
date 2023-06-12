import {RootState} from '../index';

export const selectConfiguration = (state: RootState) => state.configuration;

export const selectTextLang = (state: RootState): string => selectConfiguration(state).textLang;

export const selectTransLang = (state: RootState): string => selectConfiguration(state).transLang;

export const selectSettingsIsOpen = (state: RootState): boolean => selectConfiguration(state).isOpen;

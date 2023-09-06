import {RootState} from '../index';
import {EPanelView} from '../../models/configuration';

export const selectConfiguration = (state: RootState) => state.configuration;

export const selectTextLang = (state: RootState): string => selectConfiguration(state).textLang;

export const selectTransLang = (state: RootState): string => selectConfiguration(state).transLang;

export const selectSettingsIsOpen = (state: RootState): boolean => selectConfiguration(state).isOpen;

export const selectPanelView = (state: RootState): EPanelView => selectConfiguration(state).panelView;

export const selectPanelViewIsGamesList = (state: RootState): boolean => selectPanelView(state) === EPanelView.GAMES_LIST;

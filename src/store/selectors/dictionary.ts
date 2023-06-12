import {RootState} from '../index';
import {Dictionary} from '../../models/dictionary';
import {Group} from '../../models/group';
import {TranslationUnit} from '../../models/types';
import {getSelectedGroups} from '../slices/dictionary';
import TranslationUnitModel from '../../models/translationUnit';

export const selectDictionary = (state: RootState) => state.dictionary;

export const selectDictionaryValue = (state: RootState): Dictionary => selectDictionary(state).value;
export const selectGroups = (state: RootState): Group[] => selectDictionaryValue(state).groups;
export const selectSelectedGroupsIds = (state: RootState): string[] => selectDictionary(state).selectedGroups;

export const selectSelectedGroups = (state: RootState): Group[] =>
    getSelectedGroups(selectGroups(state), selectSelectedGroupsIds(state));

export const selectSelectedGroupsTitles = (state: RootState): string[] => selectSelectedGroups(state).map((g) => g.title);

export const selectSelectedGroupsTitlesAsString = (state: RootState): string =>
    selectSelectedGroupsTitles(state).reduce((acc, title) => acc ? `${acc}, ${title}`: title, '');

export const selectSelectedGroupsUnits = (state: RootState): TranslationUnit[] =>
    selectSelectedGroups(state)
        .reduce((acc, g) => [...acc, ...g.units], [] as TranslationUnit[]);

export const selectSelectedGroupsUnlearnedUnits =  (state: RootState): TranslationUnit[] =>
    selectSelectedGroupsUnits(state).filter((u) => !TranslationUnitModel.isMemorized(u));

export const getSelectIsGroupSelected = (id: string) => (state: RootState): boolean => selectSelectedGroupsIds(state).includes(id);
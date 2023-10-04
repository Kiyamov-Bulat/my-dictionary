import {RootState} from '../index';
import {Dictionary} from '../../models/dictionary';
import {Group} from '../../models/group';
import {TranslationUnit} from '../../models/types';
import TranslationUnitModel from '../../models/translationUnit';
import {createSelector} from '@reduxjs/toolkit';
import {selectTextLang, selectTransLang} from './configuration';
import {getSelectedGroups} from '../slices/dictionary';

export const selectDictionary = (state: RootState) => state.dictionary;

export const selectDictionaryValue = (state: RootState): Dictionary => selectDictionary(state).value;
export const selectGroups = (state: RootState): Group[] => selectDictionaryValue(state).groups;
export const selectSelectedGroups = createSelector(selectGroups, getSelectedGroups);

export const selectSelectedGroupsIds = createSelector(selectSelectedGroups,
    (groups) => groups.map((g) => g.id));

export const selectSelectedGroupsTitles =
    createSelector(selectSelectedGroups, (groups) => groups.map((g) => g.title));

export const selectSelectedGroupsTitlesAsString =
    createSelector(selectSelectedGroupsTitles,
        (titles) => titles.reduce((acc, title) => acc ? `${acc}, ${title}`: title, ''));

export const selectSelectedGroupsUnits =
    createSelector(selectSelectedGroups,
        (selectedGroups) => selectedGroups.reduce((acc, g) => [...acc, ...g.units], [] as TranslationUnit[]));

export const selectSelectedGroupsUnlearnedUnits =
    createSelector(selectSelectedGroupsUnits,
        (units) => units.filter((u) => !TranslationUnitModel.isMemorized(u)));

export const getSelectHasWord = (word: string) =>
    createSelector(selectSelectedGroupsUnits, selectTextLang, selectTransLang,
        (units, textLang, transLang) => {
            return units.some((u) => (
                (u.textLang === textLang && u.transLang === transLang && u.text === word) ||
                (u.textLang === transLang && u.transLang === textLang && u.translation === word)
            ));
        });
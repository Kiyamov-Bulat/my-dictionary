import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dictionary} from '../../models/dictionary';
import GroupModel, {Group} from '../../models/group';
import {TranslationUnit} from '../../models/types';
import TranslationUnitModel from '../../models/translationUnit';

const dictionaryState = {
    value: { groups: [GroupModel.getMainGroup([])] },
    openedUnitId: '',
};

export const getSelectedGroups = (groups: Group[]): Group[] => groups.filter((g) => g.selected);

const updateSelectedGroups = (state: typeof dictionaryState, cb: (group: Group) => void) => {
    state.value.groups.forEach((g) => g.selected && cb(g));
};

const updateGroup = (state: typeof dictionaryState, id: string, cb: (group: Group) => void) => {
    const group = state.value.groups.find((g) => g.id === id);

    group && cb(group);
};

const updateTransitionUnit = (
    groups: Group[],
    unit: TranslationUnit
): void => {
    const g = groups.find((g) => g.title === unit.group);

    if (!g) {
        return;
    }

    const index = g.units.findIndex((u) => u.id === unit.id);
    
    if (index !== -1) {
        g.units[index] = { ...g.units[index], ...unit };
    }
};

const dictionary = createSlice({
    name: 'dictionary',
    initialState: dictionaryState,
    reducers: {
        setDictionary(state, { payload }: PayloadAction<Dictionary>) {
            state.value = payload;
        },

        exportDictionary(state, { payload }: PayloadAction<TranslationUnit>) {
            //
        },
        addTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            getSelectedGroups(state.value.groups).forEach((group) => {
                group.units = [...group.units, { ...payload, group: group.title }];
            });
        },
        addGroup(state, { payload }: PayloadAction<Group>) {
            state.value.groups.push(payload);
        },
        removeTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            const group = state.value.groups.find((group) => group.title === payload.group);

            if (!group) {
                return;
            }
            group.units = group.units.filter((unit) => unit.id !== payload.id);
        },
        removeGroup(state, { payload }: PayloadAction<string>) {
            state.value.groups = state.value.groups.filter((group) => group.id !== payload);
        },
        updateTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            updateTransitionUnit(state.value.groups, payload);
        },
        resetTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            updateTransitionUnit(state.value.groups, {
                ...payload,
                totalResets: payload.totalResets + 1,
                memoryPercent: 0,
                currMistakes: 0,
            });
        },
        toggleOpen(state, { payload }: PayloadAction<string>) {
            updateGroup(state, payload, (g) => g.open = !g.open);

        },
        toggleSelected(state, { payload }: PayloadAction<string>) {
            updateGroup(state, payload, (g) => g.selected = !g.selected);
        },
        swapTextAndTranslation(state, { payload }: PayloadAction<TranslationUnit>) {
            updateTransitionUnit(state.value.groups,
                TranslationUnitModel.swapTextAndTranslation(payload));
        },
        swapSelectedGroupsTextAndTranslation(state) {
            updateSelectedGroups(state, (group) => group.units = group.units.map(TranslationUnitModel.swapTextAndTranslation));
        },
        addUnits(state, { payload }: PayloadAction<TranslationUnit[]>) {
            updateSelectedGroups(state, group => group.units = [...group.units, ...payload ]);
        },
        openTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            state.openedUnitId = payload.id;
        },
        closeTranslationUnit(state) {
            state.openedUnitId = '';
        },
    },
});

export const {
    setDictionary,
    addTranslationUnit,
    addGroup,
    removeTranslationUnit,
    resetTranslationUnit,
    removeGroup,
    updateTranslationUnit,
    toggleOpen,
    toggleSelected,
    swapTextAndTranslation,
    swapSelectedGroupsTextAndTranslation,
    addUnits,
    openTranslationUnit,
    closeTranslationUnit,
} = dictionary.actions;
export default dictionary.reducer;
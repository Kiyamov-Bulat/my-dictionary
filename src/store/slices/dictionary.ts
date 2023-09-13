import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import DictionaryModel, {Dictionary} from '../../models/dictionary';
import GroupModel, {Group} from '../../models/group';
import {TranslationUnit} from '../../models/types';

const dict = DictionaryModel.get();
const selectedGroups = DictionaryModel.getSelectedGroups();

const dictionaryState = {
    value: dict,
    selectedGroups: selectedGroups.length ? selectedGroups : [GroupModel.getMainGroup(dict.groups).id],
};

export const getSelectedGroups = (groups: Group[], selectedIds: string[]): Group[] =>
    selectedIds.length === 0
        ? [GroupModel.getMainGroup(groups)]
        : selectedIds.map((id) => groups.find((group) => group.id === id) as Group);

const updateGroups = (state: typeof dictionaryState, cb: (group: Group) => Group) => {
    const updatedGroups = getSelectedGroups(state.value.groups, state.selectedGroups).map(cb);

    state.value.groups = state.value.groups.map((g) => updatedGroups.find((next) => next.id === g.id) ?? g);
};

const swapLangs = (unit: TranslationUnit): TranslationUnit =>
    ({
        ...unit,
        text: unit.translation,
        translation: unit.text,
        textLang: unit.transLang,
        transLang: unit.textLang,
    });

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
            getSelectedGroups(state.value.groups, state.selectedGroups).forEach((group) => {
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
            state.selectedGroups = state.selectedGroups.filter((groupId) => groupId !== payload);
        },
        updateTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            const group = state.value.groups.find((group) => group.title === payload.group);

            if (!group) {
                return;
            }

            const index = group.units.findIndex((u) => u.id === payload.id);

            if (index !== -1) {
                group.units[index] = payload;
            }
        },
        resetTranslationUnit(state, { payload }: PayloadAction<TranslationUnit>) {
            const group = state.value.groups.find((group) => group.title === payload.group);

            if (!group) {
                return;
            }

            const unit = group.units.find((u) => u.id === payload.id);

            if (!unit) {
                return;
            }

            unit.totalResets += 1;
            unit.memoryPercent = 0;
            unit.currMistakes = 0;
        },
        toggleSelectedGroup(state, { payload }: PayloadAction<string>) {
            const index = state.selectedGroups.indexOf(payload);

            if (index === -1) {
                state.selectedGroups.push(payload);
            } else {
                state.selectedGroups.splice(index, 1);
            }
        },
        swapTextAndTranslation(state, { payload }: PayloadAction<TranslationUnit>) {
            const g = state.value.groups.find((g) => g.title === payload.group);
            const unit = g?.units.find((u) => u.id === payload.id);

            if (!unit) {
                return;
            }
            [unit.text, unit.translation, unit.textLang, unit.transLang] =
                [unit.translation, unit.text, unit.transLang, unit.textLang];
            return;
        },
        swapSelectedGroupsTextAndTranslation(state) {
            updateGroups(state, (group) => {
                return { ...group, units: group.units.map(swapLangs) };
            });
        },
        addUnits(state, { payload }: PayloadAction<TranslationUnit[]>) {
            updateGroups(state, (group) => {
                return { ...group, units: [...group.units, ...payload ]};
            });
        }
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
    toggleSelectedGroup,
    swapTextAndTranslation,
    swapSelectedGroupsTextAndTranslation,
    addUnits,
} = dictionary.actions;
export default dictionary.reducer;
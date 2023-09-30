import GroupModel, {Group} from './group';
import store from '../store';
import {selectDictionaryValue, selectSelectedGroupsIds} from '../store/selectors/dictionary';
import downloadObjectAsJson from '../utils/downloadObjectAsJson';
import TranslationUnitModel from './translationUnit';

const LOCAL_STORAGE_KEY = 'dictionary';
const SELECTED_GROUPS_LOCAL_STORAGE_KEY = 'dictionary-selected-groups';

export interface Dictionary {
    groups: Group[]
}

const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    const item = localStorage.getItem(key);

    try {
        return item ? JSON.parse(item) : defaultValue;
    } catch (_) {
        return defaultValue;
    }
};

const DictionaryModel = {
    save(dictionary?: Dictionary): void {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dictionary || selectDictionaryValue(store.getState())));
    },
    
    get(): Dictionary {
        const rawDict = localStorage.getItem(LOCAL_STORAGE_KEY);

        return (rawDict && this.parse(rawDict)) || { groups: [ GroupModel.createMainGroup() ] };
    },
    saveSelectedGroups(selectedGroups?: string[]): void {
        localStorage.setItem(SELECTED_GROUPS_LOCAL_STORAGE_KEY, JSON.stringify(selectedGroups || selectSelectedGroupsIds(store.getState())));
    },

    getSelectedGroups(): string[] {
        return getFromLocalStorage(SELECTED_GROUPS_LOCAL_STORAGE_KEY, []);
    },

    getFileName(): string {
        return `dictionary_${performance.now()}`;
    },

    download(): void {
        downloadObjectAsJson(selectDictionaryValue(store.getState()), this.getFileName());
    },
    
    preloadImages(dictionary: Dictionary): void {
        dictionary.groups.forEach((g) =>
            g.units.forEach((u) => TranslationUnitModel.preloadImage(u))
        );
    },
    parse(rawDict: string): Dictionary | null {
        try {
            const partialDict = JSON.parse(rawDict) as Partial<Dictionary>;

            if (partialDict.groups) {
                return {
                    ...partialDict,
                    groups: partialDict.groups.map((g) => GroupModel.normalize(g))
                };
            } else if (Array.isArray(partialDict)) {
                return { groups: partialDict.map((g) => GroupModel.normalize(g))};
            } else if (GroupModel.isMain(partialDict as Group)) { // @TODO надежнее проверка
                return { groups: [GroupModel.normalize(partialDict as Group)]};
            }
        } catch (e) { /* pass */ }
        return null;
    }
};

export default DictionaryModel;
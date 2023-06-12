import GroupModel, {Group} from './group';
import store from '../store';
import {selectDictionaryValue, selectSelectedGroupsIds} from '../store/selectors/dictionary';
import downloadObjectAsJson from '../utils/downloadObjectAsJson';

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
        const defaultDictionary = { groups: [ GroupModel.createMainGroup() ] };

        return getFromLocalStorage(LOCAL_STORAGE_KEY, defaultDictionary);
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
    }
};

export default DictionaryModel;
import GroupModel, {Group} from './group';
import store from '../store';
import {selectDictionaryValue } from '../store/selectors/dictionary';
import downloadObjectAsJson from '../utils/downloadObjectAsJson';
import TranslationUnitModel from './translationUnit';
import { set as idbSet, get as idbGet } from 'idb-keyval';

const LOCAL_STORAGE_KEY = 'dictionary';

export interface Dictionary {
    groups: Group[],
}


const DictionaryModel = {
    save(dictionary?: Dictionary): Promise<void> {
        return idbSet(LOCAL_STORAGE_KEY, JSON.stringify(dictionary || selectDictionaryValue(store.getState())));
    },
    
    async get(): Promise<Dictionary> {
        let rawDict;

        try {
            rawDict = await idbGet(LOCAL_STORAGE_KEY);
        } catch (_) {/* pass */}

        return (rawDict && this.parse(rawDict)) || { groups: [ GroupModel.createMainGroup() ] };
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
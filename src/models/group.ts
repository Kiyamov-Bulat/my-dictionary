import {v4 as uuidv4} from 'uuid';
import {BaseObject, TranslationUnit} from './types';
import {sample} from 'lodash';
import TranslationUnitModel from './translationUnit';
import normalizeObject from '../utils/normalize';
import {COLOR_LIST} from '../utils/getRandomColor';

export const MAIN_GROUP_TITLE = 'Main';

export interface Group extends BaseObject {
    title: string
    units: TranslationUnit[]
    color: string
    selected: boolean
    open: boolean
}

const GROUP_COLORS = COLOR_LIST;


const GroupModel = {
    create(title = ''): Group {
        const now = Date.now();
        return {
            id: uuidv4(),
            title: title,
            createdAt: now,
            updatedAt: now,
            units: [],
            color: sample(GROUP_COLORS) as string,
            selected: false,
            open: false
        };
    },
    
    createMainGroup(): Group {
        return this.create(MAIN_GROUP_TITLE);
    },
    getMainGroup(groups: Group[]): Group {
        return groups.find((g) => this.isMain(g)) || this.createMainGroup();
    },
    getMemorizedUnitsNumber(units: TranslationUnit[]): number {
        return units.reduce((acc, unit) => acc + Number(TranslationUnitModel.isMemorized(unit)), 0);
    },
    isMain(group: Group) {
        return group.title === MAIN_GROUP_TITLE;
    },

    normalize(group: Partial<Group>): Group {
        const empty = this.create(`group_${uuidv4()}`);
        
        normalizeObject(empty, group, (key) => {
            // @TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            empty[key] = group[key];
            if (key === 'units') {
                empty.units = empty.units.map((u) => TranslationUnitModel.normalize(u));
            }
        });
        return empty;
    },

    async addRawUnits(group: Group, rawUnits: string): Promise<Group> {
        return { ...group, units: await TranslationUnitModel.listFromRawString(rawUnits) };
    },

    createFromRawUnits(rawUnits: string, title = `group_${uuidv4()}`): Promise<Group> {
        return this.addRawUnits(this.create(title), rawUnits);
    }
};

export default GroupModel;

import {v4 as uuidv4} from 'uuid';
import {BaseObject, TranslationUnit} from './types';
import {sample} from 'lodash';
import TranslationUnitModel from './translationUnit';
import normalizeObject from '../utils/normalize';

export const MAIN_GROUP_TITLE = 'Main';

export interface Group extends BaseObject {
    title: string
    units: TranslationUnit[]
    color: string
    selected: boolean
    open: boolean
}

const GROUP_COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];


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

import getRandomColor from '../utils/getRandomColor';
import {v4 as uuidv4} from 'uuid';
import {BaseObject} from './types';
import normalizeObject from '../utils/normalize';

export interface Tag extends BaseObject {
    title: string
    color: string
}

const TagModel = {
    create(title = 'Random tag'): Tag {
        const now = Date.now();

        return {
            id: uuidv4(),
            color: getRandomColor(),
            title,
            createdAt: now,
            updatedAt: now,
        };
    },

    normalize(tag: Partial<Tag>): Tag {
        return normalizeObject(this, tag);
    },

    isEqual(t1: Tag, t2: Tag): boolean {
        return t1.title === t2.title;
    }
};

export default TagModel;
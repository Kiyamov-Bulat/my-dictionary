import React, {FC} from 'react';
import styles from './styles.module.scss';
import { Tag as ITag } from '../../models/tag';

type TagProps = {
    onRemove: (tag: ITag) => void
} & ITag;

const Tag: FC<TagProps> = ({ onRemove, ...tag }) => {
    return (
        <div className={styles.tag} style={{ background: tag.color }}>
            <p>{tag.title}</p>
            <div className={styles.removeTag} onClick={() => onRemove(tag)}>x</div>
        </div>
    );
};

export default Tag;
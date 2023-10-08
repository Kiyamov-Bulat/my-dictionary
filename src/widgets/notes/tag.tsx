import React, {FC, useMemo} from 'react';
import getRandomColor from '../../utils/getRandomColor';
import styles from './styles.module.scss';

type TagProps = {
    name: string
    onRemove: (tag: string) => void
};

const Tag: FC<TagProps> = ({ name, onRemove }) => {
    const color = useMemo(() => getRandomColor(), []);

    return (
        <div className={styles.tag} style={{ borderColor: color }}>
            <div>{name}</div>
            <div className={styles.removeTag} onClick={() => onRemove(name)}>x</div>
        </div>
    );
};

export default Tag;
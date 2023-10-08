import React, {FC} from 'react';
import getRandomColor from '../../utils/getRandomColor';
import styles from './styles.module.scss';

type TagProps = {
    name: string
};

const Tag: FC<TagProps> = ({ name }) => {
    const color = getRandomColor();

    return (
        <div className={styles.tag} style={{ borderColor: color }}>{name}</div>
    );
};

export default Tag;
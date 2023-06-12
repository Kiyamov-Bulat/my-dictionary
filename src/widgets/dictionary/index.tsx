import React, {FC} from 'react';
import styles from './styles.module.scss';
import {useSelector} from 'react-redux';
import {selectGroups} from '../../store/selectors/dictionary';
import Group from '../group';
import cx from 'classnames';

export type DictionaryProps = {
    className?: string
}

const Dictionary: FC<DictionaryProps> = ({ className }) => {
    const groups = useSelector(selectGroups);

    return (
        <div className={cx(styles.dictionaryContainer, className)}>
            {groups.map((group) => <Group {...group} key={group.id}/>)}
        </div>
    );
};

export default Dictionary;
import React, {FC, useEffect} from 'react';
import styles from '../styles.module.scss';
import Score from '../../score';
import Unit from '../components/unit';
import UnitList from '../components/unitList';
import Navigation from '../components/navigation';
import {selectHasAnswer} from '../../../../store/selectors/game';
import {useSelector} from 'react-redux';
import {has} from 'lodash';

type TranslationFromListProps = {
    reverse?: boolean
}

const TranslationFromList: FC<TranslationFromListProps> = ({ reverse }) => {
    return (
        <div className={styles.middleContainer}>
            <Score className={styles.score}/>
            <Unit reverse={reverse}/>
            <UnitList reverse={reverse}/>
            <Navigation/>
        </div>
    );
};

export default TranslationFromList;
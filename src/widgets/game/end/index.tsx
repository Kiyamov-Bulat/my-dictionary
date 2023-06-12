import React, {FC} from 'react';
import Score from '../score';
import styles from './styles.module.scss';
import Button from '../../../components/button';
import {useDispatch} from 'react-redux';
import {toGameList} from '../../../store/slices/game';
import useHotkey from '../../../components/hotkeyManger/useHotkey';

const End: FC = () => {
    const dispatch = useDispatch();
    const goToGameList = () => {
        dispatch(toGameList());
    };

    useHotkey([' ', 'ArrowRight'], goToGameList);

    return (
        <div className={styles.endContainer}>
            <Score description={true} className={styles.score}/>
            <Button className={styles.btn} onClick={goToGameList} variant={'primary'}>
                К списку тренировок
            </Button>
        </div>
    );
};

export default End;
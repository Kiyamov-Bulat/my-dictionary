import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import Button from '../../../../../components/button';
import {endGame} from '../../../../../store/slices/game';

const EndGame: FC = () => {
    const dispatch = useDispatch();

    return (<Button variant={'primary'} onClick={() => dispatch(endGame())}>Завершить</Button>);
};

export default EndGame;
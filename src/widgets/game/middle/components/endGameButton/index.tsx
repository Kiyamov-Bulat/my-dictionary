import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../../../components/button';
import {endGame} from '../../../../../store/slices/game';
import styles from '../../styles.module.scss';
import cx from 'classnames';
import {selectIsLastUnit} from '../../../../../store/selectors/game';

const EndGame: FC = () => {
    const dispatch = useDispatch();
    const isLastUnit = useSelector(selectIsLastUnit);

    return (<Button className={cx(styles.endGameBtn, { [styles.hidden]: isLastUnit })} variant={'primary'} onClick={() => dispatch(endGame())}>Завершить</Button>);
};

export default EndGame;
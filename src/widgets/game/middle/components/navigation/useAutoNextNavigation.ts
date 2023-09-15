import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentGameUnit, selectIsLastUnit} from '../../../../../store/selectors/game';
import {useEffect, useRef} from 'react';
import {endGame, nextUnit} from '../../../../../store/slices/game';
import store from '../../../../../store';
import {GameUnit} from '../../../../../models/game';

const justAnswered = (oldState?: GameUnit, newState?: GameUnit): boolean =>
    (!!oldState && !!newState && oldState.value.id === newState.value.id && !oldState.answer && !!newState.answer);
const useAutoNextNavigation = (timeout = 2000): void => {
    const currentUnit = useSelector(selectCurrentGameUnit);
    const dispatch = useDispatch();
    const $timeoutId = useRef<number | null>(null);
    const $oldUnit = useRef(currentUnit);

    useEffect(() => {
        if (justAnswered($oldUnit.current, currentUnit)) {
            $timeoutId.current = window.setTimeout(() => {
                $timeoutId.current = null;
                
                dispatch(selectIsLastUnit(store.getState()) ? endGame() : nextUnit());
            }, timeout);
        }
        $oldUnit.current = currentUnit;
        return (): void => {
            $timeoutId.current && window.clearTimeout($timeoutId.current);
            $timeoutId.current = null;
        };
    }, [currentUnit]);
};

export default useAutoNextNavigation;
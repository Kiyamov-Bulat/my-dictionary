import React, {FC, useEffect, useRef} from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import {useWordsContext} from '../wordsContext';
import useWordSelection from './useWordSelection';

type WordProps = {
    value: string
    onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, selection: string) => void
};

const Word: FC<WordProps> = ({ value, onClick }) => {
    const $element = useRef(null);
    const { getWordFromGroups } = useWordsContext();
    const { $selection, saveSelection, clearSelection } = useWordSelection($element);
    const $isCached = useRef(false);
    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        onClick(e, $selection.current);
        clearSelection();

        setTimeout(() => $isCached.current = true);
    };

    useEffect(() => {
        $isCached.current = false;
    }, [value]);

    return (
        <>
            <span
                ref={$element}
                onMouseDown={saveSelection}
                className={cx(styles.word,
                    { [styles.cached]: $isCached.current, [styles.hasWord]: !!getWordFromGroups(value) }
                )}
                onClick={handleClick}>
                {value}
            </span>
        </>
    );
};

export default Word;
import React, {FC, useRef} from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import {useWordsContext} from '../wordsContext';
import useWordSelection from './useWordSelection';

type WordProps = {
    value: string
    isCached: boolean
    onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, selection: string) => void
};

const Word: FC<WordProps> = ({ value, isCached, onClick }) => {
    const $element = useRef(null);
    const { getWordFromGroups } = useWordsContext();
    const { selection, saveSelection, clearSelection } = useWordSelection($element.current);
    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        onClick(e, selection);
        clearSelection();
    };

    return (
        <>
            <span
                ref={$element}
                onMouseDown={saveSelection}
                className={cx(styles.word, { [styles.cached]: isCached, [styles.hasWord]: !!getWordFromGroups(value) })}
                onClick={handleClick}>
                {value}
            </span>
        </>
    );
};

export default Word;
import {useEffect, useRef} from 'react';

const isCorrectSelection = (element: HTMLElement | null) => {
    const selection = window.getSelection();
    const parent = element?.parentElement;

    return (
        element && selection && parent &&
        parent.contains(selection.anchorNode) &&
        parent.contains(selection.focusNode) &&
        selection.containsNode(element, true)
    );
};

const useWordSelection = (wordElement: HTMLElement | null) => {
    const $selection = useRef(wordElement?.textContent || '');

    const clearSelection = () => { $selection.current = wordElement?.textContent || ''; };

    const saveSelection = () => {
        if (isCorrectSelection(wordElement)) {
            $selection.current = window.getSelection()?.toString() || '';
        } else {
            clearSelection();
        }
    };

    useEffect(clearSelection, [wordElement?.textContent]);

    return { $selection, saveSelection, clearSelection };
};

export default useWordSelection;
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
    const $selection = useRef('');

    const saveSelection = () => {
        if (isCorrectSelection(wordElement)) {
            $selection.current = window.getSelection()?.toString() || '';
        }
    };

    const clearSelection = () => $selection.current = '';

    useEffect(() => {
        $selection.current = '';
    }, [wordElement, wordElement?.textContent]);

    return { selection: $selection.current || wordElement?.textContent || '', saveSelection, clearSelection };
};

export default useWordSelection;
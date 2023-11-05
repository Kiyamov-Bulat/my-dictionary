import {MutableRefObject, useEffect, useRef} from 'react';
import {cloneDeep} from 'lodash';

const isCorrectSelection = (element: HTMLElement | null) => {
    const selection = window.getSelection();
    const parent = element?.parentElement;

    return (
        element && selection && parent &&
        parent.contains(selection.anchorNode) &&
        parent.contains(selection.focusNode) &&
        selection.containsNode(element, true) &&
        !!selection.toString()
    );
};

const useWordSelection = ($wordElement: MutableRefObject<HTMLElement | null>) => {
    const $selection = useRef($wordElement.current?.textContent || '');

    const clearSelection = () => { $selection.current = $wordElement.current?.textContent || ''; };

    const saveSelection = () => {
        if (isCorrectSelection($wordElement.current)) {
            $selection.current = window.getSelection()?.toString() || '';
        } else {
            clearSelection();
        }
    };

    useEffect(clearSelection, [$wordElement.current?.textContent]);

    return { $selection, saveSelection, clearSelection };
};

export default useWordSelection;
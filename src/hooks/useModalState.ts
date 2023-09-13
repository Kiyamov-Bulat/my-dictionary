import {useCallback, useState} from 'react';

const useModalState = (value: boolean) => {
    const [isOpen, setIsOpen] = useState(value);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prevState) => !prevState), []);

    return {
        isOpen,
        setIsOpen,
        open,
        close,
        toggle,
    };
};

export default useModalState;
import React, {useCallback} from 'react';

const useEnterHandler = (cb: () => void) => {
    return useCallback((e: React.KeyboardEvent) => {
        if (document.activeElement !== e.target) {
            return;
        }

        if (e.key === 'Enter') {
            cb();
            return;
        }
    }, [cb]);
};

export default useEnterHandler;

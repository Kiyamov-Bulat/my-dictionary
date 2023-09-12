import {useEffect, useRef} from 'react';

const useTimeout = (cb: () => void, ms: number): number | null => {
    const $timeoutId = useRef<number | null>(null);

    useEffect(() => {
        $timeoutId.current = window.setTimeout(() => {
            $timeoutId.current = null;
            cb();
        }, ms);

        return () => {
            $timeoutId.current && window.clearTimeout($timeoutId.current);
            $timeoutId.current = null;
        };
    }, []);

    return $timeoutId.current;
};

export default useTimeout;
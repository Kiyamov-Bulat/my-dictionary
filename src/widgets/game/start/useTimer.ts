import {useEffect, useState} from 'react';

const useTimer = (initialSeconds: number, scale = 1): number => {
    const [seconds, setSeconds] =  useState(initialSeconds);

    useEffect(() => {
        const myInterval = window.setInterval(() => {
            setSeconds((prevState) => {
                const s = prevState - 1;

                if (s <= 0) {
                    clearInterval(myInterval);
                }
                return s;
            });
        }, 1000 * scale);

        return () => {
            clearInterval(myInterval);
        };
    }, []);
    return seconds;
};

export default useTimer;


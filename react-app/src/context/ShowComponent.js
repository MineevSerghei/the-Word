import { useState, useEffect, useRef } from 'react';

export default function useShowComponent(falsyValue) {
    const [isShown, setIsShown] = useState(falsyValue);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShown(falsyValue);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isShown, setIsShown };
}

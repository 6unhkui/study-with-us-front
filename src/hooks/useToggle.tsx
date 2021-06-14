import { useCallback, useState } from "react";

const useToggle = (isOn?: boolean) => {
    const [on, setOn] = useState<boolean>(isOn || false);

    const onToggle = useCallback(() => {
        setOn(state => !state);
    }, []);

    const onChange = useCallback((value: boolean) => {
        setOn(value);
    }, []);

    const reset = useCallback(() => {
        setOn(isOn || false);
    }, [isOn]);

    return {
        isOn: on,
        onToggle,
        onChange,
        reset
    };
};

export default useToggle;

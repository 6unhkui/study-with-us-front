import React, { useCallback, useState } from "react";

const useInput = (initialValue?: string) => {
    const [input, setInput] = useState<string>(initialValue || "");

    const onChange = useCallback(
        (value: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => {
            if (typeof value === "string") {
                setInput(value);
                return;
            }

            setInput(value.target.value);
        },
        []
    );

    const reset = useCallback(() => {
        setInput(initialValue || "");
    }, [initialValue]);

    return {
        input,
        onChange,
        reset
    };
};

export default useInput;

import React, { useCallback, useState } from "react";

const useInput = (initialValue?: string) => {
    const [input, setInput] = useState<string>(initialValue || "");

    const onChange = useCallback(
        (value: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => {
            if (value.constructor.name === "SyntheticBaseEvent") {
                setInput((value as React.ChangeEvent<HTMLInputElement>).target.value);
            }
            if (typeof value === "string") {
                setInput(value);
            }
        },
        []
    );

    const reset = useCallback(() => {
        setInput(initialValue || "");
    }, [initialValue]);

    // const onEnter = useCallback(
    //     (e: React.KeyboardEvent<HTMLInputElement>) => {
    //         if (e.key === "Enter" && input.length !== 0) {
    //             alert(input);
    //         }
    //     },
    //     [input]
    // );

    return {
        input,
        onChange,
        reset
    };
};

export default useInput;

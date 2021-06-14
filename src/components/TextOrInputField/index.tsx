import useInput from "@/hooks/useInput";
import { Button, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./TextOrInputField.module.less";

interface TextOrInputFieldProps {
    name: string;
    defaultValue: string;
    isInput: boolean;
    textarea?: boolean;
    onSubmit?: (value: Record<string, string>) => void;
    showSaveButton?: boolean;
    onChange?: (value: string) => void;
}

const TextOrInputField: React.FC<TextOrInputFieldProps> = ({
    name,
    defaultValue,
    isInput,
    textarea = false,
    onSubmit,
    showSaveButton = false,
    onChange
}) => {
    const [input, setInput] = useState(defaultValue || "");

    useEffect(() => {
        setInput(defaultValue);
    }, [isInput, defaultValue]);

    const onInputSubmit = useCallback(() => {
        onSubmit?.({ [name]: input });
    }, [onSubmit, input, name]);

    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;
            setInput(value);
            onChange?.(value);
        },
        [onChange]
    );

    const Component = textarea ? Input.TextArea : Input;

    if (isInput) {
        return (
            <div className={styles.wrapper}>
                <Component value={input} onChange={onInputChange} name={name} />
                {showSaveButton && <Button onClick={onInputSubmit}>저장</Button>}
            </div>
        );
    }

    return <span>{defaultValue}</span>;
};

export default React.memo(TextOrInputField);

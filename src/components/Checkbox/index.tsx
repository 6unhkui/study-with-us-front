import React, { ReactNode, useCallback } from "react";
import { Checkbox as AntdCheckbox, CheckboxProps as AntdCheckboxProps } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface CheckboxProps extends Omit<AntdCheckboxProps, "value" | "onChange"> {
    label?: string | ReactNode;
    value?: boolean;
    onChange?: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange, ...props }) => {
    const onToogle = useCallback(
        ({ target: { checked: newChecked } }: CheckboxChangeEvent) => {
            onChange?.(newChecked);
        },
        [onChange]
    );

    return (
        <AntdCheckbox checked={value} onChange={onToogle} {...props}>
            {label}
        </AntdCheckbox>
    );
};

export default React.memo(Checkbox);

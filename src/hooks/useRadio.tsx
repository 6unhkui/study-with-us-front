import { RadioChangeEvent } from "antd";
import { useCallback, useState } from "react";

const useRadio = <R extends string>(initialValue: R) => {
    const [selected, setSelected] = useState<R>(initialValue);

    const onChange = useCallback(({ target: { value } }: RadioChangeEvent) => {
        setSelected(value);
    }, []);

    return {
        selected,
        onChange
    };
};

export default useRadio;

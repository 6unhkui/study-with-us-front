import {useState} from "react";

const useToggle = (callback) => {
    const [value, setValue] = useState(false);
    const handleToggle = () => {
        setValue(!value);
        callback();
    }
    return [value, handleToggle];
}

export default useToggle;
import { useState } from "react";

export const useRoomFilter = init => {
    const [values, setValues] = useState({ orderType: "", categoryIds: 0, keyword: "", ...init });

    const handleChange = key =>
        // 실제로 사용될 함수 호출 이전에 key 값을 전달하고 클로저를 이용해 그 값에 접근한다.
        param => {
            let value;

            if (param.constructor.name === "SyntheticEvent") {
                // 이벤트 객체가 전달된다면
                value = param.target.value;
            } else {
                // 값 자체가 전달된다면
                value = param;
            }

            setValues(state => ({
                ...state,
                [key]: value
            }));
        };
    return Object.keys(values).reduce((acc, cur) => {
        acc[cur] = [values[cur], handleChange(cur)];
        return acc;
    }, {});
};

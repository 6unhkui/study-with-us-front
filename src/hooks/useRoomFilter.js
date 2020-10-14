import {useCallback, useState} from "react";

export const useRoomFilter = (initialValue) => {
    const [orderType, setOrderType] = useState(initialValue && initialValue.orderType);
    const [categoryIds, setCategoryIds] = useState(initialValue && initialValue.categoryIds);
    const [keyword, setKeyword] = useState(initialValue && initialValue.keyword);

    const handleChangeOrderType = useCallback(value => {
        setOrderType(value);
    }, []);

    const handleChangeCategoryIds = useCallback(value => {
        setCategoryIds(value);
    }, []);

    const handleChangeKeyword = useCallback(e => {
        setKeyword(e.target.value);
    }, []);


    return {
        orderType : [orderType, handleChangeOrderType],
        categoryIds : [categoryIds, handleChangeCategoryIds],
        keyword : [keyword, handleChangeKeyword],
    }
}
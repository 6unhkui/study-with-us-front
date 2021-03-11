import React, { useEffect, useCallback } from "react";
import { LOAD_CATEGORIES_REQUEST } from "store/modules/category";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

const { Option } = Select;

const CategoryMultiSelector = ({ onSelect, onChange }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        });
    }, [dispatch]);

    const handleChange = useCallback(
        categoryIds => {
            onChange(categoryIds);
            onSelect(categoryIds);
        },
        [onChange, onSelect]
    );

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ minWidth: "200px", marginLeft: "10px" }}
            placeholder="카테고리를 선택해주세요."
            showSearch={false}
            onChange={handleChange}
        >
            {categories.map(category => (
                <Option key={category.categoryId}>{category.name}</Option>
            ))}
        </Select>
    );
};

export default CategoryMultiSelector;

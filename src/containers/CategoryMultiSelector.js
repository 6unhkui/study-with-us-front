import React, {useEffect} from "react";
import {LOAD_CATEGORIES_REQUEST} from "store/modules/category";
import {useDispatch, useSelector} from "react-redux";
import {Select} from "antd";

const { Option } = Select;

const CategoryMultiSelector = ({onChange}) => {
    const dispatch = useDispatch();
    const { categories, loadingCategories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        })
    },[dispatch]);

    return (
        <Select
            mode="multiple"
            allowClear
            style={{minWidth: '200px', marginLeft: '10px'}}
            placeholder="카테고리를 선택해주세요."
            showSearch={false}
            onChange={onChange}
        >
            {categories.map(category => <Option key={category.categoryId}>{category.name}</Option>)}
        </Select>
    )
}

export default CategoryMultiSelector;
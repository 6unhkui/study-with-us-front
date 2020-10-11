import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_CATEGORIES_REQUEST} from "store/modules/category";
import LayerPopup from 'components/LayerPopup';

import {Button, Radio} from 'antd';

const radioStyle = {
    display: 'block',
    marginBottom : '10px'
};
const CategorySelector = ({initialValue, setLayerOpen, onSubmit, submitText}) => {
    const dispatch = useDispatch();
    const { categories, loadingCategories } = useSelector(state => state.category);
    const [selected, setSelected] = useState(initialValue);

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        })
    }, [dispatch]);

    const handleSubmit = useCallback(() => {
        onSubmit(selected);
    }, [onSubmit, selected]);


    return (
        <LayerPopup title="카테고리 선택" setLayerOpen={setLayerOpen} size="400px">
            <Radio.Group value={selected} onChange={e => {setSelected(e.target.value)}}>
                {categories.map((value, i) => (
                    <Radio style={radioStyle} value={value.categoryId} key={i}>
                        {value.name}
                    </Radio>
                ))}
            </Radio.Group>

            <Button type="primary" style={{display : 'block', margin : '20px auto 0 auto'}}
                    onClick={handleSubmit}
            >
                {submitText}
            </Button>
        </LayerPopup>
    )
}

export default CategorySelector;






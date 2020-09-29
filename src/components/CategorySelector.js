import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {http} from 'utils/HttpHandler';
import styled from 'styled-components';
import { Button, Checkbox, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import LayerPopup from 'components/LayerPopup';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_CATEGORIES_REQUEST} from "store/modules/category";


function Layer(props) {
    const [selected, setSelected] = useState(props.selected || []);

    const handleCheckboxChange = useCallback( e => {
        if(e.target.checked) {
            setSelected(selected.concat(e.target.value));
        }else setSelected(selected.filter(val => val !== e.target.value))
    }, [selected]);

    return (
        <LayerPopup title="카테고리 선택" setLayerOpen={props.setLayerOpen} size="400px" loading={props.loading}>
            <Row gutter={[10, 14]}>
                {props.categories.map(v => (
                    <Col span={8} key={v.categoryId}>
                        <Checkbox value={v.categoryId} onChange={handleCheckboxChange} defaultChecked={props.selected.includes(v.categoryId)}>
                            {v.name}
                        </Checkbox>
                    </Col>
                ))}
            </Row>

            <BtnWrap>
                <Button block type="primary" onClick={() => {props.onSubmit(selected)}}>선택</Button>
            </BtnWrap>
        </LayerPopup>
    )
}


const CategorySelect = ({onSubmit, style}) => {
    const dispatch = useDispatch();
    const { categories, loadingCategories } = useSelector(state => state.category);
    const [selected, setSelected] = useState([]);
    const [layerOpen, setLayerOpen] = useState(false);

    useEffect(() => {
        if(layerOpen) {
            dispatch({
                type: LOAD_CATEGORIES_REQUEST
            })
        }
    }, [dispatch, layerOpen]);

    const handleSubmit = useCallback (val => {
        setSelected(val);
        onSubmit(val);
        setLayerOpen(false);
    }, [selected, layerOpen]);

    return (
        <>
            {layerOpen && <Layer setLayerOpen={setLayerOpen}
                                 categories={categories}
                                 selected={selected}
                                 onSubmit={handleSubmit}
                                 loading={loadingCategories}
            />}

            <Button onClick={() => {setLayerOpen(true)}} style={{...style}}>
                {/** 선택된 카테고리가 있다면, 버튼 내용으로 보여준다. */}
                {selected.length > 0 ?
                    categories.filter(v => selected.includes(v.categoryId))
                               .map(v => v.name).join(", ")
                    : '카테고리 선택'}
                <DownOutlined />
            </Button>
        </>
    )
}

export default CategorySelect;

CategorySelect.propTypes = {
    onSubmit : PropTypes.func.isRequired,
};

CategorySelect.defaultProps = {
    onSubmit : (val) => { console.error("submit function is not defined"); }
};



// Style - s /////////////////////////////
const BtnWrap = styled.div`
    text-align : center;
    margin-top: 40px;

    .init-btn {
        font-size: 0.8rem;
        margin: 10px 0px;
        color: var(--font-color-gray);
        text-decoration: underline;
        position: relative;
        top: 10px;
        cursor : pointer;
    }
`
// Style - e /////////////////////////////




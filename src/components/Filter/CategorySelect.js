import React, {useState, useEffect} from 'react';
import {http} from 'utils/HttpHandler';
import styled from 'styled-components';
import { Button, Checkbox, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import LayerPopup from 'components/LayerPopup';

function Layer(props) {
    const [selected, setSelected] = useState(props.selected || []);

    const handleCheckboxChange = e => {
        if(e.target.checked) {
            setSelected(selected.concat(e.target.value));
        }else setSelected(selected.filter(val => val !== e.target.value))
    }

    return (
        <LayerPopup title="카테고리 선택" setLayerOpen={props.setLayerOpen} size="400px">
            <Row gutter={[10, 14]}>
                {props.categories.map(v => (
                    <Col span={8}>
                        <Checkbox value={v.id} onChange={handleCheckboxChange} defaultChecked={props.selected.includes(v.id)} key={v.id}>
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

const CategorySelect = (props) => {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);
    const [layerOpen, setLayerOpen] = useState(false);

    useEffect(() => {
        _getCategories();
    }, [layerOpen]);

    const _getCategories = () => {
        http.get("/api/v1/categories")
        .then(response => {
            const data = response.data.data;
            setCategories(data);
        })
    }

    const onSubmit = val => {
        setSelected(val);
        props.onChange(val);
        setLayerOpen(false);
    }

    return (
        <>
            {layerOpen && <Layer setLayerOpen={setLayerOpen} 
                                 categories={categories} 
                                 selected={selected} 
                                 onSubmit={onSubmit}/>}
            <Button onClick={() => {setLayerOpen(true)}} style={{...props.style}}>
                {selected.length > 0 ? categories.filter(v => selected.includes(v.id)).map(v => v.name).join(", ") : '카테고리 선택'}
                <DownOutlined />
            </Button>
        </>
    )
}


export default CategorySelect;

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



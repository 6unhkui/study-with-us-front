import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Button, Radio} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import LayerPopup from 'components/LayerPopup';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

function Layer({setLayerOpen, orderTypes, onChangeOrderType, selected}) {
    return (
        <LayerPopup title="정렬" setLayerOpen={setLayerOpen} size="400px">
             <Radio.Group value={selected.key}>
                 {orderTypes.map(v => (
                     <Radio style={radioStyle} value={v.key} 
                        onClick={(e) => {onChangeOrderType(v)}}>
                        {v.value}
                    </Radio>
                 ))}
            </Radio.Group>
        </LayerPopup>
    )
}

const orderTypes = [
    {key : "NAME", value : "이름 순"},
    {key : "CREATED_DATE", value : "생성일 순"},
    {key : "JOIN_COUNT", value : "멤버수 순"}
];

const RoomOrderSelect = ({onSubmit}) => {
    const [selected, setSelected] = useState(orderTypes[0]);
    const [layerOpen, setLayerOpen] = useState(false);

    const onChangeOrderType = useCallback(val => {
        setSelected(val);
        onSubmit(val.key);
        setLayerOpen(false);
    }, [selected, layerOpen]);


    return (
        <>
            {layerOpen && <Layer setLayerOpen={setLayerOpen} 
                                 orderTypes={orderTypes} 
                                 selected={selected} 
                                 onChangeOrderType={onChangeOrderType}/>}
                                 
            <Button onClick={() => {setLayerOpen(true)}}>
                {selected.value} <DownOutlined />
            </Button>
        </>
    )
}

export default RoomOrderSelect;


RoomOrderSelect.propTypes = {
    onSubmit : PropTypes.func.isRequired,
};

RoomOrderSelect.defaultProps = {
    onSubmit : (val) => { console.error("submit function is not defined"); }
};

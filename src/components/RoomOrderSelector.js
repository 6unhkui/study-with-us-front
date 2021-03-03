import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Button, Radio} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import LayerPopup from 'components/LayerPopup';

const orderTypes = [
    {key : "NAME", value : "이름 순"},
    {key : "CREATED_DATE", value : "생성일 순"},
    {key : "JOIN_COUNT", value : "멤버수 순"}
];

function Layer({setLayerOpen, onChangeOrderType, selected}) {
    return (
        <LayerPopup title="정렬" setLayerOpen={setLayerOpen} size="400px">
             <Radio.Group value={selected.key}>
                 {orderTypes.map((orderType, i) => (
                     <Radio style={{
                                display: 'block',
                                height: '30px',
                                lineHeight: '30px',
                            }} 
                            value={orderType.key} 
                            onClick={onChangeOrderType.bind(null, orderType)}>
                        {orderType.value}
                    </Radio>
                 ))}
            </Radio.Group>
        </LayerPopup>
    )
}

const RoomOrderSelect = ({onSubmit}) => {
    const [selected, setSelected] = useState(orderTypes[0]);
    const [layerOpen, setLayerOpen] = useState(false);

    const onChangeOrderType = useCallback(val => {
        setSelected(val);
        onSubmit(val.key);
        setLayerOpen(false);
    }, [onSubmit]);

    return (
        <>
            {layerOpen && <Layer setLayerOpen={setLayerOpen} 
                                 selected={selected} 
                                 onChangeOrderType={onChangeOrderType}/>}
                                 
            <Button onClick={setLayerOpen.bind(null, true)}>
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

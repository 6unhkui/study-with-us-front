import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Radio } from "antd";
import { DownOutlined } from "@ant-design/icons";

import LayerPopup from "components/LayerPopup";

const orderTypes = [
    { key: "NAME", value: "이름 순" },
    { key: "CREATED_DATE", value: "생성일 순" },
    { key: "JOIN_COUNT", value: "멤버수 순" }
];

function Layer({ setLayerOpen, selected, onChange, onSelect }) {
    return (
        <LayerPopup title="정렬" setLayerOpen={setLayerOpen} size="400px">
            <Radio.Group value={selected.key}>
                {orderTypes.map((orderType, i) => (
                    <Radio
                        style={{
                            display: "block",
                            height: "30px",
                            lineHeight: "30px"
                        }}
                        key={orderType.key}
                        value={orderType.key}
                        onClick={onChange.bind(null, orderType)}
                    >
                        {orderType.value}
                    </Radio>
                ))}
            </Radio.Group>
            <Button type="primary" style={{ display: "block", margin: "20px auto 0 auto" }} onClick={onSelect}>
                선택
            </Button>
        </LayerPopup>
    );
}

const RoomOrderSelect = ({ onSelect, onChange }) => {
    const [selected, setSelected] = useState(orderTypes[0]);
    const [layerOpen, setLayerOpen] = useState(false);

    const handleSelect = useCallback(() => {
        onSelect(selected.key);
        setLayerOpen(false);
    }, [onSelect, selected.key]);

    const handleChange = useCallback(
        orderType => {
            setSelected(orderType);
            onChange(orderType.key);
        },
        [onChange]
    );

    return (
        <>
            {layerOpen && (
                <Layer setLayerOpen={setLayerOpen} selected={selected} onChange={handleChange} onSelect={handleSelect} />
            )}
            <Button onClick={setLayerOpen.bind(null, true)}>
                {selected.value} <DownOutlined />
            </Button>
        </>
    );
};

export default RoomOrderSelect;

RoomOrderSelect.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

RoomOrderSelect.defaultProps = {
    onSubmit: val => {
        console.error("submit function is not defined");
    }
};

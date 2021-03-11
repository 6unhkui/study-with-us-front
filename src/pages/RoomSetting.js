import React from "react";
import { useSelector } from "react-redux";
import CardWrap from "components/CardBox";

import MyInfo from "containers/RoomSetting/MyInfo";
import RoomInfo from "containers/RoomSetting/RoomInfo";

const SettingRoom = props => {
    const roomId = props.match.params.id;
    const {
        roomDetail: { name }
    } = useSelector(state => state.room);

    return (
        <CardWrap pageHeader={{ title: name, backUrl: `/room/${roomId}` }}>
            <RoomInfo roomId={roomId} />
            <br />
            <br />
            <MyInfo roomId={roomId} />
        </CardWrap>
    );
};

export default SettingRoom;

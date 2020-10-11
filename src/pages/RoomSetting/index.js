import React from 'react';
import {useSelector} from "react-redux";
import CardWrap from "components/Layout/Main/Card";

import MyInfo from './Sections/MyInfo';

import RoomInfo from "./Sections/RoomInfo";

const SettingRoom = (props) => {
    const roomId = props.match.params.id;
    const { roomDetail : { name }} = useSelector(state => state.room);

    return (
        <CardWrap pageHeader={{title : name, backUrl : `/room/${roomId}`}}>
            <RoomInfo roomId={roomId}/>

            <br/><br/>

            <MyInfo roomId={roomId}/>
        </CardWrap>
    )
}

export default SettingRoom;
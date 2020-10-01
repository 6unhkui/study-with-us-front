import React from 'react';
import { http } from 'utils/HttpHandler';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import CardWrap from "components/Layout/Main/Card";

import { Button} from 'antd';

const SettingRoom = (props) => {
    const roomId = props.match.params.id;
    const history = useHistory();
    const { roomDetail : {name, currentAccount} } = useSelector(state => state.room);

    const handleDeleteMember = () => {
      if(currentAccount.role === 'MANAGER') {
        alert("매니저는 탈퇴할 수 없습니다. 권한을 위임하거나, 스터디방을 삭제해주세요.");
        return false;
      }
      http.delete(`/api/v1/room/${props.match.params.id}`)
      .then(response => {
        history.push("/");
      })
    }

    return (
        <CardWrap pageHeader={{title : name, backUrl : `/room/${roomId}`}}>
              <Button onClick={handleDeleteMember}>회원 탈퇴</Button>
        </CardWrap>
    )
}

export default SettingRoom;
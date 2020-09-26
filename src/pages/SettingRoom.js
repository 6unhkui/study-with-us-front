import React from 'react';
import { useHistory } from "react-router-dom";
import { http } from 'utils/HttpHandler';

import { Button, PageHeader, Card, Divider} from 'antd';

const SettingRoom = (props) => {
    const history = useHistory();
    
    const {name, currentAccount} = props.location.state;

    const handleDeleteMember = () => {
      if(currentAccount.role === 'MANAGER') {
        alert("매니저는 탈퇴할 수 없습니다. 권한을 위임하거나, 스터디방을 삭제해주세요.");
        return false;
      }
      http.delete(`/api/v1/room/${props.match.params.id}`)
      .then(response => {
        props.history.push("/");
      })
  }

    return (
      <div className="bg-gray">
        <div className="container content-wrap">
            <Card>
              <PageHeader
                onBack={() => history.push(`${props.location.state.from.pathname}`)}
                title={name}
                style={{padding : '0', marginBottom : '1rem'}}
              /> 
              <Divider/>
              
              <Button onClick={handleDeleteMember}>회원 탈퇴</Button>
            </Card>
        </div>
      </div>
    )
}

export default SettingRoom;
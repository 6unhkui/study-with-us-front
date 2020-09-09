import React from 'react';
import { withRouter } from "react-router-dom";
import CreateForm from './Sections/CreateForm';

import { Typography, Divider } from 'antd';
const { Title } = Typography;

const CreateStudyRoomPage = (props) => {
    return (
      <div className="container content-wrap">
        <div className="form-wrap">
          <Title>스터디방 만들기</Title>
          <CreateForm {...props} />
        </div>
      </div>
    )
}

export default withRouter(CreateStudyRoomPage);
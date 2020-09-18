import React from 'react';
import { withRouter } from "react-router-dom";
import CreateForm from './Sections/CreateForm';

import { Typography } from 'antd';
const { Title } = Typography;

const CreateStudyRoomPage = (props) => {
    return (
      <div className="bg-gray">
        <div className="container content-wrap">
          <div className="form-wrap">
            <Title>스터디방 만들기</Title>
            <CreateForm {...props} />
          </div>
        </div>
      </div>
    )
}

export default withRouter(CreateStudyRoomPage);
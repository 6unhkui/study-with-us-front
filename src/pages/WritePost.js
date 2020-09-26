import React from 'react';
import { useHistory } from "react-router-dom";

import { PageHeader, Divider} from 'antd';
import CreateForm from 'containers/PostForm';
import {useSelector} from "react-redux";

const WritePost = (props) => {
    const history = useHistory();
    const { roomDetail } = useSelector(state => state.room);

    return (
      <div className="bg-gray">
        <div className="container content-wrap">
            <div className="card-wrap card-width-full">
              <PageHeader onBack={() => history.push(`/room/${roomDetail.roomId}`)}
                          title={roomDetail && roomDetail.name}
                          style={{padding : '0', marginBottom : '1rem'}}
              />
              <Divider/>
              
              <CreateForm {...props}/>
            </div>
        </div>
      </div>
    )
}

export default WritePost;
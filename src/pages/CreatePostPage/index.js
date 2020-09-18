import React from 'react';
import { useHistory } from "react-router-dom";

import { PageHeader, Card, Divider} from 'antd';
import CreateForm from './Sections/CreateForm';

export default function CreatePostPage(props) {
    const history = useHistory();

    return (
      <div className="bg-gray">
        <div className="container content-wrap">
            <Card>
              <PageHeader
                onBack={() => history.push(`${props.location.state.from.pathname}`)}
                title={props.location.state ? props.location.state.name : null}
                style={{padding : '0', marginBottom : '1rem'}}
              />
              <Divider/>
              
              <CreateForm {...props}/>
            </Card>
        </div>
      </div>
    )
}
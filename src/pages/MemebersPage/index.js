import React, {useState, useEffect} from 'react';
import {http} from 'utils/HttpHandler';
import { List } from 'antd';

import MemberList from 'components/List/MemberList';

export default function MembersPage(props) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState({
      page : 1,
      size : 6,
      direction : 'ASC',
      totalElements : 0
  });

  useEffect(() => {
    _getMembers();
  },[])

  const _getMembers = () => {
    const params = Object.entries(pagination).map(e => e.join('=')).join('&');
    http.get(`/api/v1/room/${props.match.params.id}/members?${params}`)
    .then(response => {
        const data = response.data.data;
        setMembers(data.content);
        setLoading(false);
    })
  }

  return (
    <div>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={members}
          renderItem={item => (
            <MemberList currentAccount={props.currentAccount} account={item} loading={item.loading}/>
        )}
       />
    </div>
  )
}

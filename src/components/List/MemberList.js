import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';
import { List, Skeleton } from 'antd';


export default function MembersList(props) {
  const cardActionItems = () => {
    const {role} = props.currentAccount;
    if(role === "MANAGER") {
      return [<a key="list-loadmore-edit">관리</a>]
    }else return null;
}

  return (
    <List.Item actions={cardActionItems()}>
        <Skeleton avatar title={false} loading={props.loading} active>
        <List.Item.Meta
            avatar={<Avatar user={props.account}/>}
            title={<><span>{props.account.name}</span><RoleBadge role={props.account.role}>{props.account.role}</RoleBadge></>}
            description={<span>{props.account.email}</span>}
        />
        </Skeleton>
  </List.Item>
  )
}

const RoleBadge = styled.span`
  margin-left: 6px;
  background-color: ${(props) => props.role === 'MANAGER'? "var(--primary-color)" : "var(--bg-gray)"};
  color: ${(props) => props.role === 'MANAGER' ? "#fff" : "var(--font-color-gray)"};
  font-size: .6rem;
  padding: 2px 4px;
  border-radius: 3px;
  position: relative;
  bottom: 1px;
`
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';
import { List, Skeleton } from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";

export default function MemberRow({loading, account, currentAccount}) {
  const { me } = useSelector(state => state.account);
  const { role } = currentAccount;
  const { accountId } = account;
  const [hasEditPermission, setHasEditPermission] = useState(false);

  useEffect(() => {
      if(role === "MANAGER" || accountId == me.accountId) {
          setHasEditPermission(true)
      }
  }, [accountId, me.accountId, role]);


  return (
    <List.Item actions={
            [hasEditPermission && <SettingOutlined />]
    }>
        <Skeleton avatar title={false} loading={loading} active>
        <List.Item.Meta
            avatar={<Avatar user={account}/>}
            title={<><span>{account.name}</span>
                     <RoleBadge role={account.role}>{account.role}</RoleBadge>
                   </>}
            description={<span>{account.email}</span>}
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
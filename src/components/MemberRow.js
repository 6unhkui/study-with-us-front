import React, {useState, useCallback} from 'react';
import Avatar from 'components/Avatar';
import { List, Skeleton, Button } from 'antd';
import MemberDetailDrawer from "containers/MemberDetailDrawer";
import MemberRoleBadge from "./MemberRoleBadge";

const MemberRow = ({loading, member, showView = false}) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const handleMemberDetailVisible = useCallback(isVisible => {
      setDetailVisible(isVisible)
  }, []);

  return (
    <List.Item
        key={member.accountId}
        actions={[showView && <Button type="link" onClick={() => handleMemberDetailVisible(true)} >view</Button>]}
    >
        <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
                avatar={<Avatar user={member}/>}
                title={<span>{member.name}{member.role && <MemberRoleBadge role={member.role}/>}</span>}
                description={<span>{member.email}</span>}
            />

            {showView && detailVisible &&
            <MemberDetailDrawer memberId={member.memberId}
                                visible={detailVisible}
                                onClose={() => handleMemberDetailVisible(false)}/>
            }
        </Skeleton>
    </List.Item>
  )
}

export default MemberRow;


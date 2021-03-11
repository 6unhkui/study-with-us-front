import React, { useState } from "react";
import Avatar from "components/Avatar";
import { List, Skeleton, Button } from "antd";
import MemberDetailDrawer from "containers/RoomDetail/MembersByRoom/MemberDetailDrawer";
import Badge from "./Badge";

const MemberRow = ({ loading, member, idx, showActions = true }) => {
    const [visibleDetail, setVisibleDetail] = useState(false);

    return (
        <List.Item
            key={idx}
            actions={
                showActions && [
                    <Button type="link" onClick={setVisibleDetail.bind(null, true)}>
                        view
                    </Button>
                ]
            }
        >
            <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                    avatar={<Avatar user={member} />}
                    title={
                        <span style={{ marginLeft: "10px" }}>
                            {member.name}
                            {member.role && <Badge text={member.role} type={member.role === "MANAGER" && "primary"} />}
                        </span>
                    }
                    description={<span style={{ marginLeft: "10px" }}>{member.email}</span>}
                />

                {visibleDetail && (
                    <MemberDetailDrawer memberId={idx} visible={visibleDetail} onClose={setVisibleDetail.bind(null, false)} />
                )}
            </Skeleton>
        </List.Item>
    );
};

export default MemberRow;

import { List } from "antd";
import React from "react";
import MemberListItem, { MemberListItemProps } from "@/components/MemberListItem";
import EmptyList from "@/components/EmptyList";

interface MemberListContainerProps {
    data?: MemberListItemProps[] | null;
    loading: boolean;
    lastItemRef?: (node: any) => void;
}

const MemberListContainer: React.FC<MemberListContainerProps> = ({ data, loading, lastItemRef }) => {
    return (
        <List
            dataSource={data || []}
            locale={{ emptyText: <EmptyList /> }}
            loading={loading}
            renderItem={(item: MemberListItemProps, i: number) => {
                if (lastItemRef && data && i === data?.length - 1) {
                    return (
                        <List.Item key={item.memberId}>
                            <div ref={lastItemRef} style={{ width: "100%" }}>
                                <MemberListItem {...item} />
                            </div>
                        </List.Item>
                    );
                }

                return (
                    <List.Item key={item.memberId}>
                        <MemberListItem {...item} />
                    </List.Item>
                );
            }}
        />
    );
};

export default React.memo(MemberListContainer);

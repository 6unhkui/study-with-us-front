import { List } from "antd";
import React from "react";
import RoomListItem, { RoomListItemProps } from "@/components/RoomListItem";
import EmptyList from "@/components/EmptyList";

interface RoomListContainerProps {
    data?: RoomListItemProps[] | null;
    loading: boolean;
    lastItemRef?: (node: any) => void;
}

const RoomListContainer: React.FC<RoomListContainerProps> = ({ data, loading, lastItemRef }) => {
    return (
        <List
            grid={{ gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, column: 3 }}
            dataSource={data || []}
            locale={{ emptyText: <EmptyList /> }}
            loading={loading}
            renderItem={(item: RoomListItemProps, i: number) => {
                if (lastItemRef && data && i === data?.length - 1) {
                    return (
                        <List.Item key={item.roomId}>
                            <div ref={lastItemRef}>
                                <RoomListItem {...item} />
                            </div>
                        </List.Item>
                    );
                }
                return (
                    <List.Item key={item.roomId}>
                        <RoomListItem {...item} />
                    </List.Item>
                );
            }}
        />
    );
};

export default React.memo(RoomListContainer);

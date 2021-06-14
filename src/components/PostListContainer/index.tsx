import { List } from "antd";
import React from "react";
import PostListItem, { PostListItemProps } from "@/components/PostListItem";
import EmptyList from "@/components/EmptyList";

interface PostListContainerProps {
    data?: PostListItemProps[] | null;
    loading: boolean;
    lastItemRef?: (node: any) => void;
    visibleRoomName?: boolean;
}

const PostListContainer: React.FC<PostListContainerProps> = ({ data, loading, lastItemRef, visibleRoomName = false }) => {
    return (
        <List
            dataSource={data || []}
            locale={{ emptyText: <EmptyList /> }}
            loading={loading}
            renderItem={(item: PostListItemProps, i: number) => {
                if (lastItemRef && data && i === data?.length - 1) {
                    return (
                        <List.Item key={item.postId}>
                            <div ref={lastItemRef} style={{ width: "100%" }}>
                                <PostListItem {...item} visibleRoomName={visibleRoomName} />
                            </div>
                        </List.Item>
                    );
                }

                return (
                    <List.Item key={item.postId}>
                        <PostListItem {...item} visibleRoomName={visibleRoomName} />
                    </List.Item>
                );
            }}
        />
    );
};

export default React.memo(PostListContainer);

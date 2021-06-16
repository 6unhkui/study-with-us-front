import { SearchMembersByPageDTO } from "@/api/dto/member.dto";
import MemberListContainer from "@/components/MemberListContainer";
import SEO from "@/components/SEO";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useMemberListFetch } from "@/hooks/useRedux";
import { Input } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import styles from "./MeberByRoom.module.less";

const initialParam: SearchMembersByPageDTO = { page: 1, size: 2, direction: "ASC" };

interface MembersByRoomProps {}

const MembersByRoom: React.FC<MembersByRoomProps> = () => {
    const intId = useGetIntIdFromUrl();
    const param = useRef<SearchMembersByPageDTO>({ ...initialParam, roomId: intId });
    const { data, loading, hasMore, fetch } = useMemberListFetch();

    useEffect(() => {
        fetch(param.current);
    }, [fetch]);

    const onSearchInputSubmit = useCallback(
        (input: string) => {
            param.current = { ...param.current, page: 1, keyword: input };
            fetch(param.current);
        },
        [fetch]
    );

    const loadMore = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (loading) return;
            if (entries[0].isIntersecting && hasMore) {
                param.current = { ...param.current, page: param.current.page + 1 };
                fetch(param.current);
            }
        },
        [loading, fetch, hasMore]
    );

    const { domRef: lastItemRef } = useIntersectionObserver(loadMore);

    return (
        <section>
            <SEO title="멤버 목록" />
            <Input.Search
                enterButton="검색"
                placeholder="검색어를 입력하세요."
                size="large"
                onSearch={onSearchInputSubmit}
                className={styles.searchInput}
            />
            <MemberListContainer data={data} loading={loading} lastItemRef={lastItemRef} />
        </section>
    );
};

export default MembersByRoom;

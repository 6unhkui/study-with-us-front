import { SearchMembersByPageDTO } from "@/api/dto/member.dto";
import MemberListContainer from "@/components/MemberListContainer";
import SEO from "@/components/SEO";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useMemberListAsync } from "@/hooks/useRedux";
import { Input } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MeberByRoom.module.less";

const initialParam: SearchMembersByPageDTO = { page: 1, size: 6, direction: "ASC" };

interface MembersByRoomProps {}

const MembersByRoom: React.FC<MembersByRoomProps> = () => {
    const intId = useGetIntIdFromUrl();
    initialParam.roomId = intId;

    const [payload, setPayload] = useState<SearchMembersByPageDTO>({ ...initialParam, roomId: intId });
    const { data, loading, hasMore, fetch } = useMemberListAsync();
    const page = useRef(payload.page);

    useEffect(() => {
        fetch(initialParam);
    }, [fetch]);

    const onSubmitSearchInput = useCallback(
        (input: string) => {
            page.current = 1;
            fetch({ ...payload, keyword: input });
            setPayload({ ...payload, keyword: input });
        },
        [fetch, payload]
    );

    const loadMore = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (loading) return;
            if (entries[0].isIntersecting && hasMore) {
                page.current += 1;
                fetch({ ...initialParam, page: page.current });
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
                onSearch={onSubmitSearchInput}
                className={styles.searchInput}
            />
            <MemberListContainer data={data} loading={loading} lastItemRef={lastItemRef} />
        </section>
    );
};

export default MembersByRoom;

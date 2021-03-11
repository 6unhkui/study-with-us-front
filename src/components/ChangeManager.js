import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Radio } from "antd";

import LayerPopup from "components/LayerPopup";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MEMBERS_REQUEST } from "store/modules/member";
import Avatar from "components/Avatar";
import styled from "styled-components";

import Pagination from "utils/Pagination";

const initPagination = new Pagination();
Object.freeze(initPagination);

const ChangeManager = ({ setLayerOpen, roomId, onSubmit }) => {
    const dispatch = useDispatch();
    const { members, loadingMembers, hasMoreMembers } = useSelector(state => state.member);
    const [pagination, setPagination] = useState({ ...initPagination });
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        dispatch({
            type: LOAD_MEMBERS_REQUEST,
            roomId,
            pagination
        });
    }, [dispatch, pagination, pagination.page, roomId]);

    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page: ++pagination.page
        });
    }, [pagination]);

    const handleSubmit = useCallback(() => {
        if (!selected) return;

        onSubmit(selected);
    }, [onSubmit, selected]);

    return (
        <LayerPopup title="매니저 위임" setLayerOpen={setLayerOpen} size="600px">
            <Radio.Group
                onChange={e => {
                    setSelected(e.target.value);
                }}
            >
                <List
                    loading={loadingMembers}
                    loadMore={
                        hasMoreMembers && (
                            <MoreBtnWrap>
                                <Button ghost type="primary" onClick={handleLoadMore}>
                                    load more
                                </Button>
                            </MoreBtnWrap>
                        )
                    }
                    itemLayout="horizontal"
                    dataSource={members.filter(v => v.role === "MATE")}
                    renderItem={item => (
                        <Radio
                            style={{
                                display: "block",
                                marginBottom: "16px"
                            }}
                            value={item.memberId}
                        >
                            <Avatar user={{ name: item.name, profileImg: item.profileImg }} showName={true} />
                        </Radio>
                    )}
                />
            </Radio.Group>
            <Button type="primary" style={{ display: "block", margin: "20px auto 0 auto" }} onClick={handleSubmit}>
                매니저 위임
            </Button>
        </LayerPopup>
    );
};

export default ChangeManager;

const MoreBtnWrap = styled.div`
    text-align: center;
    margin-top: 2rem;
`;

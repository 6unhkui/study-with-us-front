import React, {useCallback, useEffect, useState} from 'react';
import {Button, List, Radio} from 'antd';

import MemberRow from "./MemberRow";
import LayerPopup from 'components/LayerPopup';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_CURRENT_CHAT_MEMBERS_REQUEST} from 'store/modules/chat';
import {LOAD_MEMBERS_REQUEST, CHANGE_MANAGER_REQUEST} from "store/modules/member";
import Avatar from 'components/Avatar';
import styled from "styled-components";


const radioStyle = {
    display: 'block',
    marginBottom : '16px'
};
const ChangeManager = ({setLayerOpen, roomId, onSubmit}) => {
    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const dispatch = useDispatch();
    const { members, loadingMembers, hasMoreMembers} = useSelector(state => state.member);
    const [pagination, setPagination] = useState(initPagination);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        dispatch({
            type : LOAD_MEMBERS_REQUEST,
            roomId,
            pagination,
        })
    },[pagination.page, roomId]);

    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    const handleSubmit = useCallback(() => {
        if(!selected) return;

        onSubmit(selected)
    }, [onSubmit, selected]);

    return (
        <LayerPopup title="매니저 위임" setLayerOpen={setLayerOpen} size="600px">
            <Radio.Group onChange={e => {setSelected(e.target.value)}}>
            <List
                loading={loadingMembers}
                loadMore={hasMoreMembers &&
                          <MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>}
                itemLayout="horizontal"
                dataSource={members.filter(v => v.role === 'MATE')}
                renderItem={item => (
                    <Radio style={radioStyle} value={item.memberId}>
                        <Avatar user={{name : item.name, profileImg : item.profileImg}} showName={true}/>
                    </Radio>
                )}
            />
            </Radio.Group>
            <Button type="primary" style={{display : 'block', margin : '20px auto 0 auto'}}
                    onClick={handleSubmit}
            >
                매니저 위임
            </Button>
        </LayerPopup>
    )
}

export default ChangeManager;

const MoreBtnWrap = styled.div`
    text-align : center;
    margin-top : 2rem;
`

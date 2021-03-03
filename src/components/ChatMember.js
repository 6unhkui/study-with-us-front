import React, {useEffect} from 'react';
import {List} from 'antd';

import MemberRow from "./MemberRow";
import LayerPopup from 'components/LayerPopup';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_CURRENT_CHAT_MEMBERS_REQUEST} from 'store/modules/chat';


const ChatMember = ({setLayerOpen, roomId}) => {
    const dispatch = useDispatch();
    const { loadingChatMembers, chatMembers } = useSelector(state => state.chat);

    useEffect(() => {
        dispatch({
            type : LOAD_CURRENT_CHAT_MEMBERS_REQUEST,
            data : roomId
        })
    }, [setLayerOpen, roomId, dispatch]);


    return (
        <LayerPopup title="현재 참여중인 멤버" setLayerOpen={setLayerOpen} size="600px">
            <List
                loading={loadingChatMembers}
                itemLayout="horizontal"
                dataSource={chatMembers}
                renderItem={item => (
                    <MemberRow key={item.accountId} 
                               idx={item.accountId} 
                               member={item} 
                               loading={item.loading}
                               showActions={false}
                    />
                )}
            />
        </LayerPopup>
    )
}

export default ChatMember;



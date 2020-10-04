import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Row, Col, List} from 'antd';
import { DownOutlined } from '@ant-design/icons';

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
                    <MemberRow account={item} loading={item.loading}/>
                )}
            />
        </LayerPopup>
    )
}

export default ChatMember;



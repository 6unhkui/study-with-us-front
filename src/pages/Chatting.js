import React, { useCallback, useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import styled from "styled-components";
import CardWrap from "components/CardBox";
import { SERVER_URI } from "constants/index";
import { header } from "utils/httpHandler";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MESSAGE_HISTORY_REQUEST, ADD_CHAT_MESSAGE } from "store/modules/chat";
import ChatMessage from "components/ChatMessage";
import ChatMember from "components/ChatMember";
import { Input, Badge, Button } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import SEO from "components/SEO";

const { Search } = Input;

const sendType = {
    enter: "ENTER",
    quit: "QUIT",
    talk: "TALK"
};

const Chatting = props => {
    const roomId = props?.match.params.id;
    const dispatch = useDispatch();
    const $websocket = useRef(null);
    const $messageList = useRef(null);
    const {
        me,
        me: { accountId }
    } = useSelector(state => state.account);
    const { roomDetail } = useSelector(state => state.room);
    const { chatMessages } = useSelector(state => state.chat);
    const [clientConnected, setClientConnected] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [memberCount, setMemberCount] = useState(1);
    const [chatMemberLayerOpen, setChatMemberLayerOpen] = useState(false);

    useEffect(() => {
        dispatch({
            type: LOAD_MESSAGE_HISTORY_REQUEST,
            data: roomId
        });
    }, [dispatch, roomId]);

    useEffect(() => {
        const lastMessage = chatMessages[chatMessages.length - 1];
        setMemberCount(count => (lastMessage?.memberCount ? lastMessage.memberCount : count));
    }, [chatMessages, memberCount]);

    function scrollToBottom() {
        $messageList.current.scrollIntoView({
            block: "end",
            behavior: "smooth"
        });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleLayerOpen = useCallback(isOpen => {
        setChatMemberLayerOpen(isOpen);
    }, []);

    const sendMessage = useCallback(
        (message, type = sendType.talk) => {
            try {
                if (!message.length) return false;

                const send = {
                    roomId,
                    type,
                    sender: { ...me },
                    message
                };
                $websocket.current.sendMessage(`/pub/chat/message`, JSON.stringify(send));
                setInputMessage("");
                return true;
            } catch (e) {
                return false;
            }
        },
        [me, roomId]
    );

    const onMessageReceive = useCallback(
        message => {
            dispatch({
                type: ADD_CHAT_MESSAGE,
                data: message
            });
        },
        [dispatch]
    );

    return (
        <>
            <SEO title="채팅" />
            {chatMemberLayerOpen && <ChatMember setLayerOpen={handleLayerOpen} roomId={roomId} />}

            <CardWrap
                pageHeader={{
                    title: roomDetail && roomDetail.name,
                    backUrl: `/room/${roomId}`,
                    extra: clientConnected ? (
                        <Button onClick={handleLayerOpen.bind(null, true)}>
                            <UserOutlined />
                            {`${memberCount}명 참여중`}
                        </Button>
                    ) : (
                        <Badge status="error" text="Disconnected" />
                    )
                }}
            >
                <SockJsClient
                    url={`${SERVER_URI}/chatting`}
                    headers={header()}
                    subscribeHeaders={header()}
                    topics={[`/sub/chat/room/${roomId}`]}
                    onMessage={onMessageReceive}
                    onConnect={setClientConnected.bind(null, true)}
                    onDisconnect={setClientConnected.bind(null, false)}
                    ref={$websocket}
                    debug
                />

                <ChatMessageWrap>
                    {chatMessages.map((message, i) => (
                        <ChatMessage key={i} isSelfMessage={accountId === message.sender?.accountId} {...message} />
                    ))}
                    <span ref={$messageList} />
                </ChatMessageWrap>

                <ChatInputWrap>
                    <Search
                        placeholder="채팅을 입력해주세요."
                        enterButton={<SendOutlined />}
                        size="large"
                        value={inputMessage}
                        onChange={e => {
                            setInputMessage(e.target.value);
                        }}
                        onSearch={sendMessage.bind(null, inputMessage, sendType.talk)}
                    />
                </ChatInputWrap>
            </CardWrap>
        </>
    );
};

export default Chatting;

const ChatMessageWrap = styled.div`
    overflow-y: scroll;
    height: 40rem;
`;

const ChatInputWrap = styled.div`
    margin-top: 30px;
`;

import React, {useCallback, useEffect, useRef, useState} from "react";
import SockJsClient from 'react-stomp';
import styled from "styled-components";
import { TalkBox } from "react-talk";
import CardWrap from "../components/Layout/Main/Card";
import { ChatFeed, Message } from 'react-chat-ui'
import {SERVER_URI} from 'constants/index';
import {header} from 'utils/HttpHandler';
import { Input, Badge } from 'antd';
import {useSelector} from "react-redux";
import ChatMessage from "components/ChatMessage";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";


const sendType = {
    enter: "ENTER",
    quit : "QUIT",
    talk : "TALK"
}

const Chatting = (props) => {
    const roomId = props.match.params.id;
    const $websocket = useRef (null);
    const { me, me : {accountId, name} } = useSelector(state => state.account);
    const { roomDetail } = useSelector(state => state.room);
    const [clientConnected, setClientConnected] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [messages, setMessages] = useState([]);



    const sendMessage = useCallback((message, type = sendType.talk) => {
        try {
            if(message.length > 0) {
                const send = {
                    roomId,
                    messageType : type,
                    sender : {...me},
                    message
                }
                $websocket.current.sendMessage(`/pub/chat/message`, JSON.stringify(send));
                setInputMessage('');
                return true;
            }
        }catch (e) {
            return false;
        }

    }, []);


    const onMessageReceive = useCallback(msg => {
        setMessages(messages.concat({
            ...msg
        }))
    }, [messages])


    return (
        <CardWrap pageHeader={{title : roomDetail && roomDetail.name,
                              backUrl : `/room/${roomId}`,
                              subTitle : (clientConnected ? <Badge status='success' text='Connected'/> : <Badge status='error' text='Error'/>)
        }}
        >
            <SockJsClient url={`${SERVER_URI}/chatting`}
                          headers={header()}
                          subscribeHeaders={header()}
                          topics={[`/sub/chat/room/${roomId}`]}
                          onMessage={onMessageReceive}
                          onConnect={() => {setClientConnected(true)}}
                          onDisconnect={() => {setClientConnected(false)}}
                          ref={$websocket}
                          debug={true}
            />

            <ChatMessageWrap>
                {messages.map(msg =>
                    <ChatMessage {...msg} isSelfMessage={accountId===msg.sender.accountId}/>
                )}
            </ChatMessageWrap>

            <ChatInputWrap>
                <Input placeholder="채팅을 입력해주세요."
                       value={inputMessage}
                       onChange={e => {setInputMessage(e.target.value)}}
                       onPressEnter={() => sendMessage(inputMessage, sendType.talk)}
                />
            </ChatInputWrap>
        </CardWrap>
    )
}

export default Chatting;

const ChatMessageWrap = styled.div`
    overflow-y: scroll;
    height: 40rem;
`

const ChatInputWrap = styled.div`
    margin-top : 30px;
`
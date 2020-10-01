import React from "react";
import styled, { css } from "styled-components";
import Avater from "./Avatar";
import {timeForToday} from 'utils/Date';

const senderType = {
    bot : "BOT",
    member : "MEMBER",
}

const ChatMessage = ({sender, message, isSelfMessage, senderType, timestamp}) => {
    if(senderType === "BOT") {
        return (
            <BotMessageWrap>{message}</BotMessageWrap>
        )
    }

    if(!isSelfMessage) {
        return (
            <ChatMessageWrap position='right'>
                <MyBubbleWrap>
                    <DateWrap>
                    {timeForToday(timestamp)}
                    </DateWrap>
                    <MyBubble>
                        {message}
                    </MyBubble>
                </MyBubbleWrap>
            </ChatMessageWrap>
        )
    }else {
        return (
            <ChatMessageWrap>
                <Avater user={sender} showName={false}/>
                <BubbleWrap>
                    <div style={{flex : '1'}}>
                        <NameWrap>
                            {sender.name}
                        </NameWrap>
                        <Bubble>
                            {message}
                        </Bubble>
                    </div>
                    <DateWrap>
                        {timeForToday(timestamp)}
                    </DateWrap>
                </BubbleWrap>

            </ChatMessageWrap>
        )
    }
}

export default ChatMessage;

const BotMessageWrap = styled.div`
    width: max-content;
    margin: 10px auto;
    background-color: var(--bg-gray);
    padding: 4px 10px;
    border-radius: 8px;
    font-size : .8rem;
    color : var(--primary-color);
`

const ChatMessageWrap = styled.div`
    margin : ${props => props.position === 'right' ? '15px 0 0 auto' : '15px 0'};
    display : flex;
    width: calc(50% - 20px);
`

const MyBubble = styled.div`
    margin-left: auto;
    display : inline-block;
    margin-right: 8px;
    padding: 6px 12px;
    border-radius: 8px 2px 8px 8px;
    color : #fff;
    background-color: var(--primary-color);
    flex : 1;
    margin-left: 8px;
`

const MyBubbleWrap = styled.div`
    display: inline-block;
    max-width: calc(50% - 20px);
    position : relative;
    top: -4px;
    margin-left: auto;
    display: flex;
    align-items: flex-end;
`

const BubbleWrap = styled.div`
    display: inline-block;
    position : relative;
    top: -4px;
    display: flex;
    align-items: flex-end;
`

const Bubble = styled.div`
    margin-right: 8px;
    padding: 6px 12px;
    border: 1px solid var(--border-gray);
    border-radius: 2px 8px 8px 8px;
    background-color: #fff;
`

const NameWrap = styled.span`
    display: block;
    margin-bottom : 2px;
    color : var(--font-color-gray);
`

const DateWrap = styled.span`
    font-size: .8rem;
    color : var(--font-color-gray);
`
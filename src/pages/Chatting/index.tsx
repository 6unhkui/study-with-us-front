import { ChatAPI } from "@/api/chat.api";
import { ChatMemberDTO, RecevieMessageDTO, SendMessageDTO } from "@/api/dto/chat.dto";
import ChatMessage from "@/components/ChatMessage";
import PageHeader from "@/components/PageHeader";
import Wrapper from "@/components/Wrapper";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import useModal from "@/hooks/useModal";
import { useMeFetch } from "@/hooks/useRedux";
import { useTypedSelector } from "@/store";
import { baseHeader } from "@/utils/axiosUtils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import ChatInput from "@/components/ChatInput";
import { Badge } from "antd";
import { Button } from "antd/lib/radio";
import { useDispatch } from "react-redux";
import { addChatMessage, getChatHistoryAsync } from "@/store/chat";
import Loading from "@/components/Loading";
import ChatMemeberListModal from "@/components/ChatMemeberListModal";
import SEO from "@/components/SEO";
import styles from "./Chatting.module.less";

interface ChattingPageProps {}

const ChattingPage: React.FC<ChattingPageProps> = () => {
    const intId = useGetIntIdFromUrl();
    const { data: room } = useTypedSelector(state => state.room.room);
    const { data: me } = useMeFetch();
    const { data: chatMessages, loading } = useTypedSelector(state => state.chat.history);
    const { onClose: onDisconnect, onOpen: onConnect, visible: isConnected } = useModal();
    const { onClose, onOpen, visible } = useModal();
    const [numberOfConnected, setNumberOfConnected] = useState<number>(0);

    const $websocket = useRef<unknown>(null);
    const $bottomOfMessageArea = useRef<HTMLSpanElement>(null);
    const dispatch = useDispatch();

    const scrollToBottom = useCallback(() => {
        $bottomOfMessageArea.current?.scrollIntoView({
            block: "end",
            behavior: "smooth"
        });
    }, []);

    useEffect(() => {
        dispatch(getChatHistoryAsync.request(intId));
    }, [intId, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, scrollToBottom]);

    useEffect(() => {
        if (chatMessages) {
            const lastMessage = chatMessages[chatMessages.length - 1];
            if (lastMessage?.memberCount) {
                setNumberOfConnected(lastMessage.memberCount);
            }
        }
    }, [chatMessages]);

    const sendMessage = useCallback(
        (value: string) => {
            if (value.length === 0) return;

            const message: SendMessageDTO = {
                roomId: intId,
                type: "TALK",
                sender: me as ChatMemberDTO,
                message: value
            };

            ($websocket.current as { sendMessage(v: string, s: string): void }).sendMessage(
                ChatAPI.endpointToPublish,
                JSON.stringify(message)
            );
        },
        [intId, me]
    );

    const receiveMessage = useCallback(
        (message: RecevieMessageDTO) => {
            dispatch(addChatMessage(message));
        },
        [dispatch]
    );

    return (
        <Wrapper type="card" size="full">
            <SEO title="채팅" />
            <ChatMemeberListModal roomId={intId} visible={visible} onClose={onClose} />

            <PageHeader
                groupName={room?.name}
                name="채팅"
                extra={
                    isConnected ? (
                        <Button onClick={onOpen}>{numberOfConnected}명 참여중</Button>
                    ) : (
                        <Badge status="error" text="Disconnected" />
                    )
                }
            />

            <SockJsClient
                url={ChatAPI.handshakeUrl}
                headers={baseHeader()}
                subscribeHeaders={baseHeader()}
                topics={[ChatAPI.topicToSubscribe(intId)]}
                onMessage={receiveMessage}
                onConnect={onConnect}
                onDisconnect={onDisconnect}
                ref={$websocket}
                debug
            />

            <div className={styles.messageWrapper}>
                <div className={styles.messageContainer}>
                    {loading || !chatMessages ? (
                        <Loading type="component" />
                    ) : (
                        chatMessages.map(message => (
                            <ChatMessage
                                key={message.timestamp}
                                isSender={message.sender?.accountId === me?.accountId}
                                {...message}
                            />
                        ))
                    )}
                    <span ref={$bottomOfMessageArea} />
                </div>
            </div>

            <ChatInput onSubmit={sendMessage} />
        </Wrapper>
    );
};

export default ChattingPage;

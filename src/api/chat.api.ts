import { fetcher } from "@/utils/axiosUtils";
import { ChatMemberDTO, RecevieMessageDTO } from "@/api/dto/chat.dto";

export class ChatAPI {
    public static endpointToPublish = "/pub/chat/message";

    public static topicToSubscribe = (roomId: number): string => `/sub/chat/room/${roomId}`;

    public static handshakeUrl = `${process.env.REACT_APP_API_SERVER_URI}/chatting`;

    public static async getHistory(roomId: number): Promise<RecevieMessageDTO[]> {
        return fetcher<RecevieMessageDTO[]>({ url: `/api/v1/chat/${roomId}/history` });
    }

    public static async getCurrentChatMembers(roomId: number): Promise<ChatMemberDTO[]> {
        return fetcher<ChatMemberDTO[]>({ url: `/api/v1/chat/${roomId}/members` });
    }
}

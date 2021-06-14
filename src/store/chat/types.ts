import { ChatMemberDTO, RecevieMessageDTO } from "@/api/dto/chat.dto";
import { AsyncState } from "@/utils/reducerUtils";
import { ActionType } from "typesafe-actions";
import { getChatHistoryAsync, addChatMessage, getCurrentChatMemeberListAsync } from "./actions";

export type ChatAction = ActionType<typeof getChatHistoryAsync | typeof getCurrentChatMemeberListAsync | typeof addChatMessage>;

export interface ChatState {
    history: AsyncState<RecevieMessageDTO[]>;
    chatMemberList: AsyncState<ChatMemberDTO[]>;
}

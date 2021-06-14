export type MessageType = "ENTER" | "QUIT" | "TALK";

export interface RecevieMessageDTO {
    roomId: number;
    type: MessageType;
    sender: ChatMemberDTO;
    message: string;
    memberCount?: number;
    timestamp: string;
}

export interface SendMessageDTO {
    roomId: number;
    type: MessageType;
    sender: ChatMemberDTO;
    message: string;
}

export interface ChatMemberDTO {
    accountId: number;
    name: string;
    profileImg?: string;
    email: string;
}

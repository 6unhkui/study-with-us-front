import { RoomDetailDTO, RoomDTO } from "@/api/dto/room.dto";
import { AsyncState } from "@/utils/reducerUtils";
import { ActionType } from "typesafe-actions";
import {
    getPopularRoomListAsync,
    getLatestRoomListAsync,
    getMyRoomListAsync,
    getRoomAsync,
    createRoomAsync,
    updateRoomAsync,
    deleteRoomAsync,
    joinRoomAsync,
    leaveRoomAsync,
    getRoomListAsync,
    changeCategoryAsync,
    decreaseMemberCount,
    changeCoverImageAsync
} from "./actions";

export type RoomAction = ActionType<
    | typeof getPopularRoomListAsync
    | typeof getLatestRoomListAsync
    | typeof getRoomListAsync
    | typeof getMyRoomListAsync
    | typeof getRoomAsync
    | typeof createRoomAsync
    | typeof updateRoomAsync
    | typeof deleteRoomAsync
    | typeof joinRoomAsync
    | typeof leaveRoomAsync
    | typeof changeCategoryAsync
    | typeof changeCoverImageAsync
    | typeof decreaseMemberCount
>;

export interface RoomState {
    popularRoomList: AsyncState<RoomDTO[]>;
    latestRoomList: AsyncState<RoomDTO[]>;
    roomList: AsyncState<RoomDTO[]> & { hasMore: boolean };
    myRoomList: AsyncState<RoomDTO[]> & { hasMore: boolean };
    room: AsyncState<RoomDetailDTO>;
    createRoom: AsyncState<boolean>;
    updateRoom: AsyncState<boolean>;
    deleteRoom: AsyncState<boolean>;
    joinRoom: AsyncState<boolean>;
    leaveRoom: AsyncState<boolean>;
    changeCategory: AsyncState<boolean>;
    changeCoverImage: AsyncState<boolean>;
}

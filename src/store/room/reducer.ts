import { asyncStateInit } from "@/utils/reducerUtils";
import { createReducer } from "typesafe-actions";
import produce from "immer";
import { RoomDetailDTO, RoomDTO, UpdateRoomDTO } from "@/api/dto/room.dto";
import { PageResponseDTO } from "@/api/dto/common.dto";
import { MemberDTO } from "@/api/dto/member.dto";
import { CategoryDTO } from "@/api/dto/category.dto";
import { FileDTO, FileGroupDTO } from "@/api/dto/file.dto";
import { RoomAction, RoomState } from "./types";
import {
    GET_POPULAR_ROOM_LIST,
    GET_LATEST_ROOM_LIST,
    GET_MY_ROOM_LIST,
    GET_ROOM,
    CREATE_ROOM,
    JOIN_ROOM,
    GET_ROOM_LIST,
    DECREASE_MEMBER_COUNT,
    CHANGE_MANAGER,
    CHANGE_CATEGORY,
    UPDATE_ROOM,
    CHANGE_COVER_IMAGE,
    DELETE_ROOM,
    LEAVE_ROOM
} from "./actions";

const initalState: RoomState = {
    popularRoomList: asyncStateInit,
    latestRoomList: asyncStateInit,
    roomList: { ...asyncStateInit, hasMore: false },
    myRoomList: { ...asyncStateInit, hasMore: false },
    room: asyncStateInit,
    createRoom: asyncStateInit,
    updateRoom: asyncStateInit,
    deleteRoom: asyncStateInit,
    joinRoom: asyncStateInit,
    leaveRoom: asyncStateInit,
    changeCategory: asyncStateInit,
    changeCoverImage: asyncStateInit
};

const roomReducer = createReducer<RoomState, RoomAction>(initalState, {
    [GET_POPULAR_ROOM_LIST.REQUEST]: produce(({ popularRoomList: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_POPULAR_ROOM_LIST.SUCCESS]: produce(({ popularRoomList: state }, action) => {
        state.loading = false;
        state.data = (action.payload as PageResponseDTO<RoomDTO[]>).content;
        state.error = null;
    }),
    [GET_POPULAR_ROOM_LIST.FAILURE]: produce(({ popularRoomList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_LATEST_ROOM_LIST.REQUEST]: produce(({ latestRoomList: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_LATEST_ROOM_LIST.SUCCESS]: produce(({ latestRoomList: state }, action) => {
        state.loading = false;
        state.data = (action.payload as PageResponseDTO<RoomDTO[]>).content;
        state.error = null;
    }),
    [GET_LATEST_ROOM_LIST.FAILURE]: produce(({ latestRoomList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_ROOM_LIST.REQUEST]: produce(({ roomList: state }) => {
        state.loading = true;
        state.data = state.hasMore ? state.data : [];
        state.error = null;
        state.hasMore = false;
    }),
    [GET_ROOM_LIST.SUCCESS]: produce(({ roomList: state }, action) => {
        const payload = action.payload as PageResponseDTO<RoomDTO[]>;
        state.loading = false;
        if (payload.first) {
            state.data = payload.content;
        } else {
            payload.content.forEach(item => {
                state.data?.push(item);
            });
        }
        state.error = null;
        state.hasMore = !payload.last;
    }),
    [GET_ROOM_LIST.FAILURE]: produce(({ roomList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.hasMore = false;
    }),
    [GET_MY_ROOM_LIST.REQUEST]: produce(({ myRoomList: state }) => {
        state.loading = true;
        state.data = state.hasMore ? state.data : [];
        state.error = null;
        state.hasMore = false;
    }),
    [GET_MY_ROOM_LIST.SUCCESS]: produce(({ myRoomList: state }, action) => {
        const payload = action.payload as PageResponseDTO<RoomDTO[]>;
        state.loading = false;
        if (payload.first) {
            state.data = payload.content;
        } else {
            payload.content.forEach(item => {
                state.data?.push(item);
            });
        }
        state.error = null;
        state.hasMore = !payload.last;
    }),
    [GET_MY_ROOM_LIST.FAILURE]: produce(({ myRoomList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.hasMore = false;
    }),
    [GET_ROOM.REQUEST]: produce(({ room: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_ROOM.SUCCESS]: produce(({ room: state }, action) => {
        state.loading = false;
        state.data = action.payload as RoomDetailDTO;
        state.error = null;
    }),
    [GET_ROOM.FAILURE]: produce(({ room: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_ROOM.RESET]: produce(({ room: state }) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [CREATE_ROOM.REQUEST]: produce(({ createRoom: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CREATE_ROOM.SUCCESS]: produce(({ createRoom: state }, action) => {
        state.loading = false;
        state.data = action.payload as boolean;
        state.error = null;
    }),
    [CREATE_ROOM.FAILURE]: produce(({ createRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [CREATE_ROOM.RESET]: produce(({ createRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [JOIN_ROOM.REQUEST]: produce(({ joinRoom: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [JOIN_ROOM.SUCCESS]: produce(({ joinRoom: state, room }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        room.data = {
            ...room.data,
            isMember: true,
            joinCount: (room.data as RoomDetailDTO).joinCount + 1
        } as RoomDetailDTO;
    }),
    [JOIN_ROOM.FAILURE]: produce(({ joinRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [CHANGE_MANAGER]: produce(({ room: state }, action) => {
        if (state.data) {
            state.data.isManager = false;
            state.data.manager = action.payload as MemberDTO;
        }
    }),
    [CHANGE_CATEGORY.REQUEST]: produce(({ changeCategory: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_CATEGORY.SUCCESS]: produce(({ changeCategory: state, room }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        const payload = action.payload as CategoryDTO;
        room.data = {
            ...room.data,
            category: payload.name,
            categoryId: payload.categoryId
        } as RoomDetailDTO;
    }),
    [CHANGE_CATEGORY.FAILURE]: produce(({ changeCategory: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [UPDATE_ROOM.REQUEST]: produce(({ updateRoom: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [UPDATE_ROOM.SUCCESS]: produce(({ updateRoom: state, room }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        const payload = action.payload as UpdateRoomDTO;
        room.data = {
            ...room.data,
            ...payload
        } as RoomDetailDTO;
    }),
    [UPDATE_ROOM.FAILURE]: produce(({ updateRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [UPDATE_ROOM.RESET]: produce(({ updateRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_COVER_IMAGE.REQUEST]: produce(({ changeCoverImage: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_COVER_IMAGE.SUCCESS]: produce(({ changeCoverImage: state, room }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        const { fileGroupId, files } = action.payload as FileGroupDTO;
        room.data = {
            ...room.data,
            coverImage: files[0].saveName,
            coverGroupId: fileGroupId
        } as RoomDetailDTO;
    }),
    [CHANGE_COVER_IMAGE.FAILURE]: produce(({ changeCoverImage: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [DELETE_ROOM.REQUEST]: produce(({ deleteRoom: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [DELETE_ROOM.SUCCESS]: produce(({ deleteRoom: state, room, roomList }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        const roomId = action.payload as number;
        room.data = null;
        roomList.data = roomList.data?.filter(v => v.roomId !== roomId) as RoomDTO[];
    }),
    [DELETE_ROOM.FAILURE]: produce(({ deleteRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [LEAVE_ROOM.REQUEST]: produce(({ leaveRoom: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [LEAVE_ROOM.SUCCESS]: produce(({ leaveRoom: state, room, roomList }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        if (room.data) {
            room.data.joinCount -= 1;
            room.data.isMember = false;
        }
        if (roomList.data) {
            roomList.data = roomList.data?.map(v => (v.roomId !== action.payload ? v : { ...v, joinCount: v.joinCount - 1 }));
        }
    }),
    [LEAVE_ROOM.FAILURE]: produce(({ leaveRoom: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [DECREASE_MEMBER_COUNT]: produce(({ room }, action) => {
        if (room.data) {
            room.data = {
                ...room.data,
                joinCount: (room.data as RoomDetailDTO).joinCount - 1
            };
        }
    })
});

export default roomReducer;

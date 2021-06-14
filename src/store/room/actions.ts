import { CategoryDTO } from "@/api/dto/category.dto";
import { PageResponseDTO } from "@/api/dto/common.dto";
import { FileDTO, FileGroupDTO, UploadFileByGroupIdDTO } from "@/api/dto/file.dto";
import { MemberDTO } from "@/api/dto/member.dto";
import {
    SearchRoomsByPageDTO,
    RoomDetailDTO,
    RoomDTO,
    CreateRoomDTO,
    UpdateRoomDTO,
    ChangeCategoryIdDTO
} from "@/api/dto/room.dto";
import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { AxiosError } from "axios";
import { createAction } from "typesafe-actions";

// ---
// Action Type
const prefix = "room";
export const GET_POPULAR_ROOM_LIST = createAsyncActionType(`${prefix}/GET_POPULAR_ROOM_LIST`);
export const GET_LATEST_ROOM_LIST = createAsyncActionType(`${prefix}/GET_LATEST_ROOM_LIST`);
export const GET_ROOM_LIST = createAsyncActionType(`${prefix}/GET_ROOM_LIST`);
export const GET_MY_ROOM_LIST = createAsyncActionType(`${prefix}/GET_MY_ROOM_LIST`);
export const GET_ROOM = createAsyncActionType(`${prefix}/GET_ROOM`);
export const CREATE_ROOM = createAsyncActionType(`${prefix}/CREATE_ROOM`);
export const UPDATE_ROOM = createAsyncActionType(`${prefix}/UPDATE_ROOM`);
export const DELETE_ROOM = createAsyncActionType(`${prefix}/DELETE_ROOM`);
export const JOIN_ROOM = createAsyncActionType(`${prefix}/JOIN`);
export const LEAVE_ROOM = createAsyncActionType(`${prefix}/LEAVE_ROOM`);
export const CHANGE_MANAGER = `${prefix}/CHANGE_MANAGER` as const;
export const CHANGE_CATEGORY = createAsyncActionType(`${prefix}/CHANGE_CATEGORY`);
export const CHANGE_COVER_IMAGE = createAsyncActionType(`${prefix}/CHANGE_COVER_IMAGE`);
export const DECREASE_MEMBER_COUNT = `${prefix}/DECREASE_MEMBER_COUNT` as const;

// ---
// Action Creator
export const getPopularRoomListAsync =
    createActionEntity<SearchRoomsByPageDTO, PageResponseDTO<RoomDTO[]>, AxiosError>(GET_POPULAR_ROOM_LIST);
export const getLatestRoomListAsync =
    createActionEntity<SearchRoomsByPageDTO, PageResponseDTO<RoomDTO[]>, AxiosError>(GET_LATEST_ROOM_LIST);
export const getRoomListAsync = createActionEntity<SearchRoomsByPageDTO, PageResponseDTO<RoomDTO[]>, AxiosError>(GET_ROOM_LIST);
export const getMyRoomListAsync =
    createActionEntity<SearchRoomsByPageDTO, PageResponseDTO<RoomDTO[]>, AxiosError>(GET_MY_ROOM_LIST);
export const getRoomAsync = createActionEntity<number, RoomDetailDTO, AxiosError, any>(GET_ROOM);
export const createRoomAsync = createActionEntity<CreateRoomDTO, boolean, AxiosError, any>(CREATE_ROOM);
export const updateRoomAsync = createActionEntity<UpdateRoomDTO, UpdateRoomDTO, AxiosError, any>(UPDATE_ROOM);
export const deleteRoomAsync = createActionEntity<number, number, AxiosError>(DELETE_ROOM);
export const joinRoomAsync = createActionEntity<number, boolean, AxiosError>(JOIN_ROOM);
export const leaveRoomAsync = createActionEntity<number, number, AxiosError>(LEAVE_ROOM);
export const changeManager = createAction(CHANGE_MANAGER)<MemberDTO>();
export const changeCategoryAsync = createActionEntity<ChangeCategoryIdDTO, CategoryDTO, AxiosError>(CHANGE_CATEGORY);
export const changeCoverImageAsync =
    createActionEntity<UploadFileByGroupIdDTO & { roomId: number }, FileGroupDTO, AxiosError>(CHANGE_COVER_IMAGE);
export const decreaseMemberCount = createAction(DECREASE_MEMBER_COUNT)<any>();

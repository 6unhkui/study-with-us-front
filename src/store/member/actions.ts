import { PageResponseDTO } from "@/api/dto/common.dto";
import { ChangeManagerDTO, MemberDetailDTO, MemberDTO, SearchMembersByPageDTO } from "@/api/dto/member.dto";
import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { AxiosError } from "axios";

// ---
// Action Type
const prefix = "member";
export const GET_MEMBER_LIST = createAsyncActionType(`${prefix}/GET_MEMBER_LIST`);
export const GET_MEMBER = createAsyncActionType(`${prefix}/GET_MEMBER`);
export const GET_MY_INFO = createAsyncActionType(`${prefix}/GET_MY_INFO`);
export const DELETE_MEMBER = createAsyncActionType(`${prefix}/DELETE_MEMBER`);
export const CHANGE_MANAGER = createAsyncActionType(`${prefix}/CHANGE_MANAGER`);

// ---
// Action Creator
export const getMemberListAsync =
    createActionEntity<SearchMembersByPageDTO, PageResponseDTO<MemberDTO[]>, AxiosError>(GET_MEMBER_LIST);
export const getMemberAsync = createActionEntity<number, MemberDetailDTO, AxiosError>(GET_MEMBER);
export const getMyInfoAsync = createActionEntity<number, MemberDetailDTO, AxiosError>(GET_MY_INFO);
export const deleteMemberAsync = createActionEntity<number, number, AxiosError>(DELETE_MEMBER);
export const changeManagerAsync = createActionEntity<ChangeManagerDTO & MemberDTO, number, AxiosError>(CHANGE_MANAGER);

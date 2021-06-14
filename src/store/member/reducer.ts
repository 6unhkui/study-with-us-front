import { PageResponseDTO } from "@/api/dto/common.dto";
import { MemberDetailDTO, MemberDTO } from "@/api/dto/member.dto";
import { asyncStateInit } from "@/utils/reducerUtils";
import produce from "immer";
import { createReducer } from "typesafe-actions";
import { DELETE_MEMBER, GET_MEMBER, GET_MEMBER_LIST, CHANGE_MANAGER, GET_MY_INFO } from "./actions";
import { MemberAction, MemberState } from "./types";

const initalState: MemberState = {
    memberList: { ...asyncStateInit, hasMore: false },
    member: asyncStateInit,
    myInfo: asyncStateInit,
    deleteMemeber: asyncStateInit,
    changeManager: asyncStateInit
};

const memberReducer = createReducer<MemberState, MemberAction>(initalState, {
    [GET_MEMBER_LIST.REQUEST]: produce(({ memberList: state }) => {
        state.loading = true;
        state.data = state.hasMore ? state.data : [];
        state.error = null;
        state.hasMore = false;
    }),
    [GET_MEMBER_LIST.SUCCESS]: produce(({ memberList: state }, action) => {
        const payload = action.payload as PageResponseDTO<MemberDTO[]>;
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
    [GET_MEMBER_LIST.FAILURE]: produce(({ memberList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.hasMore = false;
    }),
    [GET_MEMBER.REQUEST]: produce(({ member: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_MEMBER.SUCCESS]: produce(({ member: state }, action) => {
        state.loading = false;
        state.data = action.payload as MemberDetailDTO;
        state.error = null;
    }),
    [GET_MEMBER.FAILURE]: produce(({ member: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_MY_INFO.REQUEST]: produce(({ myInfo: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_MY_INFO.SUCCESS]: produce(({ myInfo: state }, action) => {
        state.loading = false;
        state.data = action.payload as MemberDetailDTO;
        state.error = null;
    }),
    [GET_MY_INFO.FAILURE]: produce(({ myInfo: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [DELETE_MEMBER.REQUEST]: produce(({ deleteMemeber: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [DELETE_MEMBER.SUCCESS]: produce(({ deleteMemeber, member, memberList }, action) => {
        deleteMemeber.loading = false;
        deleteMemeber.data = true;
        deleteMemeber.error = null;

        member.data = null;
        memberList.data = memberList.data?.filter(({ memberId }) => memberId !== action.payload) as MemberDTO[];
    }),
    [DELETE_MEMBER.FAILURE]: produce(({ deleteMemeber: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [CHANGE_MANAGER.REQUEST]: produce(({ changeManager: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_MANAGER.SUCCESS]: produce(({ changeManager, memberList, myInfo }, action) => {
        changeManager.loading = false;
        changeManager.data = true;
        changeManager.error = null;

        memberList.data = memberList.data?.map((member: MemberDTO) => {
            if (member.memberId === action.payload) {
                return {
                    ...member,
                    role: "MANAGER"
                };
            }

            return {
                ...member,
                role: "MATE"
            };
        }) as MemberDTO[];
        myInfo.data ? (myInfo.data.role = "MATE") : null;
    }),
    [CHANGE_MANAGER.FAILURE]: produce(({ changeManager: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    })
});

export default memberReducer;

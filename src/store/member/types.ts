import { MemberDetailDTO, MemberDTO } from "@/api/dto/member.dto";
import { AsyncState } from "@/utils/reducerUtils";
import { ActionType } from "typesafe-actions";
import { getMemberListAsync, getMemberAsync, getMyInfoAsync, deleteMemberAsync, changeManagerAsync } from "./actions";

export type MemberAction = ActionType<
    | typeof getMemberListAsync
    | typeof getMemberAsync
    | typeof getMyInfoAsync
    | typeof deleteMemberAsync
    | typeof changeManagerAsync
>;

export interface MemberState {
    memberList: AsyncState<MemberDTO[]> & { hasMore: boolean };
    member: AsyncState<MemberDetailDTO>;
    myInfo: AsyncState<MemberDetailDTO>;
    deleteMemeber: AsyncState<boolean>;
    changeManager: AsyncState<boolean>;
}

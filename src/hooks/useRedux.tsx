import { SearchMembersByPageDTO } from "@/api/dto/member.dto";
import { useTypedSelector } from "@/store";
import { meAsync } from "@/store/account";
import { getCategoryListAsync } from "@/store/category";
import { getMemberListAsync } from "@/store/member";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useMeFetch() {
    const dispatch = useDispatch();
    const me = useTypedSelector(state => state.account.me);

    const fetch = useCallback(() => {
        dispatch(meAsync.request(""));
    }, [dispatch]);

    return {
        ...me,
        fetch
    };
}

export function useCategoryListFetch() {
    const dispatch = useDispatch();
    const categoryList = useTypedSelector(state => state.category.categoryList);

    const fetch = useCallback(() => {
        dispatch(getCategoryListAsync.request(""));
    }, [dispatch]);

    return {
        ...categoryList,
        fetch
    };
}

export function useMemberListFetch() {
    const dispatch = useDispatch();
    const memberList = useTypedSelector(state => state.member.memberList);

    const fetch = useCallback(
        (payload: SearchMembersByPageDTO) => {
            dispatch(getMemberListAsync.request(payload));
        },
        [dispatch]
    );

    return {
        ...memberList,
        fetch
    };
}

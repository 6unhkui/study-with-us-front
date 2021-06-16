import { MemberDTO, SearchMembersByPageDTO } from "@/api/dto/member.dto";
import { changeManagerAsync } from "@/store/member";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Modal, { ModalProps } from "@/components/Modal";
import { Button, Input, List, message, Radio } from "antd";
import Avatar from "@/components/Avatar";
import EmptyList from "@/components/EmptyList";
import useInput from "@/hooks/useInput";
import useRadio from "@/hooks/useRadio";
import { useMemberListFetch } from "@/hooks/useRedux";
import styles from "./ManagerChangeModal.module.less";

const initialParam: SearchMembersByPageDTO = { page: 1, size: 6, direction: "ASC" };

interface ManagerChangeModalProps extends ModalProps {
    roomId: number;
}

const ManagerChangeModal: React.FC<ManagerChangeModalProps> = ({ roomId, onClose, ...props }) => {
    const param = useRef<SearchMembersByPageDTO>({ ...initialParam, roomId });
    const { data: memberList, loading: loadingMemberList, hasMore, fetch: fetchMemberList } = useMemberListFetch();
    const { selected: selectedMember, onChange: changeSelectedMember } = useRadio("0");
    const { input, onChange } = useInput();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMemberList(param.current);
    }, [fetchMemberList]);

    const memberListWithoutMananger = useMemo(() => {
        return memberList?.filter(({ role }) => role !== "MANAGER");
    }, [memberList]);

    const onSubmit = useCallback(() => {
        const member = memberListWithoutMananger?.find(m => m.memberId === +selectedMember) as MemberDTO;
        if (!member) {
            message.error("멤버를 선택해주세요.");
            return;
        }

        dispatch(changeManagerAsync.request({ roomId, ...member }));
        onClose();
    }, [selectedMember, memberListWithoutMananger, dispatch, roomId, onClose]);

    const onSearch = useCallback(() => {
        param.current = { ...param.current, page: 1, keyword: input };
        fetchMemberList(param.current);
    }, [fetchMemberList, input]);

    const loadMore = useCallback(() => {
        if (hasMore) {
            param.current = { ...param.current, page: param.current.page + 1 };
            fetchMemberList(param.current);
        }
    }, [hasMore, fetchMemberList]);

    return (
        <Modal type="confirm" header="매니저 위임" size="regular" onClose={onClose} onOk={onSubmit} {...props}>
            <Input.Search enterButton="검색" value={input} onChange={onChange} onSearch={onSearch} className={styles.search} />
            <Radio.Group onChange={changeSelectedMember} className={styles.container}>
                <List
                    dataSource={memberListWithoutMananger}
                    locale={{ emptyText: <EmptyList /> }}
                    loading={loadingMemberList}
                    loadMore={
                        hasMore && (
                            <Button onClick={loadMore} className={styles.loadMore}>
                                더보기
                            </Button>
                        )
                    }
                    renderItem={item => (
                        <List.Item key={item.memberId}>
                            <Radio value={item.memberId}>
                                <div className={styles.avatar}>
                                    <Avatar profileImage={item.profileImg} name={item.name} />
                                    <span>{item.name}</span>
                                </div>
                            </Radio>
                        </List.Item>
                    )}
                />
            </Radio.Group>
        </Modal>
    );
};

export default React.memo(ManagerChangeModal);

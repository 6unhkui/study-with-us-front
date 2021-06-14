import { Button } from "antd";
import React, { useCallback, useState } from "react";
import Checkbox from "@/components/Checkbox";
import { useDispatch } from "react-redux";
import { withdrawAsync } from "@/store/account";
import styles from "./WithdrawMembership.module.less";

interface WithdrawMembershipProps {}

const WithdrawMembership: React.FC<WithdrawMembershipProps> = () => {
    const [checked, setChecked] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        if (checked) {
            dispatch(withdrawAsync.request(""));
        }
    }, [checked, dispatch]);

    return (
        <div className={styles.wrapper}>
            <p>스터디룸에 작성한 게시글은 식제되지 않습니다.</p>
            <p>삭제를 원한다면, 탈퇴 전에 삭제를 진행해주세요.</p>
            <br />
            <p>계정을 삭제하면 되돌릴 수 없습니다.</p>
            <p>동의 하십니까?</p>

            <Checkbox label="네, 동의합니다." value={checked} onChange={setChecked} className={styles.checkbox} />

            <div className={styles.button}>
                <Button disabled={!checked} type="primary" onClick={onSubmit}>
                    탈퇴하기
                </Button>
            </div>
        </div>
    );
};

export default WithdrawMembership;

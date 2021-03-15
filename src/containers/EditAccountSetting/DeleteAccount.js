import React, { useState, useCallback } from "react";
import { ACCESS_TOKEN } from "constants/index";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { DELETE_ACCOUNT_REQUEST } from "store/modules/account";

const DeleteAccount = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const handleDeleteAccount = useCallback(() => {
        if (checked) {
            dispatch({
                type: DELETE_ACCOUNT_REQUEST,
                meta: {
                    callbackAction: () => {
                        localStorage.removeItem(ACCESS_TOKEN);
                        props.history.push("/");
                    }
                }
            });
        }
    }, [checked, dispatch]);

    return (
        <>
            <div>{t("mypage.editAccountSettings.deleteAccountWarning")}</div>
            <CheckBoxWrap>
                <Checkbox
                    onChange={e => {
                        setChecked(e.target.checked);
                    }}
                >
                    {t("mypage.editAccountSettings.deleteAccountConfirm")}
                </Checkbox>
            </CheckBoxWrap>
            <Button
                type="primary"
                danger
                style={{ marginTop: "2rem" }}
                onClick={handleDeleteAccount}
                className="shadow"
                disabled={!checked}
            >
                {t("mypage.editAccountSettings.deleteAccount")}
            </Button>
        </>
    );
};

export default DeleteAccount;

const CheckBoxWrap = styled.div`
    margin-top: 1rem;
`;

import React, {useState, useCallback} from 'react';
import {ACCESS_TOKEN} from 'constants/index';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {Button, Checkbox, message} from 'antd';

import {useDispatch} from "react-redux";
import {DELETE_ACCOUNT_REQUEST} from "store/modules/account";


const DeleteAccount = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [confirm, setConfirm] = useState(false);

    const handleDeleteAccount = useCallback (() => {
        if(confirm) {
            dispatch({
                type : DELETE_ACCOUNT_REQUEST,
                meta : {
                    callbackAction : () => {
                        localStorage.removeItem(ACCESS_TOKEN);
                        props.history.push("/");
                    }
                }
            })
        }
    }, [confirm]);

    return (
        <>
            <div>{t('mypage.editAccountSettings.deleteAccountWarning')}</div>
            <CheckBoxWrap>
                <Checkbox onChange={(e) => {setConfirm(e.target.checked)}}>
                    {t('mypage.editAccountSettings.deleteAccountConfirm')}
                </Checkbox>
            </CheckBoxWrap>
            <Button type="primary" danger style={{marginTop : '2rem'}} onClick={handleDeleteAccount} className="shadow">
                {t('mypage.editAccountSettings.deleteAccount')}
            </Button>
        </>
    )
}

export default DeleteAccount;

const CheckBoxWrap = styled.div`
    margin-top : 1rem;
`
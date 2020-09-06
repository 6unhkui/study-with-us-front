import React, {useState} from 'react';
import {ACCESS_TOKEN, request} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, Checkbox} from 'antd';


const DeleteAccount = (props) => {
    const { t } = useTranslation();

    const [confirm, setConfirm] = useState(false);

    const handleDeleteAccount = () => {
        if(confirm) {
            request().delete('/api/v1/user')
            .then(response => {
                localStorage.removeItem(ACCESS_TOKEN);
                props.history.push("/");
            })
        }
    }

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
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, Typography, Checkbox} from 'antd';

const { Text } = Typography;

const DeleteAccount = () => {
    const { t } = useTranslation();

    const [confirm, setConfirm] = useState(false);

    const handleDeleteAccount = () => {
        if(confirm) {
            alert("계정을 삭제합니다.")
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
            <Button type="primary" danger style={{marginTop : '2rem'}} onClick={handleDeleteAccount}>
                {t('mypage.editAccountSettings.deleteAccount')}
            </Button>
        </>
    )
}

export default DeleteAccount;

const CheckBoxWrap = styled.div`
    margin-top : 1rem;
`
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import RegisterForm from 'containers/Register/RegisterForm';
import Success from 'containers/Register/Success';

import CardWrap from "components/CardBox";

export default function RegisterPage() {
    const { t } = useTranslation();
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({name : ''});

    return (
        <CardWrap title={t('auth.createAccount')} size={'small'}>
            {success ?
                <Success user={user}/> :
                <RegisterForm success={{setSuccess}} user={{setUser}}/>}
        </CardWrap>
    )
}
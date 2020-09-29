import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import RegisterForm from './Sections/RegisterForm';
import Success from './Sections/Success';

import CardWrap from "../../components/Layout/Main/Card";

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
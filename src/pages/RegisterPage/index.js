import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import RegisterForm from './Sections/RegisterForm';
import Success from './Sections/Success';

import { Typography, Card } from 'antd';

const { Title } = Typography;

export default function RegisterPage() {
    const { t } = useTranslation();
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({name : ''});

    return (
      <div className="bg-gray">
        <div className="container content-wrap">
          <div className="form-wrap">
            <Title>{t('auth.createAccount')}</Title>
            {success ? <Success user={user}/> : <RegisterForm success={{setSuccess}} user={{setUser}}/>}
          </div>
        </div>
      </div>
    )
}
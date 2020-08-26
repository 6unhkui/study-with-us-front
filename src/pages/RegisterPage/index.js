import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import RegisterForm from './Sections/RegisterForm';
import Success from './Sections/Success';

import { Typography } from 'antd';

const { Title } = Typography;

export default function RegisterPage() {
    const { t } = useTranslation();
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({name : ''});

    return (
      <ContainerWrap>
        <Title style={{textAlign : 'center'}}>{t('auth.signUp')}</Title>
        {success ? <Success user={user}/> : <RegisterForm success={{setSuccess}} user={{setUser}}/>}
      </ContainerWrap>
    )
}


const ContainerWrap = styled.div`
  max-width : 400px;
  padding-top : 6rem;
  margin : 0 auto;
`
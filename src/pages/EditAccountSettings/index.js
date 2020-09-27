import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';

import { Typography, Badge, Divider, Tabs} from 'antd';

import Loading from 'components/Loading';
import EditAccountInfo from './Sections/EditAccountInfo';
import ChangePassword from './Sections/ChangePassword';
import DeleteAccount from './Sections/DeleteAccount';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_ACCOUNT_REQUEST} from "store/modules/account";

const { Title } = Typography;
const { TabPane } = Tabs;

const EditAccountSettings = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.account);
    const [isSocialAccount, setIsSocialAccount] = useState(false);

    useEffect(() => {
        dispatch({
            type: LOAD_ACCOUNT_REQUEST,
        });
    },[dispatch]);

    useEffect(() => {
        setIsSocialAccount(me.provider !== "LOCAL");
    },[me.provider]);


    return (
      <>
        <Title>{t('mypage.editAccountSettings.title')}</Title>

          {isSocialAccount &&
            <div>
                <Badge count={me.provider}
                       style={{marginRight : '.4rem',
                               background :(me.provider === 'GOOGLE' ? 'var(--social-google)' : 'var(--social-naver)')}}/>
                {t('mypage.editAccountSettings.isSocialAccount')}
            </div>
          }

          <ContentWrap>
              <Tabs defaultActiveKey="1" style={{marginTop : '2.4rem'}}>
                  <TabPane tab={t('mypage.editAccountSettings.changeProfileInfo')} key="1" className="content">
                    <Title level={4}>{t('mypage.editAccountSettings.changeProfileInfo')}</Title>
                    <EditAccountInfo account={me}/>
                  </TabPane>

                  {!isSocialAccount && 
                    <TabPane tab={t('mypage.editAccountSettings.changePassword')} key="2" className="content">
                      <Title level={4}>{t('mypage.editAccountSettings.changePassword')}</Title>
                      <ChangePassword/>
                    </TabPane>
                  }

                  <TabPane tab={t('mypage.editAccountSettings.deleteAccount')} key="3" className="content">
                    <Title level={4}>{t('mypage.editAccountSettings.deleteAccount')}</Title> 
                    <DeleteAccount {...props}/>
                  </TabPane>
              </Tabs>
          </ContentWrap>
      </>
    )
}

export default EditAccountSettings;


const ContentWrap = styled.div`
  .content {
    margin-top : 1rem;
  }
`
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';

import { Typography, Badge, Divider, Tabs} from 'antd';

import Loading from 'components/Loading';
import EditAccountInfo from './Sections/EditAccountInfo';
import ChangePassword from './Sections/ChangePassword';
import DeleteAccount from './Sections/DeleteAccount';

const { Title } = Typography;
const { TabPane } = Tabs;

const EditAccountSettings = (props) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [isSocialAccount, setIsSocialAccount] = useState(false);
    const [provider, setProvider] = useState('');
    const [account, setAccount] = useState({});
    
    useEffect(()=>{
      _getAccountInfo();
    },[]);


    function _getAccountInfo() {
      http.get('/api/v1/account')
      .then(response => {
          const data = response.data.data;
          setAccount(data);
          setIsSocialAccount(data.provider !== "LOCAL");
          setProvider(data.provider);
          setLoading(false);
      })
    }

    return (
      <>
        <Title>{t('mypage.editAccountSettings.title')}</Title>
        
        {loading ? <Loading/> :
            <>
              {isSocialAccount 
                  && <div>
                        <Badge count={account.provider} 
                               style={{marginRight : '.4rem', background :(provider === 'GOOGLE' ? 'var(--social-google)' : 'var(--social-naver)')}}/>
                        {t('mypage.editAccountSettings.isSocialAccount')}
                    </div>
              }

              <ContentWrap>
                <Tabs defaultActiveKey="1" style={{marginTop : '2.4rem'}}>
                  <TabPane tab={t('mypage.editAccountSettings.changeProfileInfo')} key="1" className="content">
                    <Title level={4}>{t('mypage.editAccountSettings.changeProfileInfo')}</Title>
                    <EditAccountInfo account={account}/>
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
          }
      </>
    )
}

export default EditAccountSettings;


const ContentWrap = styled.div`
  .content {
    margin-top : 1rem;
  }
`
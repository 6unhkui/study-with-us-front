import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';

import {OAUTH_PROVIDER} from 'constants/index';
import { Typography, Badge, Divider, Tabs} from 'antd';

import Loading from 'components/Loading';
import ChangeProfileInfo from './Sections/ChangeProfileInfo';
import ChangePassword from './Sections/ChangePassword';
import DeleteAccount from './Sections/DeleteAccount';

const { Title } = Typography;
const { TabPane } = Tabs;

const EditAccountSettings = (props) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [isSocialAccount, setIsSocialAccount] = useState(false);
    const [socialBadgeColor, setSocialBadgeColor] = useState(OAUTH_PROVIDER["GOOGLE"].color);
    const [formData, setFormData] = useState({});
    
    useEffect(()=>{
        _callApi();
    },[]);

    function _callApi() {
      http.get('/api/v1/user')
      .then(response => {
          const data = response.data.data;
          setFormData(data);
          setLoading(false);
          setIsSocialAccount(data.provider !== "LOCAL");

          if(isSocialAccount) {
            setSocialBadgeColor(
              OAUTH_PROVIDER[`${data.provider}`].color
            );
          }
      })
    }

    return (
      <>
        <Title>{t('mypage.editAccountSettings.title')}</Title>
        
        {loading ? <Loading/> :
            <>
              {isSocialAccount 
                  && <div>
                        <Badge count={formData.provider} style={{backgroundColor : `${socialBadgeColor}`, marginRight : '.4rem'}}/>
                        {t('mypage.editAccountSettings.isSocialAccount')}
                    </div>
              }

              <ContentWrap>
              <Tabs defaultActiveKey="1" style={{marginTop : '2.4rem'}}>
                  <TabPane tab={t('mypage.editAccountSettings.changeProfileInfo')} key="1" className="content">
                    <Title level={4}>{t('mypage.editAccountSettings.changeProfileInfo')}</Title>
                    <ChangeProfileInfo formData={formData}/>
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
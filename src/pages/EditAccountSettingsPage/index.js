import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SERVER_URI, header} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import {provider} from "utils/OAuth2Provider";
import { Typography, Badge, Divider, Tabs} from 'antd';

import Loading from 'components/loading';
import ChangeProfileInfo from './Sections/ChangeProfileInfo';
import ChangePassword from './Sections/ChangePassword';
import DeleteAccount from './Sections/DeleteAccount';

const { Title } = Typography;
const { TabPane } = Tabs;

const EditAccountSettings = (props) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [isSocialAccount, setIsSocialAccount] = useState(false);
    const [socialBadgeColor, setSocialBadgeColor] = useState(provider["GOOGLE"].color);
    const [formData, setFormData] = useState({});
    
    useEffect(()=>{
        _callApi();
    },[]);

    function _callApi() {
      axios.get(`${SERVER_URI}/api/v1/user`, header())
      .then(response => {
          setFormData(response.data);
          setLoading(false);
          setIsSocialAccount(response.data.provider !== "LOCAL");

          if(isSocialAccount) {
            setSocialBadgeColor(
              provider[`${response.data.provider}`].color
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

              <Tabs defaultActiveKey="1" style={{marginTop : '2.4rem'}} onChange={(key) => {if(key==="1") _callApi()}}>
                  <TabPane tab={t('mypage.editAccountSettings.changeProfileInfo')} key="1">
                    <Title level={4}>{t('mypage.editAccountSettings.changeProfileInfo')}</Title>
                    <ChangeProfileInfo formData={formData}/>
                  </TabPane>

                  {!isSocialAccount && 
                    <TabPane tab={t('mypage.editAccountSettings.changePassword')} key="2">
                      <Title level={4}>{t('mypage.editAccountSettings.changePassword')}</Title>
                      <ChangePassword/>
                    </TabPane>
                  }

                  <TabPane tab={t('mypage.editAccountSettings.deleteAccount')} key="3">
                    <Title level={4}>{t('mypage.editAccountSettings.deleteAccount')}</Title> 
                    <DeleteAccount/>
                  </TabPane>
              </Tabs>
            </>
          }
      </>
    )
}

export default EditAccountSettings;
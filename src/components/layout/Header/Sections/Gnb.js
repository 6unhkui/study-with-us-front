import React from 'react'
import axios from 'axios';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export default function Gnb() {
    return (
        <div className="gnb-wrap">
            <Menu mode="horizontal" style={{lineHeight : '4rem'}}>
                <Menu.Item key="mail">
                    스터디룸
                </Menu.Item>

                <Menu.Item key="app">
                    Navigation Two
                </Menu.Item>
        
                <Menu.Item key="alipay">
                    Navigation Four - Link
                </Menu.Item>
            </Menu>
      </div>
    )
}

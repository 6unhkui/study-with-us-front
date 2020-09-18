import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

export default function NotFount() {
    const { t } = useTranslation();

    return (
        <div className="container content-wrap">
            <Result
                icon={<FrownOutlined />}
                title={t('404.title')}
                subTitle={t('404.subTitle')}
                extra={<Link to="/"><Button type="primary" size="large" className='shadow'>{t('common.goToMain')}</Button></Link>}
            />
        </div>
    )
}
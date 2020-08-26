import React from 'react';
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Success = (props) => {
    return (
        <Result
        icon={<SmileOutlined />}
        title={`환영합니다, ${props.user.name} 메이트!`}
        subTitle={<>성장에 동참할 스터디 메이트들이 기다리고 있습니다.<br/>어서 스터디룸에 가입해보세요!</>}
        extra={[
            <Link to="/login">
                <Button type="primary">
                    로그인 하기
                </Button>
            </Link>,
            <Link to="/">
                <Button>
                    메인으로 가기
                </Button>
            </Link>,
        ]}
      />
    )
}

export default Success;
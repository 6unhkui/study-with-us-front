import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import FightingImage from "assets/image/mimoticon-fighting.png";

const Success = props => {
    return (
        <Result
            icon={<img src={FightingImage} alt="success" style={{ width: 120 }} />}
            title={`환영합니다, ${props.user.name} 메이트!`}
            subTitle={
                <>
                    성장에 동참할 스터디 메이트들이 기다리고 있습니다.
                    <br />
                    어서 스터디방에 가입해보세요!
                </>
            }
            extra={[
                <div style={{ marginTop: "3rem" }}>
                    <Link to="/login">
                        <Button type="primary" size="large" style={{ marginRight: ".6rem" }} className="shadow">
                            로그인 하기
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button size="large" className="shadow">
                            메인으로 가기
                        </Button>
                    </Link>
                </div>
            ]}
        />
    );
};

export default Success;

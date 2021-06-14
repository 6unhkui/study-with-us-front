import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Emoji from "../Emoji";
import styles from "./RegistrationSuccess.module.less";

interface RegisterationSuccessProps {}

const RegisterationSuccess: React.FC<RegisterationSuccessProps> = () => {
    return (
        <div className={styles.container}>
            <Emoji size={80}>🎉</Emoji>
            <div className={styles.subTitle}>회원가입을 축하합니다.</div>

            <div className={styles.btnArea}>
                <Link to="/login">
                    <Button type="primary">로그인 하기</Button>
                </Link>
                <Link to="/">
                    <Button>메인으로 가기</Button>
                </Link>
            </div>
        </div>
    );
};

export default React.memo(RegisterationSuccess);

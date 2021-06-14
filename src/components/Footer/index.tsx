import React from "react";
import { TwitterOutlined, InstagramOutlined, FacebookOutlined } from "@ant-design/icons";
import Divider from "@/components/Divider";
import styles from "./Footer.module.less";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <Divider />
            <div className={styles.wrapper}>
                <h1 className={styles.siteName}>study with us</h1>
                <ul className={styles.socialCotainer}>
                    <li>
                        <TwitterOutlined />
                    </li>
                    <li>
                        <InstagramOutlined />
                    </li>
                    <li>
                        <FacebookOutlined />
                    </li>
                </ul>
                <ul className={styles.supportContainer}>
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>고객센터</li>
                </ul>
            </div>
        </footer>
    );
};

export default React.memo(Footer);

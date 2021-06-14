import React, { useCallback } from "react";
import NaverIco from "@/images/naver-ico.svg";
import GoogleIco from "@/images/google-ico.svg";
import { Button } from "antd";
import { AuthProvider } from "@/api/dto/account.dto";
import styles from "./SocialLogin.module.less";

interface Provider {
    name: Extract<AuthProvider, "GOOGLE" | "NAVER">;
    icon: string;
}

const providers: Provider[] = [
    { name: "GOOGLE", icon: GoogleIco },
    { name: "NAVER", icon: NaverIco }
];

interface SocialLoginButtonsProps {}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = () => {
    const onClick = useCallback((provier: Provider["name"]) => {
        if (provier === "GOOGLE") {
            window.location.assign(process.env.REACT_APP_OAUTH2_PROVIDER_GOOGLE_URL);
        } else if (provier === "NAVER") {
            window.location.assign(process.env.REACT_APP_OAUTH2_PROVIDER_NAVER_URL);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            {providers.map(({ name, icon }) => (
                <Button
                    key={name}
                    className={`${styles.button} ${name === "GOOGLE" ? styles.google : styles.naver}`}
                    onClick={() => onClick(name)}
                >
                    <img src={icon} alt={`${name} icon`} className={styles.icon} /> <span>{name.toLowerCase()}</span>
                </Button>
            ))}
        </div>
    );
};

export default React.memo(SocialLoginButtons);

import { AuthProvider } from "@/api/dto/account.dto";
import { Badge } from "antd";
import React from "react";
import styles from "./AuthProviderBadge.module.less";

interface AuthProviderBadgeProps {
    provider?: AuthProvider;
}

const AuthProviderBadge: React.FC<AuthProviderBadgeProps> = ({ provider = "LOCAL" }) => {
    if (provider === "LOCAL") return null;

    return <Badge className={`${styles.badge} ${provider === "GOOGLE" ? styles.google : styles.naver}`}>{provider}</Badge>;
};

export default React.memo(AuthProviderBadge);

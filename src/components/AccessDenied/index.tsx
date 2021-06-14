import React from "react";
import Emoji from "@/components/Emoji";
import { MehTwoTone } from "@ant-design/icons";
import styles from "./AccessDenied.module.less";

type DenyType = "pageNotFound" | "accessOnlyMembers" | "limitNumberOfMembers";

const denyTypes: Record<DenyType, { title: string; subTitle: string }> = {
    pageNotFound: {
        title: "404 Page Not Found",
        subTitle: "존재하지 않는 페이지입니다."
    },
    accessOnlyMembers: {
        title: "가입한 메이트만 확인 할 수 있는 페이지입니다.",
        subTitle: "상단의 [가입하기] 버튼을 클릭하면 스터디 메이트가 될 수 있습니다."
    },
    limitNumberOfMembers: {
        title: "가입 할 수 없는 스터디방입니다.",
        subTitle: "최대 가입 멤버수를 모두 채운 스터디방입니다."
    }
};

interface AccessDeniedProps {
    type: DenyType;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ type }) => {
    return (
        <div className={styles.wrapper}>
            <Emoji size={70}>
                <MehTwoTone twoToneColor={["var(--primary-color)", "var(--bg-color-gray)"]} />
            </Emoji>
            <h1 className={styles.title}>{denyTypes[type].title}</h1>
            <div className={styles.subTitle}>{denyTypes[type].subTitle}</div>
        </div>
    );
};

export default AccessDenied;

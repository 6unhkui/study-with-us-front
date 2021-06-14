import { AvatarSize } from "antd/lib/avatar/SizeContext";
import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from "antd";
import React from "react";
import styled from "styled-components";
import stringToHexColor from "@/utils/stringToHexColor";

interface AvatarProps extends AntdAvatarProps {
    size?: AvatarSize;
    name?: string;
    profileImage?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name = "noname", profileImage, size = 34, className, ...props }) => {
    const firstLetterOfName = name?.charAt(0).toLocaleUpperCase();

    return (
        <CustomAvatar
            src={profileImage}
            alt={name}
            bgcolor={profileImage ? undefined : stringToHexColor(firstLetterOfName)}
            size={size}
            className={className}
            {...props}
        >
            {firstLetterOfName}
        </CustomAvatar>
    );
};

export default React.memo(Avatar);

const CustomAvatar = styled(AntdAvatar)<{ bgcolor?: string; size?: AvatarSize }>`
    ${props => (props.bgcolor ? { background: props.bgcolor } : null)};
    ${props => (typeof props.size === "number" ? { fontSize: `${props.size - 10}px !important` } : null)}

    .ant-avatar-string {
        font-size: 0.6em;
    }
`;

import React from "react";
import styled from "styled-components";

interface EmojiProps {
    ml?: number;
    mr?: number;
    size?: number;
}

const Emoji: React.FC<EmojiProps> = ({ children, ml, mr, size }) => {
    return (
        <EmojiComp ml={ml} mr={mr} size={size}>
            {children}
        </EmojiComp>
    );
};

export default Emoji;

const EmojiComp = styled.span<{ ml?: number; mr?: number; size?: number }>`
    ${props => props.ml && `margin-left : ${props.ml}px`}
    ${props => props.mr && `margin-right : ${props.mr}px`}
    ${props => props.size && `font-size : ${props.size}px`}
`;

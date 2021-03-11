import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const MoreButton = ({ onClick }) => {
    return (
        <MoreBtnWrap>
            <Button ghost type="primary" onClick={onClick}>
                load more
            </Button>
        </MoreBtnWrap>
    );
};

export default MoreButton;

const MoreBtnWrap = styled.div`
    text-align: center;
    margin-top: 2rem;
`;

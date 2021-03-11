import React, { useCallback } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import breakpoint from "styled-components-breakpoint";

const NowStartBanner = () => {
    const history = useHistory();

    const handleButtonClick = useCallback(() => {
        history.push({
            pathname: "/room/create"
        });
    }, [history]);

    return (
        <SubBanner>
            <div className="container content">
                <div className="title">
                    지금 스터디방을 만들어,
                    <br />
                    성장을 함께할 메이트를 모집해보세요!
                </div>
                <Button type="primary" onClick={handleButtonClick}>
                    지금 스터디방 만들기 <RightOutlined />
                </Button>
            </div>
        </SubBanner>
    );
};

export default NowStartBanner;

const SubBanner = styled.div`
    margin-top: 4rem;
    /* height: 16rem; */
    background: var(--bg-gray);
    display: flex;
    align-items: center;

    .content {
        text-align: center;
        margin: 4rem auto;

        .title {
            font-size: 1.3rem;
            margin-bottom: 14px;

            ${breakpoint("desktop")`
            font-size : 1.5rem;
        `}
        }
    }
`;

import React, { useCallback } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import breakpoint from "styled-components-breakpoint";
import { useTranslation } from "react-i18next";

const StartNowBanner = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleButtonClick = useCallback(() => {
        history.push({
            pathname: "/room/create"
        });
    }, [history]);

    return (
        <SubBanner>
            <div className="container content">
                <div className="title">{t("main.startNow")}</div>
                <Button type="primary" onClick={handleButtonClick}>
                    {t("main.startBtn")} <RightOutlined />
                </Button>
            </div>
        </SubBanner>
    );
};

export default StartNowBanner;

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

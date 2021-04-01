import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import SEO from "components/SEO";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="container content-wrap">
            <SEO title={t("404.title")} description={t("404.subTitle")} />
            <Result
                icon={<FrownOutlined />}
                title={t("404.title")}
                subTitle={t("404.subTitle")}
                extra={
                    <Link to="/">
                        <Button type="primary" size="large" className="shadow">
                            {t("common.goToMain")}
                        </Button>
                    </Link>
                }
            />
        </div>
    );
}

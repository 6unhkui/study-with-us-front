import React from "react";
import { PageHeader as AntdPageHeader, PageHeaderProps as AntdPageHeaderProps } from "antd";
import { useHistory } from "react-router";

interface PageHeaderProps extends AntdPageHeaderProps {
    groupName?: string;
    name: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ groupName, name, ...props }) => {
    const history = useHistory();
    return <AntdPageHeader onBack={history.goBack} title={`${groupName ? `[${groupName}] ` : ""}${name}`} {...props} />;
};

export default React.memo(PageHeader);

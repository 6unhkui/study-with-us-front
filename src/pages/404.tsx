import AccessDenied from "@/components/AccessDenied";
import Wrapper from "@/components/Wrapper";
import React from "react";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
    return (
        <Wrapper>
            <AccessDenied type="pageNotFound" />
        </Wrapper>
    );
};

export default NotFoundPage;

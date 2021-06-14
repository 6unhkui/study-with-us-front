import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
    title?: string;
    description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
    return (
        <Helmet title={title} titleTemplate="%s | Study with us" defaultTitle="Study with us">
            {description && <meta name="description" content={description} />}
        </Helmet>
    );
};

export default SEO;

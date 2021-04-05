import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { SITE_META } from "constants/index";

const locales = {
    en: "en",
    ko: "ko"
};

export default function SEO({ title, description, locale, canonical, image, type }) {
    const lang = locales[locale] || locales.en;
    const realCanonical = `${SITE_META.url}/${canonical}`;

    return (
        <Helmet titleTemplate="%s">
            <html lang={lang} />
            <title>{title ? `${title} | ${SITE_META.title}` : SITE_META.title}</title>
            <meta name="description" content={description || ""} />
            {canonical ? <link rel="canonical" href={realCanonical} /> : null}
            {image.url ? <link rel="image_src" href={image.url} /> : null}
            {image.url ? <meta itemProp="image" content={image.url} /> : null}
            <meta property="og:site_name" content={SITE_META.title} />
            <meta property="og:title" content={title} />
            {description ? <meta property="og:description" content={description} /> : null}
            {canonical ? <meta property="og:url" content={canonical} /> : null}
            <meta property="og:locale" content={lang} />
            <meta property="og:type" content={type} />
            {image.url ? <meta property="og:image" content={image.url} /> : null}
            {image.width ? <meta property="og:image:width" content={image.width} /> : null}
            {image.height ? <meta property="og:image:height" content={image.height} /> : null}
            <meta property="fb:pages" content={SITE_META.url} />

            {/* change type of twitter if there is no image? */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? <meta name="twitter:description" content={description} /> : null}
            {image.url ? <meta name="twitter:image" content={image.url} /> : null}
            <meta name="twitter:site" content={SITE_META.url} />
            {canonical ? <link rel="alternate" href={canonical} hrefLang={lang} /> : null}
        </Helmet>
    );
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    canonical: PropTypes.string,
    locale: PropTypes.string,
    image: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
    }),
    type: PropTypes.string
};

SEO.defaultProps = {
    title: "",
    description: SITE_META.description,
    canonical: "",
    locale: "en",
    image: {
        url: SITE_META.image,
        width: 500,
        height: 300
    },
    type: "website"
};

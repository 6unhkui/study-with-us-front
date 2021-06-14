import React, { useEffect } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {}

const ScrollToTop: React.FC<ScrollToTopProps> = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;

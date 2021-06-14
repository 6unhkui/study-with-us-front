import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackTop } from "antd";
import styles from "./Layout.module.less";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    useEffect(() => {
        console.log("%c Layout Mount", "color: skyblue; font-weight: bold");
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <main>{children}</main>
            <Footer />
            <BackTop />
        </div>
    );
};

export default Layout;

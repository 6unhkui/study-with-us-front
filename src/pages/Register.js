import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RegisterForm from "containers/Register/RegisterForm";
import Success from "containers/Register/Success";

import CardWrap from "components/CardBox";
import SEO from "components/SEO";

export default function RegisterPage() {
    const { t } = useTranslation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [user, setUser] = useState({ name: "" });

    return (
        <>
            <SEO title="Register" />
            <CardWrap title={t("auth.createAccount")} size="small">
                {isSuccess ? <Success user={user} /> : <RegisterForm setIsSuccess={setIsSuccess} setUser={setUser} />}
            </CardWrap>
        </>
    );
}

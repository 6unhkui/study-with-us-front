import Wrapper from "@/components/Wrapper";
import React, { useCallback, useEffect, useState } from "react";
import Form from "@/components/RegistrationForm";
import Success from "@/components/RegistrationSuccess";
import { useDispatch } from "react-redux";
import { registerAsync } from "@/store/account";
import SEO from "@/components/SEO";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
    const [step, setStep] = useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(registerAsync.cancel(""));
        };
    }, [dispatch]);

    const onSuccess = useCallback(() => {
        setStep(1);
    }, []);

    let body;
    if (step === 0) body = <Form onSuccess={onSuccess} />;
    else if (step === 1) body = <Success />;

    return (
        <Wrapper type="card" size="small" header="회원가입">
            <SEO title="회원 가입" />
            {body}
        </Wrapper>
    );
};

export default RegisterPage;

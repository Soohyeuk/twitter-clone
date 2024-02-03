import { useState } from "react";
import { Form, Input, Wrapper, Title, Switcher } from "../components/auth-components";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { styled } from "styled-components";




export default function ResetPW() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = e; 
        setEmail(value)
    }

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading || email === "") return; 
        setLoading(true);
        sendPasswordResetEmail(auth, email)
        setLoading(false);
    }

    const H1 = styled.h1`
        margin-top: 10px;
    `;

    return (
        <Wrapper>
            <Title>Reset Password</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} type="email" placeholder="email" value={email} required/>
                <Input type="submit" value={loading ? "Loading..." : "Send Email"}/>
            </Form>
            <H1>We will send you email if the address is valid</H1>
            <Switcher>
                Go back to login {" "}
                <Link to="/login">click here &rarr;</Link>
            </Switcher>
        </Wrapper>
    )
}
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Form, Wrapper, Title, Input, Switcher, Error } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function Login() {
  const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e; 
        if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //setError("");
        if (loading || email === "" || password === "") return;
        try {
          setLoading(true);
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/");
        } catch(ex) {
          if (ex instanceof FirebaseError) {
            setError(ex.message);
          }
        } finally { 
          setLoading(false);
        }
    }
    return (
        <Wrapper>
            <Title>Log into 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange = {onChange} name = "email" value={email} placeholder="Email" type="email" required/>
                <Input onChange = {onChange} name = "password" value={password}  placeholder="Password" type="password" required/>
                <Input onChange = {onChange} type="submit" value= {loading ? "Loading..." : "Log In"}/>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                don't have an account? {" "}
                <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
            <Switcher> 
              forgot password? {" "}
              <Link to="/resetPassword">click here &rarr;</Link>
            </Switcher>
            <GithubButton/>
        </Wrapper>
    )
}
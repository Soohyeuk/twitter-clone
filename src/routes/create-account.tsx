import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Wrapper, Title, Input, Switcher, Error } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function Acc() {
  const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const {target: {name, value}} = e; 
      if (name === "name") {
          setName(value); 
      } else if (name === "password") {
          setPassword(value);
      } else if (name === "email") {
          setEmail(value);
      }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //setError("");
      if (loading || name === "" || email === "" || password === "") return;
      try {
        setLoading(true);
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credentials.user, {displayName: name});
        navigate("/");
      } catch(ex) {
        if (ex instanceof FirebaseError) {
          setError(ex.message);
        }
      } finally { 
        setLoading(false);
      }
    };

    return (
        <Wrapper>
            <Title>Join 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange = {onChange} name = "name" value={name} placeholder="Name" type="text" required/>
                <Input onChange = {onChange} name = "email" value={email} placeholder="Email" type="email" required/>
                <Input onChange = {onChange} name = "password" value={password}  placeholder="Password" type="password" required/>
                <Input onChange = {onChange} type="submit" value= {loading ? "Loading..." : "Create Account"}/>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
              already have an account? {" "}
              <Link to="/login">Log in &rarr;</Link>
            </Switcher>
            <Switcher> 
              forgot password? {" "}
              <Link to="/resetPassword">click here &rarr;</Link>
            </Switcher>
            <GithubButton/>
        </Wrapper>

    )
}
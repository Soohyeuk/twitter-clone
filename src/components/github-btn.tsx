
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

const Button = styled.span`
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;
const Wrap = styled.div`
  margin-top: 50px;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (ex) {
      if (ex instanceof FirebaseError) {
        setError(ex.message);
      }
    }
  };
  return (
    <Wrap>
      <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />
        Continue with Github
      </Button>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrap>
  );
}
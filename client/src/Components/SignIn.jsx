import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import TextInput from "./TextInput";
import { userSignIn } from "../api";
import { authStart, authSuccess, authFailure } from "../store/authSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  @media (max-width: 800px) {
    gap: 8px;
  }
`;

const TextPrimary = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.text_primary};
`;

const TextSecondary = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

const ErrorText = styled.div`
  color: #ff6b6b;
  font-size: 14px;
`;

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.auth.loading);
  const error = useSelector((s) => s.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    dispatch(authStart());
    try {
      const res = await userSignIn({ email, password });
      dispatch(authSuccess(res.data));
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message;
      dispatch(authFailure(msg));
    }
  };

  return (
    <Container>
      <div>
        <TextPrimary>Welcome back</TextPrimary>
        <TextSecondary>Sign in to continue</TextSecondary>
      </div>

      <TextInput
        label="Email Address"
        placeholder="Enter your email address"
        value={email}
        handelChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        label="Password"
        placeholder="Enter your password"
        password
        value={password}
        handelChange={(e) => setPassword(e.target.value)}
      />

      {error && <ErrorText>{error}</ErrorText>}

      <Button text="Sign In" onClick={handleSignIn} isLoading={loading} isDisabled={loading} />
    </Container>
  );
}

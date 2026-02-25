import React, { useState } from "react";
import styled from "styled-components";
import logo from "../utils/logo.png";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const Container = styled.div`
  flex: 1;
  height: 100vh;
  width: 100vw;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 70%;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: bold;
`;

export default function Authentication() {
  const [login, setLogin] = useState(true);

  return (
    <Container>
      <Left>
        <Logo src={logo} alt="Logo" />
      </Left>
      <Right>
        {login ? (
          <>
            <SignIn />
            <Text>
              Don&apos;t have an account?{" "}
              <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Already have an account?{" "}
              <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
}

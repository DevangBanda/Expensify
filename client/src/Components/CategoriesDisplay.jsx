import React from "react";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button_Dash from "./Button_Dash";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.bgLight};
  background: ${({ theme }) => theme.bg};
`;

export default function CategoriesDisplay({ name, onClick, id }) {
  return (
    <Container>
      <div style={{ flex: 1, textAlign: "center", fontSize: "1rem", fontWeight: 600 }}>{name}</div>
      <Button_Dash onClick={() => onClick(id)} component={<DeleteForeverIcon />} text="" />
    </Container>
  );
}

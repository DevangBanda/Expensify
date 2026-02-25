import React from "react";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 520px;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  font-size: 15px;
  background: ${({ theme }) => theme.expenseDisplay};
  padding: 10px;
  gap: 10px;

  > div {
    padding: 0 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CellDate = styled.div`
  flex: 0.8;
`;
const CellDesc = styled.div`
  flex: 2;
`;
const CellAmt = styled.div`
  flex: 0.9;
  text-align: right;
`;
const CellCat = styled.div`
  flex: 1.1;
  text-align: center;
`;

const DeleteBtn = styled.button`
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.primary};
  background: transparent;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export default React.memo(function TryExpense({ list = [], handleDeleteClick }) {
  return (
    <List>
      {list.map((exp) => (
        <Row key={exp._id}>
          <CellDate title={exp.dateStr}>{exp.dateStr}</CellDate>
          <CellDesc title={exp.description}>{exp.description}</CellDesc>
          <CellAmt>${Number(exp.amount || 0).toFixed(2)}</CellAmt>
          <CellCat title={exp.categoryName}>{exp.categoryName}</CellCat>
          <DeleteBtn onClick={() => handleDeleteClick(exp._id)}>Delete</DeleteBtn>
        </Row>
      ))}
      {list.length === 0 && <div style={{ opacity: 0.8 }}>No expenses yet.</div>}
    </List>
  );
});

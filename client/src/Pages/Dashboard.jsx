import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import BarGraphData from "../Components/Graphs/BarGraphData";
import PieChartData from "../Components/Graphs/PieChartData";
import LineChartData from "../Components/Graphs/LineChartData";
import AddExpense from "../Components/AddExpense";
import Button_Dash from "../Components/Button_Dash";
import TryExpense from "../Components/Expense/TryExpense";
import { addExpense, deleteExpense, getExpenses } from "../api";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const SectionRow = styled.div`
  display: flex;
  gap: 20px;
  padding: 14px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  flex: 1;
  min-width: 320px;
  padding: 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.bgLight};
  box-shadow: 1px 6px 10px 1px black;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default function Dashboard() {
  const [expenseData, setExpenseData] = useState([]);
  const [chartType, setChartType] = useState("pie");

  const totals = useMemo(() => {
    const total = expenseData.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    return { total };
  }, [expenseData]);

  const refreshExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenseData(res.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  const postExpense = async (data) => {
    try {
      await addExpense(data);
      await refreshExpenses();
    } catch (e) {
      console.log(e);
      alert(e?.response?.data?.message || "Failed to add expense");
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      await refreshExpenses();
    } catch (e) {
      console.log(e);
      alert(e?.response?.data?.message || "Failed to delete expense");
    }
  };

  return (
    <Container>
      <SectionRow>
        <Card>
          <Row style={{ justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Spending Overview</div>
            <Row>
              <Button_Dash text="Pie" onClick={() => setChartType("pie")} />
              <Button_Dash text="Bar" onClick={() => setChartType("bar")} />
              <Button_Dash text="Line" onClick={() => setChartType("line")} />
            </Row>
          </Row>

          <div style={{ marginTop: 10 }}>
            {chartType === "bar" ? (
              <BarGraphData data={expenseData} />
            ) : chartType === "line" ? (
              <LineChartData data={expenseData} />
            ) : (
              <PieChartData data={expenseData} />
            )}
          </div>

          <div style={{ marginTop: 8, opacity: 0.9 }}>
            Total (all time): <b>${totals.total.toFixed(2)}</b>
          </div>
        </Card>

        <AddExpense onAddExpense={postExpense} />
      </SectionRow>

      <SectionRow>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Recent Expenses</div>
          <TryExpense list={expenseData} handleDeleteClick={removeExpense} />
        </Card>
      </SectionRow>
    </Container>
  );
}

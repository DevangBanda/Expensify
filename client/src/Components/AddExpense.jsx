import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Input_Dash from "./Input_Dash";
import Button_Dash from "./Button_Dash";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getCategoryList } from "../api";

const ExpenseCard = styled.div`
  width: min(520px, 95%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 16px;
  gap: 12px;
  background: ${({ theme }) => theme.bgLight};
  box-shadow: 1px 6px 10px 1px black;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.bgLight};
  border-radius: 12px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

export default React.memo(function AddExpense({ onAddExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [categoryList, setCategoryList] = useState([]);

  const categoryIdRef = useRef(null);
  const categoryNameRef = useRef(null);

  const handleAddExpenseClick = () => {
    if (!amount || !description) {
      window.alert("Amount and description cannot be empty");
      return;
    }

    const jsDate = date?.toDate ? date.toDate() : new Date();
    const dateStr = jsDate.toLocaleDateString();
    const categoryId = categoryIdRef.current;
    const categoryName = categoryNameRef.current;

    onAddExpense({ dateStr, description, amount, categoryId, categoryName });

    setDescription("");
    setAmount("");
  };

  const loadCategories = async () => {
    try {
      const res = await getCategoryList();
      const data = res.data || [];
      setCategoryList(data);
      if (data[0]) {
        categoryIdRef.current = data[0]._id;
        categoryNameRef.current = data[0].categoryName;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <ExpenseCard>
      <Title>Add Expense</Title>

      <Input_Dash
        name="description"
        value={description}
        onChange={setDescription}
        type="text"
        placeholder="Coffee, groceries, rent..."
        label="Description"
      />

      <Input_Dash
        name="amount"
        value={amount}
        onChange={setAmount}
        type="text"
        placeholder="e.g. 12.99"
        validateFloat
        label="Amount"
      />

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <select
          name="categories"
          style={{ flex: 1, padding: 10, borderRadius: 10 }}
          onChange={(e) => {
            const opt = e.target.options[e.target.selectedIndex];
            categoryIdRef.current = opt.getAttribute("data-id");
            categoryNameRef.current = e.target.value;
          }}
        >
          {categoryList.map((cat) => (
            <option data-id={cat._id} key={cat._id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
      </div>

      <Button_Dash text="Add Expense" onClick={handleAddExpenseClick} />
    </ExpenseCard>
  );
});

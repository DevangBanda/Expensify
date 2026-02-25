import React, { useRef } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CategoriesDisplay from "../CategoriesDisplay";
import Button_Dash from "../Button_Dash";

const Container = styled.div``;

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 5px;
  gap: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Head = styled.h2`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-left: 10px;
  margin: 0;
`;

export default function Categories({ addNewCategory, onInputChange, list, onDelete }) {
  const elementRef = useRef(null);

  const handleCategoryAdd = () => {
    addNewCategory();
    if (elementRef.current) elementRef.current.value = "";
  };

  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <Container>
      <Top>
        <Head>Categories</Head>
      </Top>
      <Top>
        <input
          ref={elementRef}
          onChange={handleChange}
          type="text"
          placeholder="Add new category"
          style={{ flex: 1, padding: 10, borderRadius: 10 }}
        />
        <Button_Dash onClick={handleCategoryAdd} component={<AddIcon />} text="Add" />
      </Top>
      <Bottom>
        {(list || []).map((category) => (
          <CategoriesDisplay
            onClick={onDelete}
            id={category._id}
            key={category._id}
            name={category.categoryName}
          />
        ))}
      </Bottom>
    </Container>
  );
}

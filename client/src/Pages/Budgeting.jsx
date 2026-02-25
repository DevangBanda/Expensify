import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Papa from "papaparse";
import AddIcon from "@mui/icons-material/Add";

import Button_Dash from "../Components/Button_Dash";
import Categories from "../Components/DisplayComponents/Categories";
import { addCategory, deleteCategory, getCategoryList, importExpensesCSV } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
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

const Grid = styled.div`
  display: flex;
  gap: 14px;
  padding: 14px;
  flex: 1;
  overflow: auto;
  flex-wrap: wrap;
`;

export default function Budgeting() {
  const inputValueRef = useRef("");
  const [categoryList, setCategoryList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importStatus, setImportStatus] = useState("");

  const onInputChange = (newValue) => {
    inputValueRef.current = newValue;
  };

  const refreshCategories = async () => {
    try {
      const res = await getCategoryList();
      setCategoryList(res.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const addNewCategory = async () => {
    const name = (inputValueRef.current || "").trim();
    if (!name) return alert("Category name can't be empty");
    try {
      await addCategory({ categoryName: name });
      inputValueRef.current = "";
      await refreshCategories();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      await refreshCategories();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to delete category");
    }
  };

  const handleUploadFile = async () => {
    if (!uploadedFile) {
      alert("No file selected.");
      return;
    }

    setImportStatus("Parsing CSV...");

    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        try {
          const rows = (results.data || []).filter(Boolean);
          setImportStatus(`Importing ${rows.length} rows...`);
          await importExpensesCSV(rows);
          setImportStatus(`Imported ${rows.length} rows ✅`);
        } catch (e) {
          console.log(e);
          setImportStatus(e?.response?.data?.message || "CSV import failed");
        }
      },
      error: function () {
        setImportStatus("Failed to parse CSV");
      },
    });
  };

  return (
    <Container>
      <Header>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Budget Tools</div>
        <input type="file" accept=".csv" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
        <Button_Dash text="Import CSV" component={<AddIcon />} onClick={handleUploadFile} />
        {importStatus && <div style={{ opacity: 0.85 }}>{importStatus}</div>}
      </Header>

      <Grid>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Manage Categories</div>
          <Categories
            addNewCategory={addNewCategory}
            onInputChange={onInputChange}
            onDelete={handleDeleteCategory}
            list={categoryList}
          />
        </Card>

        <Card>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>CSV Format</div>
          <div style={{ opacity: 0.9, lineHeight: 1.6 }}>
            Your CSV should include headers like:
            <pre style={{ marginTop: 10 }}>
dateStr,description,amount,categoryName
01/15/2026,Coffee,4.75,Food
01/16/2026,Bus pass,112,Transport
            </pre>
            <div style={{ fontSize: 13, opacity: 0.9 }}>
              Tip: If a <b>categoryName</b> doesn&apos;t exist yet, it will be created automatically during import.
            </div>
          </div>
        </Card>
      </Grid>
    </Container>
  );
}

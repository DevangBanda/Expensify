import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { darkTheme } from "./utils/theme";
import Navbar from "./Components/Navbar";
import Budgeting from "./Pages/Budgeting";
import Dashboard from "./Pages/Dashboard";
import Authentication from "./Pages/Authentication";
import ProtectedRoute from "./Components/ProtectedRoute";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.2s ease;
`;

export default function App() {
  const token = useSelector((s) => s.auth.token);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Container>
          {token && <Navbar />}
          <Routes>
            <Route path="/auth" element={token ? <Navigate to="/" replace /> : <Authentication />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <Budgeting />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={token ? "/" : "/auth"} replace />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

import { useState } from "react";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import type { Sided } from "./hooks/useImage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { Navigate } from "react-router-dom";

export interface moneyQuery {
  imageData: Sided | null;
}

function App() {
  const [moneyQuery, setMoneyQuery] = useState<moneyQuery>({} as moneyQuery);
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          token ? (
            <MainPage
              selectImage={moneyQuery.imageData}
              onSelectImage={(imageData) =>
                setMoneyQuery({ ...moneyQuery, imageData })
              }
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;

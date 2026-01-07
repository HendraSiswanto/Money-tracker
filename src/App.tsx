import { useState } from "react";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import type { Sided } from "./hooks/useImage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import ProtectedRoute from "./ProtectedRoute";

export interface moneyQuery {
  imageData: Sided | null;
}

function App() {
  const [moneyQuery, setMoneyQuery] = useState<moneyQuery>({} as moneyQuery);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage
                selectImage={moneyQuery.imageData}
                onSelectImage={(imageData) => setMoneyQuery({ imageData })}
              />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

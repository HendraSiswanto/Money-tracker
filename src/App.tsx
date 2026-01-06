import { useState } from "react";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import type { Sided } from "./hooks/useImage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import ProtectedRoot from "./ProtectedRoot";

export interface moneyQuery {
  imageData: Sided | null;
}

function App() {
  const [moneyQuery, setMoneyQuery] = useState<moneyQuery>({} as moneyQuery);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoot />}>
        <Route
          path="/"
          element={
            <MainPage
              selectImage={moneyQuery.imageData}
              onSelectImage={(imageData) => setMoneyQuery({ imageData })}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

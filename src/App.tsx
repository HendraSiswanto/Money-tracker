import { useState } from "react";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import type { Sided } from "./hooks/useImage";
import type { Type } from "./hooks/useType";

export interface moneyQuery {
  imageData: Sided | null;
  tipe: Type | null;
}

function App() {
  const [moneyQuery, setMoneyQuery] = useState<moneyQuery>({} as moneyQuery);

  return (
    <>
      <MainPage
        tipe={moneyQuery.tipe}
        selectImage={moneyQuery.imageData}
        onSelectImage={(imageData) =>
          setMoneyQuery({ ...moneyQuery, imageData })
        }
      ></MainPage>
    </>
  );
}

export default App;

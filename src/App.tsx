import { useState } from "react";
import MainPage from "./components/MainPage";
import type { Sided } from "./hooks/useImage";

export interface moneyQuery {
  imageData: Sided | null;
}

function App() {
  const [moneyQuery, setMoneyQuery] = useState<moneyQuery>({} as moneyQuery);

  return (
    <>
      <MainPage
        selectImage={moneyQuery.imageData}
        onSelectImage={(imageData) =>
          setMoneyQuery({ ...moneyQuery, imageData })
        }
      ></MainPage>
    </>
  );
}

export default App;

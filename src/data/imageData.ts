import Dompet from "../assets/Dompet.svg";
import Bayar from "../assets/Transfers.svg";
import Kategory from "../assets/Payments.svg";
import History from "../assets/History.svg";
import { useState } from "react";

export const [imageData,setImageData] = useState([
  {
    id: 1,
    imageUrl: Bayar,
    name: "Transaction",
    clicked: false
  },
  {
    id: 2,
    imageUrl: Dompet,
    name: "Balance",
    clicked: false
  },
  {
    id: 3,
    imageUrl: Kategory,
    name: "Category",
    clicked: false
  },
  {
    id: 4,
    imageUrl: History,
    name: "History",
    clicked: false
  },
]);

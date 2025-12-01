 
 
 import Expense from "./Expense";
import { useState, useEffect, useRef } from "react";
import type { TypeExpense } from "../hooks/useExpense";
import type { TypeIncome } from "../hooks/useIncome";
import type { Data } from "../data/types";

import Income from "./Income";
import { BsPenFill, BsTrash3Fill } from "react-icons/bs";
import {
  createTransaction,
  deleteTransactions,
  updateTransaction,
  getTransactions,
} from "../api/transaction";
import TrSkeleton from "./skeleton/TrSkeleton";

 
 interface Props {
   dataExpense: TypeExpense;
   dataIncome: TypeIncome;
 }
 interface allDataIncome {
   id?: number;
   outcome: string;
   type: string;
   amount: number;
   date: string;
   note?: string;
   timestamp: number;
 }
 
 const Transaction: React.FC = () => {
   useEffect(() => {
     async function fetchData() {
       setIsLoading(true);
       const res = await fetch("http://localhost:3000/transactions");
       const data: Data[] = await res.json();
 
       setTransactions(data);
 
       setTimeout(() => {
         setIsLoading(false);
       }, 1200);
     }
 
     fetchData();
   }, []);
   const [sortOption, setSortOption] = useState<
     "newest" | "oldest" | "high" | "low"
   >("newest");
   const [isLoading, setIsLoading] = useState(false);
   const [editData, setEditData] = useState<allDataIncome | null>(null);
   const [isEditOpen, setEditOpen] = useState(false);
   const [changeTipe, setTipe] = useState<Props>({} as Props);
   const [selected, setSelected] = useState("income");
   const [transactions, setTransactions] = useState<allDataIncome[]>([]);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [deletedId, setDeletedId] = useState<number | null>(null);
   const cancelRef = useRef<HTMLButtonElement>(null);
   const [filterOption, setFilterOption] = useState<
     "all" | "income" | "expense"
   >("all");
 const handleSave = async (
    newData: allDataIncome,
    typeData: "income" | "expense"
  ) => {
    setIsLoading(true);
    const isEditing = !!newData.id;
    if (!isEditing) {
      await createTransaction({
        outcome: typeData,
        type: newData.type,
        amount: newData.amount,
        note: newData.note,
        date: newData.date,
        timestamp: Date.now(),
      });
    } else {
      await updateTransaction({
        id: newData.id!,
        amount: newData.amount,
        type: newData.type,
        timestamp: Date.now(),
        outcome: typeData,
        note: newData.note,
        date: newData.date,
      });
    }
    const latest = await getTransactions();

    setTransactions(latest);

    setIsLoading(false);
  };

  const handleOpenDialog = (id: number) => {
    setDeletedId(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (!deletedId) return;

    await deleteTransactions(deletedId);

    setTransactions((prev) => {
      const updated = prev.filter((item) => item.id !== deletedId);

      return updated;
    });

    onClose();
  };

  const handleEdit = (item: allDataIncome) => {
    setEditData({
      id: item.id,
      amount: item.amount,
      note: item.note ?? "",
      date: item.date ? item.date.slice(0, 10) : "",
      type: item.type,
      timestamp: Number(item.timestamp),
      outcome: item.outcome,
    });
    setEditOpen(true);
  };

  const saveEditData = async () => {
    if (!editData) return;

    await updateTransaction({
      id: editData.id!,
      amount: editData.amount,
      note: editData.note,
      date: editData.date
        ? editData.date
        : new Date().toISOString().split("T")[0],
      type: editData.type,
      outcome: editData.outcome,
      timestamp: Number(editData.timestamp),
    });
    const latest = await getTransactions();
    setTransactions(latest);
    setEditOpen(false);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOption === "oldest") return a.timestamp - b.timestamp;
    if (sortOption === "newest") return b.timestamp - a.timestamp;
    if (sortOption === "high") return b.amount - a.amount;
    if (sortOption === "low") return a.amount - b.amount;
    return 0;
  });

  const filteredTransactions = sortedTransactions.filter((item) => {
    if (filterOption === "income")
      return item.outcome.toLowerCase() === "income";
    if (filterOption === "expense")
      return item.outcome.toLowerCase() === "expense";
    return true;
  });
  const totalIncome = filteredTransactions
    .filter((t) => t.outcome.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.outcome.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance =
    filterOption === "all"
      ? totalIncome - totalExpense
      : filterOption === "income"
      ? totalIncome
      : totalExpense;

}
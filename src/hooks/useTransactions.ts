import { useState, useEffect, useRef } from "react";
import { createTransaction, deleteTransactions, updateTransaction, getTransactions } from "../api/transaction";
import { useDisclosure } from "@chakra-ui/react";

export interface TransactionType {
  id?: number;
  outcome: string;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
}

export type SortOption = "newest" | "oldest" | "high" | "low";
export type FilterOption = "all" | "income" | "expense";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  const [editData, setEditData] = useState<TransactionType | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Fetch Data
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setIsLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setTimeout(() => setIsLoading(false), 1000);
  };
]
  const handleSave = async (newData: TransactionType, typeData: "income" | "expense") => {
    setIsLoading(true);
    if (newData.id) {
      await updateTransaction({ ...newData });
    } else {
      await createTransaction({
        ...newData,
        outcome: typeData,
        timestamp: Date.now(),
      });
    }
    await loadTransactions();
  };

  // Delete
  const handleDelete = async () => {
    if (!deletedId) return;
    await deleteTransactions(deletedId);
    setTransactions(prev => prev.filter(t => t.id !== deletedId));
    onClose();
  };

  // Open edit modal
  const handleEdit = (item: TransactionType) => {
    setEditData(item);
    setEditOpen(true);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOption === "newest") return b.timestamp - a.timestamp;
    if (sortOption === "oldest") return a.timestamp - b.timestamp;
    if (sortOption === "high") return b.amount - a.amount;
    return a.amount - b.amount;
  });

  const filteredTransactions = sortedTransactions.filter((i) => {
    if (filterOption === "income") return i.outcome === "income";
    if (filterOption === "expense") return i.outcome === "expense";
    return true;
  });

  return {
    transactions: filteredTransactions,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
    isLoading,

    editData,
    isEditOpen,
    setEditOpen,
    handleEdit,

    isOpen,
    onOpen,
    onClose,
    deleteId: deletedId,
    setDeletedId,
    handleDelete,

    handleSave,
  };
};

export default useTransactions;

import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

export const HighestCard = () => {
  const { highestIncome, highestExpense } = useTransactions();
  const [viewType, setViewType] = useState<"income" | "expense">("income");

  const selected = viewType === "income" ? highestIncome : highestExpense;

  return (
    <Box
      onClick={() => setViewType(viewType === "income" ? "expense" : "income")}
      cursor="pointer"
      p={4}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      w="270px"
    >
      <Text fontWeight="bold" color="gray.600">
        Highest {viewType === "income" ? "Income" : "Expense"}
      </Text>

      {selected ? (
        <>
          <Text
            fontSize="2xl"
            color={viewType === "income" ? "green.600" : "red.600"}
          >
            Rp {selected.amount.toLocaleString("id-ID")}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {selected.type}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {new Date(selected.date).toLocaleDateString("id-ID")}
          </Text>
        </>
      ) : (
        <Text>No data</Text>
      )}
    </Box>
  );
};

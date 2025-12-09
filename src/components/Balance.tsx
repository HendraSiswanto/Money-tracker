import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import { StatCard } from "./balanceComponents/StatCard";
import BarCard from "./balanceComponents/BarCard";
import { useTransactions } from "../hooks/useTransactions";
import {
  BsCurrencyBitcoin,
  BsCurrencyExchange,
  BsPiggyBank,
} from "react-icons/bs";
import { HighestCard } from "./balanceComponents/HighestCard";
import { useState } from "react";

export default function Balance() {
  const {
    totalIncome,
    totalExpense,
    balance,
    incomeGrowth,
    expenseGrowth,
    balanceGrowth,
    highestExpense,
    highestIncome,
  } = useTransactions();
  const [active, setActive] = useState<"income" | "expense">("income");
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 4 }} ml={6} mt={6} mb={4}>
        <StatCard
          icon={BsCurrencyBitcoin}
          title="Total Income"
          fontColor="#1C4532"
          value={totalIncome}
          percent={incomeGrowth.toFixed(0)}
          iconColor={incomeGrowth > 0 ? "#1C4532" : "#45241cff"}
          onClick={() => setActive("income")}
        />
        <StatCard
          icon={BsCurrencyExchange}
          title="Total Expense"
          fontColor="#45241cff"
          value={totalExpense}
          percent={expenseGrowth.toFixed(0)}
          iconColor={expenseGrowth > 0 ? "#1C4532" : "#45241cff"}
          onClick={() => setActive("expense")}
        />
        <StatCard
          icon={BsPiggyBank}
          title="Your Balance!"
          fontColor="gray.600"
          value={balance}
          percent={balanceGrowth.toFixed(0)}
          iconColor={balanceGrowth > 0 ? "#1C4532" : "#45241cff"}
        />
        <HighestCard
          type={active}
          title={
            active === "income" ? highestIncome?.type : highestExpense?.type
          }
          date={
            active === "income" ? highestIncome?.date : highestExpense?.date
          }
          amount={
            active === "income" ? highestIncome?.amount ?? 0 : highestExpense?.amount ?? 0
          }
        ></HighestCard>
      </SimpleGrid>

      <Box mt={6}>
        <BarCard />
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={4}
        mt={6}
      ></Grid>
    </>
  );
}

import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
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
    transactions,
    totalIncome,
    totalExpense,
    balance,
    incomeGrowth,
    expenseGrowth,
    balanceGrowth,
    highestExpense,
    highestIncome,
    highestBalance,
  } = useTransactions();
  const [active, setActive] = useState<"income" | "expense" | "balance">(
    "income"
  );

  return (
    <Flex flexDirection="column" align="flex-start" p={3} w="100%">
      <Box w="97%">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="60px">
          <StatCard
            icon={BsCurrencyBitcoin}
            title="Total Income"
            fontColor="#1C4532"
            value={totalIncome}
            percent={incomeGrowth.toFixed(0)}
            iconColor={incomeGrowth > 0 ? "#1C4532" : "#45241cff"}
            onClick={() => setActive("income")}
            active={active === "income"}
            activeColor="rgba(28, 69, 50, 0.10)"
          />
          <StatCard
            icon={BsCurrencyExchange}
            title="Total Expense"
            fontColor="#45241cff"
            value={totalExpense}
            percent={expenseGrowth.toFixed(0)}
            iconColor={expenseGrowth > 0 ? "#1C4532" : "#45241cff"}
            onClick={() => setActive("expense")}
            active={active === "expense"}
            activeColor="rgba(69, 36, 28, 0.10)"
          />
          <StatCard
            icon={BsPiggyBank}
            title="Your Balance!"
            fontColor="gray.600"
            value={balance}
            percent={balanceGrowth.toFixed(0)}
            iconColor={balanceGrowth > 0 ? "#1C4532" : "#45241cff"}
            onClick={() => setActive("balance")}
            activeColor="rgba(100, 100, 100, 0.10)"
            active={active === "balance"}
          />
          <HighestCard
            type={active}
            title={active}
            date={
              active === "income"
                ? highestIncome?.date
                : active === "expense"
                ? highestExpense?.date
                : highestBalance.date ?? ""
            }
            amount={
              active === "income"
                ? highestIncome?.amount ?? 0
                : active === "expense"
                ? highestExpense?.amount ?? 0
                : highestBalance.amount
            }
          ></HighestCard>
        </SimpleGrid>
      </Box>

      <Box mt={5} w="97%">
        <BarCard active={active} transactions={transactions} />
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={4}
        mt={6}
      ></Grid>
    </Flex>
  );
}

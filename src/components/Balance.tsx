import { Box, Container, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
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
import ReportOverview from "./balanceComponents/ReportOverview";
import LineOverview from "./balanceComponents/LineOverview";

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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  return (
    <Container maxW="container.xl" px={0}>
      <Flex flexDirection="column"  p={1}>
        <Box>
          <SimpleGrid
            alignItems="stretch"
            mt={8}
            mb={4}
            columns={{ base: 1, md: 4 }}
            w="100%"
            spacing="50px"
          >
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

        <Box mt={3} w="100%">
          <BarCard
            active={active}
            transactions={transactions}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "420px 1fr" }} gap={5} mt={2}>
          <Box w="100%" h="160px">
            <ReportOverview selectedMonth={selectedMonth} />
          </Box>
          <Box w="100%" minH="260px">
            <LineOverview
              active={active}
              transactions={transactions}
              selectedMonth={selectedMonth}
            ></LineOverview>
          </Box>
        </Grid>
      </Flex>
    </Container>
  );
}

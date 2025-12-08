import { Box, Stat, StatLabel, StatNumber, SimpleGrid } from "@chakra-ui/react";
import { useTransactions } from "../hooks/useTransactions";
import DoughnutCard from "./charts/DoughnutCard";

const BalancePage = () => {
  const { totalIncome, totalExpense, balance } = useTransactions();

  return (
    <Box p={4}>
      <SimpleGrid columns={3} spacing={4}>
        <Stat>
          <StatLabel>Total Income</StatLabel>
          <StatNumber color="green.600">Rp {totalIncome.toLocaleString("id-ID")}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Total Expense</StatLabel>
          <StatNumber color="red.600">Rp {totalExpense.toLocaleString("id-ID")}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Balance</StatLabel>
          <StatNumber>Rp {balance.toLocaleString("id-ID")}</StatNumber>
        </Stat>
      </SimpleGrid>

      <Box mt={6} height="300px">
        <DoughnutCard />
      </Box>
    </Box>
  );
};

export default BalancePage;

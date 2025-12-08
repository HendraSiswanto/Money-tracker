import { Box, SimpleGrid } from "@chakra-ui/react";
import IncomeCard from "./balanceComponents/IncomeCard";
import ExpenseCard from "./balanceComponents/ExpenseCard";
import BalanceCard from "./balanceComponents/BalanceCard";
import BarCard from "./balanceComponents/BarCard";


export default function Balance() {
  return (
    <Box p={4}>
      <SimpleGrid columns={3} spacing={3} mb={4}>
        <IncomeCard />
        <ExpenseCard />
        <BalanceCard />
      </SimpleGrid>

      <Box h="260px" mb={4}>
        <BarCard/>
      </Box>

      <SimpleGrid columns={2} spacing={3}>
        
      </SimpleGrid>
    </Box>
  );
}

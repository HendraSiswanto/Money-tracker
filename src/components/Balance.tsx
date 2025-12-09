import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import { StatCard } from "./balanceComponents/StatCard";
import BarCard from "./balanceComponents/BarCard";
import { useTransactions } from "../hooks/useTransactions";
import { BsCoin } from "react-icons/bs";

export default function Balance() {
  const { totalIncome } = useTransactions();
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <StatCard
          icon={BsCoin}
          title="Total Income"
          fontColor="#1C4532"
          value={totalIncome}
          percent={"+6%"}
          iconColor="green.600"
        />
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

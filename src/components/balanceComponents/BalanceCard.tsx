import { Card, CardBody, Text } from "@chakra-ui/react";
import { useTransactions } from "../../hooks/useTransactions";

export default function BalanceCard() {
  const { balance } = useTransactions();
  return (
    <Card bg="#E6F4EA">
      <CardBody textAlign="center">
        <Text fontSize="sm">Total Income</Text>
        <Text fontSize="xl" fontWeight="bold" color="#1C4532">
          Rp {balance.toLocaleString("id-ID")}
        </Text>
      </CardBody>
    </Card>
  );
}

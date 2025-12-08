import { Card, CardBody, Text } from "@chakra-ui/react";
import { useTransactions } from "../../hooks/useTransactions";

export default function ExpenseCard() {
  const { totalExpense } = useTransactions();
  return (
    <Card bg="#E6F4EA">
      <CardBody textAlign="center">
        <Text fontSize="sm">Total Expense</Text>
        <Text fontSize="xl" fontWeight="bold" color="#1C4532">
          Rp {totalExpense.toLocaleString("id-ID")}
        </Text>
      </CardBody>
    </Card>
  );
}

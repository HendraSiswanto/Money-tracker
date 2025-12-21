import { Box, Icon, Text } from "@chakra-ui/react";
import { BsGraphUpArrow } from "react-icons/bs";

type HighestCardProps = {
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense" | "balance";
};

export const HighestCard = ({
  title,
  type,
  amount,
  date,
}: HighestCardProps) => {
  const formatOutcome = (outcome: string) =>
    outcome.charAt(0).toUpperCase() + outcome.slice(1);
  const label =
    type === "income"
      ? "Highest Income"
      : type === "expense"
      ? "Highest Expense"
      : "Highest Balance";
  return (
    <Box
     
      p={7}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      w="100%"
    >
      <Icon
        bgColor="#e4e4e7c3"
        borderRadius="full"
        p={3}
        color="gray.600"
        boxSize="60px"
        as={BsGraphUpArrow as React.ElementType}
      />
      <Text fontWeight="bold" color="gray.600">
        {label}
      </Text>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={type === "income" ? " #1C4532" : type ==="expense"? "#45241cff" : "gray.600"}
      >
        Rp {amount.toLocaleString("id-ID")}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {formatOutcome(title)}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {new Date(date).toLocaleDateString("id-ID")}
      </Text>
    </Box>
  );
};

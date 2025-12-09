import { Box, Icon, Text } from "@chakra-ui/react";
import { BsGraphUpArrow } from "react-icons/bs";

type HighestCardProps = {
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
};

export const HighestCard = ({
  title,
  type,
  amount,
  date,
}: HighestCardProps) => {
  return (
    <Box
      mt={8}
      mb={4}
      p={7}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      w="270px"
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
        Highest {type === "income" ? "Income" : "Expense"}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color={type === "income" ?" #1C4532" : "#45241cff"}>
        Rp {amount.toLocaleString("id-ID")}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {new Date(date).toLocaleDateString("id-ID")}
      </Text>
    </Box>
  );
};

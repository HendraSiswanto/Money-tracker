import { Card, Flex, Text, Avatar, Box } from "@chakra-ui/react";

interface Props {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  userName?: string;
  userImage?: string;
}

const BalanceCard = ({
  balance,
  totalIncome,
  totalExpense,
  userName = "Guest User",
  userImage = "",
}: Props) => {
  return (
    <Card
      p={5}
      borderRadius="lg"
      bgColor="transparent"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      w="350px"
     
    >
      <Flex align="center" gap={3} mb={3}>
        <Avatar name={userName} src={userImage} />
        <Text fontWeight="bold" color="#1C4532" fontSize="lg">
          {userName}
        </Text>
      </Flex>

      <Text fontSize="sm" color="gray.600">
        Balance
      </Text>
      <Text fontSize="3xl" fontWeight="bold" color="#1C4532" mb={3}>
        Rp {balance.toLocaleString("id-ID")}
      </Text>

      <Flex justify="space-between">
        <Box textAlign="left">
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Income
          </Text>
          <Text fontSize="lg" color="green.600" fontWeight="bold">
            + Rp {totalIncome.toLocaleString("id-ID")}
          </Text>
        </Box>

        <Box textAlign="right">
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Expense
          </Text>
          <Text fontSize="lg" color="red.600" fontWeight="bold">
            - Rp {totalExpense.toLocaleString("id-ID")}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default BalanceCard;

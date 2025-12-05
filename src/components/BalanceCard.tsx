import { Card, Flex, Text, Avatar, Box } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#1C4532", "#45241cff"],
        borderWidth: 0,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
  return (
    <Card
      p={5}
      borderRadius="lg"
      bgColor="transparent"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      w="350px"
      h="380px"
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
          <Flex align="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="#1C4532" />
            <Text fontSize=" md" fontWeight="medium" color="gray.600">
              Income
            </Text>
          </Flex>
          <Text fontSize="lg" color="#1C4532" fontWeight="bold">
            + Rp {totalIncome.toLocaleString("id-ID")}
          </Text>
        </Box>

        <Box textAlign="right">
          <Flex align="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="#45241cff" />
            <Text fontSize="md" fontWeight="medium" color="gray.600">
              Expense
            </Text>
          </Flex>
          <Text fontSize="lg" color="#45241cff" fontWeight="bold">
            - Rp {totalExpense.toLocaleString("id-ID")}
          </Text>
        </Box>
      </Flex>

      <Box w="120px" mx="auto" mt={5}>
        <Pie data={chartData} options={chartOptions} />
      </Box>
    </Card>
  );
};

export default BalanceCard;

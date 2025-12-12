import { Box, Flex, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTransactions } from "../../hooks/useTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  selectedMonth: number;
};

export default function ReportOverview({ selectedMonth }: Props) {
  const { transactions } = useTransactions();

  const filtered = transactions.filter((t) => {
    return new Date(t.date).getMonth() === selectedMonth;
  });

  const income = filtered
    .filter((t) => t.outcome === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = filtered
    .filter((t) => t.outcome === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const data = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        data: [income, expense, balance],
        backgroundColor: ["#1C4532", "#45241cff", "#828282"],
        hoverBackgroundColor: ["#1c4532be", "#45241c9d", "#828282d2"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#1C4532",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
          font: {
            size: 13,
          },
        },
      },
    },
    cutout: "65%",
    responsive: true,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      mt={6}
      h="220px"
      alignItems="center"
      flexDir="column"
      alignSelf="center"
    >
      <Text pt={9} fontWeight="bold" color="gray.700">
        Report Overview
      </Text>

      <Flex>
        <Box width="200px">
          <Doughnut data={data} options={options} />
        </Box>

        <Flex flexDir="column" justifyContent="center" gap="2px">
          <Text fontSize="sm" fontWeight="bold" color="#1C4532">
            Rp {income.toLocaleString()}
          </Text>

          <Text fontSize="sm" fontWeight="bold" color="#1C4532">
            Rp {expense.toLocaleString()}
          </Text>

          <Text fontSize="sm" fontWeight="bold" color="#1C4532">
            Rp {balance.toLocaleString()}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

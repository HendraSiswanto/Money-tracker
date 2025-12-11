import { Box, Flex, Select, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import dataExpense from "../../data/dataExpense";
import dataIncome from "../../data/dataIncome";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarCardProps = {
  active: "income" | "expense" | "balance";
  transactions: any[];
};

export default function BarCard({ active, transactions }: BarCardProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const categories =
    active === "income"
      ? dataIncome.map((c) => c.in)
      : dataExpense.map((c) => c.out);

  const filtered = transactions.filter((t) => {
    const month = new Date(t.date).getMonth();
    return month === selectedMonth;
  });
  const categoryTotals: Record<string, number> = {};
  categories.forEach((c) => (categoryTotals[c] = 0));

  filtered.forEach((t) => {
    if (categoryTotals[t.type] !== undefined) {
      categoryTotals[t.type] += t.amount;
    }
  });

  const labels = categories;
  const values = labels.map((l) => categoryTotals[l]);

  const data = {
    labels,
    datasets: [
      {
        label:
          active === "income"
            ? "Income"
            : active === "expense"
            ? "Expense"
            : "Balance",
        data: values,
        backgroundColor:
          active === "income"
            ? "#1C4532"
            : active === "expense"
            ? "#45241cff"
            : "#4A5568",
        borderRadius: 6,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#777" },
      },
      y: {
        ticks: { color: "#999" },
        grid: { color: "#e5e5e5" },
      },
    },
  };

  return (
    <Box
      width="full"
      height="320px"
      p={6}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
    >
      <Flex
        flexDirection={"row"}
        alignItems="center"
        mb={4}
        justifyContent="space-between"
      >
        <Text fontWeight="bold" color="gray.600">
          {active === "income"
            ? "Income By Category"
            : active === "expense"
            ? "Expense By Category"
            : "Balance By Category"}
        </Text>
        <Select
          width="200px"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("en-US", { month: "long" })}
            </option>
          ))}
        </Select>
      </Flex>
      <Box h="80%">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
}

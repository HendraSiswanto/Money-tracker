import { Box, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarCardProps = {
  active: "income" | "expense" | "balance";
  transactions: any[];
};

export default function BarCard({ active, transactions }: BarCardProps) {
 const categoryTotals: Record<string, number> = {};

  transactions.forEach((t) => {
    const category = t.category || "Unknown";

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    if (active === "balance") {
      categoryTotals[category] +=
        t.outcome === "income" ? t.amount : -t.amount;
    } else if (t.outcome === active) {
      categoryTotals[category] += t.amount;
    }
  });

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const data = {
    labels,
    datasets: [
      {
        label:
          active === "income"
            ? "Income by Category"
            : active === "expense"
            ? "Expense by Category"
            : "Balance by Category",
        data: values,
        backgroundColor:
          active === "income"
            ? "#1C4532"
            : active === "expense"
            ? "#45241cff"
            : "#4A5568",
        borderRadius: 6,
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
  height="280px"
      p={6}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
    >
      <Text fontWeight="bold" mb={4} color="gray.600">
        {active === "income"
          ? "Income By Category"
          : active === "expense"
          ? "Expense By Category"
          : "Balance By Category"}
      </Text>
      <Box h="85%">

      <Bar data={data} options={options} />
      </Box>
    </Box>
  );
}

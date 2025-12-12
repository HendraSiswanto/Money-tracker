import { Box, Flex, Select, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartEvent, ActiveElement } from "chart.js";
import dataExpense from "../../data/dataExpense";
import dataIncome from "../../data/dataIncome";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarCardProps = {
  active: "income" | "expense" | "balance";
  transactions: any[];
   selectedMonth: number;
  onMonthChange: (m: number) => void;
};

export default function BarCard({ active, transactions ,selectedMonth, onMonthChange}: BarCardProps) {
 
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
        categoryPercentage: 0.3,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    onHover: (event: ChartEvent, chartElement: ActiveElement[]) => {
      if (chartElement.length > 0) {
        (event.native?.target as HTMLElement).style.cursor = "pointer";
      } else {
        (event.native?.target as HTMLElement).style.cursor = "default";
      }
    },

    plugins: {
      legend: {
        onHover: (event: ChartEvent) => {
          (event.native?.target as HTMLElement).style.cursor = "pointer";
        },
        onLeave: (event: ChartEvent) => {
          (event.native?.target as HTMLElement).style.cursor = "default";
        },
      },
    },
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
      height="290px"
      p={5}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
    >
      <Flex
        flexDirection={"row"}
        alignItems="center"
        mb={2}
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
          cursor="pointer"
          bg="gray.600"
          width="200px"
          value={selectedMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
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

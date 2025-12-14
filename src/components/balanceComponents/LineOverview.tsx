import { Box, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

type LineOverviewProps = {
  active: "income" | "expense" | "balance";
  transactions: any[];
  selectedMonth: number;
};

export default function ExpenseActivity({
  active,
  transactions,
  selectedMonth,
}: LineOverviewProps) {
  const monthDates = transactions
    .filter((t) => new Date(t.date).getMonth() === selectedMonth)
    .map((t) => new Date(t.date).getDate())
    .sort((a, b) => a - b);

  const uniqueDates = [...new Set(monthDates)];

  const dailyTotals = uniqueDates.map((day) => {
    const dayTrans = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === selectedMonth && d.getDate() === day;
    });

    if (active === "income") {
      return dayTrans
        .filter((t) => t.outcome === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    }

    if (active === "expense") {
      return dayTrans
        .filter((t) => t.outcome === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    }
    const income = dayTrans
      .filter((t) => t.outcome === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = dayTrans
      .filter((t) => t.outcome === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return income - expense;
  });
  const monthName = new Date(2025, selectedMonth).toLocaleString("en-US", {
    month: "long",
  });

  const data = {
    labels: uniqueDates.map((d) => `${d}`),
    datasets: [
      {
        label:
          active === "income"
            ? `Daily Income in ${monthName}`
            : active === "expense"
            ? `Daily Expense in ${monthName}`
            : `Your Balance In ${monthName}`,
        data: dailyTotals,
        fill: false,
        borderColor:
          active === "income"
            ? "#1C4532"
            : active === "expense"
            ? "#45241cff"
            : "#1A202C",
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor:
          active === "income"
            ? "#1C4532"
            : active === "expense"
            ? "#45241cff"
            : "#1A202C",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#444",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#666" },
        grid: { color: "#e5e5e5" },
      },
      x: {
        ticks: { color: "#666" },
        grid: { display: false },
      },
    },
  };

  return (
    <Box
      mt={6}
      p={6}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      height="220px"
    >
      <Line data={data} options={options} />
    </Box>
  );
}

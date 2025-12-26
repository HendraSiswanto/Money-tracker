import React from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const LineCard: React.FC = () => {
  const { transactions = [] } = useTransactions();
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const labels = sorted.map((t) =>
    new Date(t.date).toLocaleDateString("en-CA")
  );

  const incomeData = sorted.map((t) =>
    t.outcome === "income" ? t.amount : null
  );

  const expenseData = sorted.map((t) =>
    t.outcome === "expense" ? t.amount : null
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "#1c4532db",
        backgroundColor: "#1C4532",
        tension: 0.3,
        spanGaps: true,
        pointRadius: 3,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "#45241cd4",
        backgroundColor: "#45241cff",
        tension: 0.3,
        spanGaps: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context: any) => `Rp ${context.raw.toLocaleString("id-ID")}`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineCard;

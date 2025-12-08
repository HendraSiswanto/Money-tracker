
import { useTransactions } from "../../hooks/useTransactions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarCard = () => {
  const { transactions } = useTransactions();

  const incomeTotal = transactions
    .filter((t) => t.outcome === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.outcome === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Balance Comparison",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#1C4532", "#8B0000"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `Rp ${context.raw.toLocaleString("id-ID")}`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarCard;

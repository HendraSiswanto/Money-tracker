import { Doughnut } from "react-chartjs-2";
import { useTransactions } from "../../hooks/useTransactions";

const DoughnutCard = () => {
  const { totalExpense, totalIncome } = useTransactions();

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#1C4532", "#8B0000"],
        hoverOffset: 6,
      },
    ],
  };
  return <Doughnut data={chartData} ></Doughnut>
};

export default DoughnutCard;

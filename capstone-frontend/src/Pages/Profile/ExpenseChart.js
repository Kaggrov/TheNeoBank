import React, { useEffect, useState } from "react";
import axios from "../../Services/axios";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({transactionPosted}) => {
  const user = useSelector((state) => state.userReducer.user);
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [transactions, setTransactions] = useState([]);

  const calculateMonthlyExpenses = (transactions) => {
    const monthlyExpensesData = {};
    transactions.forEach((transaction,ind) => {
      const dateParts = transaction.timeStamp.split("-");
      const monthYear = ind;
      const amount = parseFloat(transaction.amount);

      if (!isNaN(amount)) {
        if (!monthlyExpensesData[monthYear]) {
          monthlyExpensesData[monthYear] = 0;
        }
        monthlyExpensesData[monthYear] += amount;
      }
    });
    console.log(monthlyExpensesData)
    setMonthlyExpenses(monthlyExpensesData);
  };

  useEffect(() => {
    axios
      .get("transactions/sender/" + user.customerId)
      .then((response) => {
        setTransactions(response.data);
        calculateMonthlyExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    console.log("Chart")
  }, [transactionPosted]);

  const labels = Object.keys(monthlyExpenses);
  const data = Object.values(monthlyExpenses);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Transactions",
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div >
        <Line data={chartData}/>
    </div>
  );
};

export default ExpenseChart;

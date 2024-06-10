import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import "./Barchart.css";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("June"); // Default month
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/barchart/getBarChartData", {
        params: {
          month: selectedMonth,
        },
      });
      const data = response.data;

      if (data) {
        const labels = Object.keys(data);
        const values = Object.values(data);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Number of Items",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        setChartData({
          labels: [],
          datasets: [],
        });
      }
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="bar-chart-container">
      <h2>Bar Chart</h2>
      <div className="month-dropdown">
        <label htmlFor="month-select">Select Month:</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className="chart">
        {chartData ? (
          <Bar data={chartData} />
        ) : (
          <p>No data available for the selected month.</p>
        )}
      </div>
    </div>
  );
};

export default Barchart;

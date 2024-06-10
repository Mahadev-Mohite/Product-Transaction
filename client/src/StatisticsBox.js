import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StatisticsBox.css";
const StatisticsBox = () => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [month, setMonth] = useState("3");

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/statistics/getStatistics",
        {
          params: { month },
        }
      );
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="main">
      <div>
        <label>
          Select Month:
          <select value={month} onChange={handleMonthChange}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </label>
      </div>
      <div className="statistics-box">
        <div className="statistics-item">
          <h4>Total Sale Amount:</h4>
          <p>${statistics.totalSaleAmount.toFixed(2)}</p>
        </div>
        <div className="statistics-item">
          <h4>Total Sold Items:</h4>
          <p>{statistics.totalSoldItems}</p>
        </div>
        <div className="statistics-item">
          <h4>Total Not Sold Items:</h4>
          <p>{statistics.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;

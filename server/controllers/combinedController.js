const Product = require("../models/product");
const axios = require("axios");

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;
    console.log("query", req.query);

    if (!month) {
      return res
        .status(400)
        .json({ message: "Month query parameter is required" });
    }

    //base URL for your API
    const baseURL = "http://localhost:8000/api/v1";

    // Fetch data from the three APIs
    const [statisticsData, barChartData, pieChartData] = await Promise.all([
      axios.get(`${baseURL}/statistics/getStatistics?month=${month}`),
      axios.get(`${baseURL}/barchart/getBarChartData?month=${month}`),
      axios.get(`${baseURL}/piechart/getPieChartData?month=${month}`),
    ]);

    // Combine the responses
    const combinedData = {
      statistics: statisticsData.data,
      barChart: barChartData.data,
      pieChart: pieChartData.data,
    };

    // Send the combined response
    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getCombinedData,
};

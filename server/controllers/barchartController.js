const Product = require("../models/product");

const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).send("Month parameter is required.");
    }

    // Convert month name to month number (0-11)
    const monthNumber = new Date(`${month} 1, 2023`).getMonth();

    // Define the price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    //object to store the count for each price range
    const barChartData = {};

    // Iterate over each price range and count the number of items in that range
    for (const range of priceRanges) {
      const count = await Product.countDocuments({
        price: { $gte: range.min, $lt: range.max },
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber + 1] }, // +1 because $month returns 1-12
      });
      barChartData[`${range.min} - ${range.max}`] = count;
    }

    console.log("Bar chart data:", barChartData); // Log the data

    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getBarChartData,
};

const Product = require("../models/product");

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res
        .status(400)
        .json({ message: "Month query parameter is required" });
    }

    // Convert the provided month into a start and end date, ignoring the year
    const monthNumber = parseInt(month, 10);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }

    // Aggregation pipeline to get the count of items for each category
    const pieChartData = await Product.aggregate([
      {
        $match: {
          // Use $expr to match the month part of the date
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getPieChartData,
};

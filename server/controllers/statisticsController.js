const Product = require("../models/product");

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    // Parse the month query parameter into month
    const selectedMonth = parseInt(month);

    // Query to get total sale amount of selected month
    const totalSaleAmount = await Product.aggregate([
      {
        $addFields: {
          saleMonth: { $month: "$dateOfSale" }, // Extract the month from dateOfSale
        },
      },
      {
        $match: {
          saleMonth: selectedMonth,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
    ]);

    // Query to get total number of sold items of selected month
    const totalSoldItems = await Product.countDocuments({
      dateOfSale: { $gte: new Date(0), $lte: new Date() }, // Consider all dates
    });

    // Query to get total number of not sold items of selected month
    const totalNotSoldItems = await Product.countDocuments({
      dateOfSale: null,
    });

    res.status(200).json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalSaleAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getStatistics,
};

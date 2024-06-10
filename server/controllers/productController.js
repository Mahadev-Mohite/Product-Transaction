const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const { search, page = 1, perPage = 10 } = req.query;

    const query = {};
    if (search) {
      query.title = { $regex: /\bmens\b(?!.*\b(?:women|female)\b)/i };
    }

    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getProducts,
};

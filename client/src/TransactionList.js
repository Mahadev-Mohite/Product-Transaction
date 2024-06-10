import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionList.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("3");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/getProducts",
        {
          params: {
            month,
            search,
            page,
            perPage,
          },
        }
      );
      setTransactions(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    // setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="outer-Transaction">
      <h1>Transaction List</h1>
      <div className="search-container">
        <div>
          {" "}
          <label htmlFor="month-select">Select Month:</label>
          <select id="month-select" value={month} onChange={handleMonthChange}>
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
        </div>
        <div className="mr">
          <label htmlFor="search-input">Search Transaction:</label>
          <input
            type="text"
            id="search-input"
            value={search}
            onChange={handleSearchChange}
            className="searchbox"
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>
                {" "}
                <img src={transaction.image} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page * perPage >= total}>
          Next 
        </button>
        <button type="">
          <p>{page}</p>
        </button>
      </div>
    </div>
  );
};

export default TransactionList;

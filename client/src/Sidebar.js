import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; 
import { IoCaretForward } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { RiBarChart2Line } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";


function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/TransactionList">
          <TbTransactionDollar className="icon" />
            Transactions
            <IoCaretForward className="arrow" />
          </Link>
        </li>
        <li>
          <Link to="/Statistics">
            <BiCategory className="icon" />
            Statistics
            <IoCaretForward className="arrow" />
          </Link>
        </li>
        <li>
          <Link to="/Barchart">
            <RiBarChart2Line className="icon" />
              Barchart
           
            <IoCaretForward className="arrow" />
          </Link>
        </li>
        


      </ul>
    </div>
  );
}

export default Sidebar;

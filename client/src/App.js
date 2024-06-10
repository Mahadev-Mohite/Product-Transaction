import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionList from "./TransactionList";
import Statistics from "./StatisticsBox";
import Product from "./Combined";
import Barchart from "./Barchart";
import HomeLayout from "./layout/HomeLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<TransactionList />} />
          <Route path="/TransactionList" element={<TransactionList />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Barchart" element={<Barchart />} />
          
         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import this
import SignUp from "./SignUp";
import OtpVerification from "./OtpVerification";
import Login from "./Login";
import Dashboard from "./Dashboard";
import DashboardContent from "./DashboardContent";
import WatchList from "./WatchList";
import Portfolio from "./Portfolio";

const clientId = "115452196162-sdggb726rtif8ghoefet2rlmgg6m1gp9.apps.googleusercontent.com";

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [totalBalance, setTotalBalance] = useState(10000);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);

  const handleBuyStock = (stock) => {
    setPortfolio((prev) => {
      const existing = prev.find((item) => item.symbol === stock.symbol);
      if (existing) {
        return prev.map((item) =>
          item.symbol === stock.symbol
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalInvested: item.totalInvested + stock.price,
                averageCost: (item.totalInvested + stock.price) / (item.quantity + 1),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...stock,
          quantity: 1,
          totalInvested: stock.price,
          averageCost: stock.price,
        },
      ];
    });
    setTotalBalance((prev) => prev - stock.price);
    alert(`${stock.symbol} (Qty: 1) added to portfolio!`);
  };

  const handleSellStock = (index) => {
    setPortfolio((prev) => {
      const stock = prev[index];
      const profitLossPerShare = stock.price - stock.averageCost;

      if (profitLossPerShare > 0) {
        setTotalReturn((prev) => prev + profitLossPerShare);
      } else {
        setTotalLoss((prev) => prev - profitLossPerShare);
      }

      setTotalBalance((prev) => prev + stock.price);

      if (stock.quantity > 1) {
        return prev.map((item, i) =>
          i === index
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalInvested: item.totalInvested - item.averageCost,
              }
            : item
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardContent />} />
            <Route
              path="watchlist"
              element={<WatchList searchText="" onBuy={handleBuyStock} />}
            />
            <Route
              path="portfolio"
              element={
                <Portfolio
                  portfolio={portfolio}
                  totalBalance={totalBalance}
                  totalReturn={totalReturn}
                  totalLoss={totalLoss}
                  onSell={handleSellStock}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

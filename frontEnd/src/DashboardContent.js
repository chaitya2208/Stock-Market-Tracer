import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./DashboardContent.css";
import TradingChart from "./tradingChart";

function DashboardContent() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const portfolioScrollRef = useRef(null);
  const favoriteScrollRef = useRef(null);

  const scrollLeft = (ref) => ref.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = (ref) => ref.current?.scrollBy({ left: 200, behavior: "smooth" });

  useEffect(() => {
    const fetchSymbols = async () => {
      const apiKey = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"; 
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`);
        console.log(response.data);
        const lines = response.data.split("\n").slice(1, 50);
        const symbols = [
          "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NFLX", "META", "NVDA",
          ...lines.map((line) => line.split(",")[0]?.trim()).filter(Boolean)
        ];

        const fetchStockData = async (symbols, setDataCallback) => {
          let results = [];
          for (let i = 0; i < symbols.length; i++) {
            try {
              const res = await axios.get(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbols[i]}&apikey=${apiKey}`
              );
              const data = res.data["Global Quote"];
              if (data && data["05. price"] && data["04. low"]) {
                results.push({
                  name: symbols[i],
                  price: parseFloat(data["05. price"]),
                  percentage: (
                    ((parseFloat(data["05. price"]) - parseFloat(data["04. low"])) /
                      parseFloat(data["04. low"])) *
                    100
                  ).toFixed(2),
                });
              }
            } catch (error) {
              console.error(`Error fetching data for ${symbols[i]}:`, error);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s delay to prevent rate limiting
          }
          setDataCallback(results);
          setIsLoading(false);
        };

        fetchStockData(symbols, setPortfolioData);
        fetchStockData(["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NFLX", "META", "NVDA"], setFavoriteData);
      } catch (error) {
        console.error("Error fetching symbols:", error);
        setIsLoading(false);
      }
    };

    fetchSymbols();
  }, []);

  const renderStockSection = (title, data, ref) => (
    <section className="portfolio-section">
      <h2>{title}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <button className="scroll-btn left" onClick={() => scrollLeft(ref)}>⬅</button>
          <div className="scroll-container" ref={ref}>
            <div className="scroll-content">
              {data.map(({ name, price, percentage }, index) => (
                <div key={index} className="portfolio-card">
                  <div>
                    <p className="card-title">{name}</p>
                    <p className="card-value">${price}</p>
                    <p className={`stock-percentage ${percentage < 0 ? "negative" : "positive"}`}>{percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight(ref)}>➡</button>
        </div>
      )}
    </section>
  );

  return (
    <main className="main-content">
      {renderStockSection("My Portfolio", portfolioData, portfolioScrollRef)}

      <section className="stock-info">
        <div className="card">
          <div className="chart-placeholder">
            <TradingChart />
          </div>
        </div>
      </section>

      {renderStockSection("My Favorites", favoriteData, favoriteScrollRef)}
    </main>
  );
}

export default DashboardContent;
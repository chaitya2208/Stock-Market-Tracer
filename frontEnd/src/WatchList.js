// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StockChart from "./stock-chart";

// const API_KEY = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"; // Replace with your Alpha Vantage API key

// function WatchList({ searchText, onBuy }) {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const fetchStockData = async () => {
//     const symbols = ["MSFT", "AAPL", "GOOGL", "AMZN", "TSLA", "NFLX", "META", "NVDA"];
//     try {
//       const stockPromises = symbols.map(async (symbol) => {
//         const res = await axios.get(
//           `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
//         );
//         const data = res.data["Global Quote"];

//         const chartRes = await axios.get(
//           `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
//         );

//         const chartData = chartRes.data["Time Series (5min)"];
//         const formattedChartData = chartData
//           ? Object.entries(chartData).map(([time, values]) => ({
//               time,
//               price: parseFloat(values["4. close"]),
//             }))
//           : [];

//         return {
//           id: symbol,
//           symbol: symbol,
//           name: symbol,
//           price: parseFloat(data["05. price"]),
//           balance: parseFloat(data["04. low"]),
//           trend:
//             ((parseFloat(data["05. price"]) - parseFloat(data["04. low"])) /
//               parseFloat(data["04. low"])) *
//             100,
//           chartData: formattedChartData,
//         };
//       });

//       const stockResults = await Promise.all(stockPromises);
//       setStocks(stockResults);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching stock data:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStockData();
//     const interval = setInterval(fetchStockData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(clockInterval);
//   }, []);

//   const handleBuy = (stock) => {
//     onBuy(stock);
//   };

//   const filteredStocks = stocks.filter((stock) =>
//     stock.symbol.toLowerCase().includes(searchText.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="text-center py-8 text-gray-600">Loading stocks...</div>
//     );
//   }

//   return (
//     <div className="w-screen h-full overflow-x-auto bg-white shadow-md rounded-lg p-6">
//       <div className="text-right text-gray-500 text-sm font-medium mb-4">
//         {currentTime.toLocaleString()}
//       </div>

//       <div className="w-full">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b bg-gray-50">
//               {["Stock", "Price", "Change", "Balance", "Chart", "Action"].map(
//                 (heading) => (
//                   <th
//                     key={heading}
//                     className="px-6 py-4 text-left text-sm font-medium text-gray-600"
//                   >
//                     {heading}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStocks.map((stock) => (
//               <tr
//                 key={stock.id}
//                 className="border-b hover:bg-gray-100 transition"
//               >
//                 <td className="px-6 py-4 flex items-center gap-4">
//                   <div>
//                     <div className="font-medium">{stock.symbol}</div>
//                     <div className="text-xs text-gray-500">{stock.name}</div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 font-medium">
//                   $ {stock.price.toFixed(2)}
//                 </td>
//                 <td
//                   className={`px-6 py-4 font-medium ${
//                     stock.trend > 0 ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {stock.trend > 0 ? "+" : ""}
//                   {stock.trend.toFixed(2)}%
//                 </td>
//                 <td className="px-6 py-4 font-medium">
//                   $ {stock.balance.toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="h-10 w-24">
//                     {stock.chartData.length > 0 ? (
//                       <StockChart data={stock.chartData} trend={stock.trend} />
//                     ) : (
//                       <span className="text-gray-400 text-xs">No chart data</span>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 min-w-[160px]">
//                   <button
//                     className="w-36 rounded bg-green-600 px-6 py-3 text-sm text-white"
//                     onClick={() => handleBuy(stock)}
//                   >
//                     Buy
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default WatchList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import StockChart from "./stock-chart";

const API_KEY = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"; // Get from Alpha Vantage

function WatchList({ searchText, onBuy }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchStockData = async () => {
    const symbols = ["MSFT", "AAPL", "GOOGL", "AMZN", "TSLA", "NFLX", "META", "NVDA"];
    try {
      const stockPromises = symbols.map(async (symbol, index) => {
        await new Promise(resolve => setTimeout(resolve, index * 300)); // Add delay
        
        const [quoteRes, chartRes] = await Promise.all([
          axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`),
          axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`)
        ]);

        const quoteData = quoteRes.data["Global Quote"] || {};
        const chartData = chartRes.data["Time Series (5min)"] || {};

        const formattedChartData = Object.entries(chartData)
          .slice(0, 10)
          .map(([time, values]) => ({
            time: new Date(time).getTime(),
            value: parseFloat(values["4. close"])
          }));

        return {
          id: symbol,
          symbol,
          name: symbol,
          price: parseFloat(quoteData["05. price"]) || 0,
          low: parseFloat(quoteData["04. low"]) || 0,
          trend: parseFloat(
            ((parseFloat(quoteData["05. price"]) - parseFloat(quoteData["04. low"])) /
            parseFloat(quoteData["04. low"])) * 100 || 0
          ).toFixed(2),
          chartData: formattedChartData
        };
      });

      const stockResults = await Promise.all(stockPromises);
      setStocks(stockResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const handleBuy = (stock) => {
    onBuy(stock);
    alert(`${stock.symbol} added to portfolio!`);
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading stocks...</div>;
  }

  return (
    <div className="w-full min-w-0 bg-white shadow-md rounded-lg p-6">
      <div className="text-right text-gray-500 text-sm font-medium mb-4">
        {currentTime.toLocaleString()}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              {["Stock", "Price", "Change", "Low", "Chart", "Action"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr key={stock.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-xs text-gray-500">{stock.name}</div>
                </td>
                <td className="px-4 py-3 font-medium">${stock.price.toFixed(2)}</td>
                <td className={`px-4 py-3 font-medium ${stock.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                  {stock.trend > 0 ? "+" : ""}
                  {stock.trend}%
                </td>
                <td className="px-4 py-3 font-medium">${stock.low.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="h-16 w-48">
                    {stock.chartData.length > 0 ? (
                      <StockChart data={stock.chartData} trend={stock.trend} />
                    ) : (
                      <span className="text-gray-400 text-xs">Loading chart...</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleBuy(stock)}
                    className="w-20 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded text-large transition-colors"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
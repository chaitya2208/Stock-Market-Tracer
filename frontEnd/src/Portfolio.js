import { Trash2 } from "lucide-react";

function Portfolio({ portfolio, totalBalance, totalReturn, totalLoss, onSell }) {
  return (
    <div className="w-screen min-w-0 h-full flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-green-800 mb-1">Total Balance</h2>
            <p className="text-xl font-bold text-green-600">${totalBalance.toFixed(2)}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-blue-800 mb-1">Total Return</h2>
            <p className="text-xl font-bold text-blue-600">${totalReturn.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-red-800 mb-1">Total Loss</h2>
            <p className="text-xl font-bold text-red-600">${totalLoss.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto px-6 pb-6">
        <table className="min-w-full w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Invested</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.length > 0 ? (
              portfolio.map((stock, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{stock.symbol}</td>
                  <td className="px-4 py-3">${stock.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{stock.quantity}</td>
                  <td className="px-4 py-3">${stock.totalInvested.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSell(index)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Sell
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No stocks in portfolio
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
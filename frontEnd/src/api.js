// Mock data for the stocks
const mockStocks = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: 201.01,
      balance: 201.01,
      chartData: [50, 60, 45, 70, 65, 75, 80],
      logo: "A",
      logoBackground: "bg-gray-900 text-white",
    },
    {
      id: "2",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: 201.01,
      balance: 201.01,
      chartData: [50, 60, 45, 70, 65, 75, 80],
      logo: "A",
      logoBackground: "bg-blue-500 text-white",
    },
    {
      id: "3",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: -201.01,
      balance: 201.01,
      chartData: [80, 75, 65, 70, 45, 60, 50],
      logo: "A",
      logoBackground: "bg-red-500 text-white",
    },
    {
      id: "4",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: 201.01,
      balance: 201.01,
      chartData: [50, 60, 45, 70, 65, 75, 80],
      logo: "A",
      logoBackground: "bg-indigo-500 text-white",
    },
    {
      id: "5",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: -201.01,
      balance: 201.01,
      chartData: [80, 75, 65, 70, 45, 60, 50],
      logo: "A",
      logoBackground: "bg-blue-500 text-white",
    },
    {
      id: "6",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: 201.01,
      balance: 201.01,
      chartData: [50, 60, 45, 70, 65, 75, 80],
      logo: "A",
      logoBackground: "bg-gray-900 text-white",
    },
    {
      id: "7",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: 201.01,
      balance: 201.01,
      chartData: [50, 60, 45, 70, 65, 75, 80],
      logo: "A",
      logoBackground: "bg-orange-500 text-white",
    },
    {
      id: "8",
      symbol: "AAPL",
      name: "Apple Inc",
      price: 201.01,
      trend: -201.01,
      balance: 201.01,
      chartData: [80, 75, 65, 70, 45, 60, 50],
      logo: "A",
      logoBackground: "bg-blue-500 text-white",
    },
  ]
  
  // Function to fetch stock data
  export async function fetchStockData() {
    // In a real application, this would be an API call to a backend service
    // For this example, we'll just return the mock data after a short delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStocks)
      }, 500)
    })
  }
  
  // Function to add a stock to the watchlist
  export async function addToWatchlist(stockId) {
    // In a real application, this would be an API call to a backend service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 500)
    })
  }
  
  // Function to buy a stock
  export async function buyStock(stockId, amount) {
    // In a real application, this would be an API call to a backend service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transaction: {
            id: Math.random().toString(36).substring(7),
            stockId,
            amount,
            price: mockStocks.find((s) => s.id === stockId)?.price || 0,
            timestamp: new Date().toISOString(),
          },
        })
      }, 500)
    })
  }
  
  
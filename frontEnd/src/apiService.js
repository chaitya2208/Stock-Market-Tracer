import axios from 'axios';

const API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

export const getStockData = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data['Time Series (5min)'];
    return Object.entries(data).map(([time, values]) => ({
      time,
      open: values['1. open'],
      high: values['2. high'],
      low: values['3. low'],
      close: values['4. close'],
      volume: values['5. volume'],
    }));
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

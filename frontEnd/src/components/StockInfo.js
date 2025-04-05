// src/components/StockInfo.js
import React from 'react';

const StockInfo = ({ stock }) => {
    if (!stock) return <div>No stock data available.</div>;

    return (
        <div className="stock-info">
            <div className="stock-name">{stock.name} ({stock.symbol})</div>
            <div className="stock-price">${stock.price}</div>
            <div className={`stock-percentage ${stock.percentage < 0 ? 'negative' : ''}`}>
                {stock.percentage}%
            </div>
        </div>
    );
};

export default StockInfo;

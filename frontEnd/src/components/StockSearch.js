// src/components/StockSearch.js
import React, { useState } from 'react';

const StockSearch = ({ onSearch }) => {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (symbol.trim()) {
            onSearch(symbol);
            setSymbol('');
        }
    };

    return (
        <div className="stock-search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default StockSearch;

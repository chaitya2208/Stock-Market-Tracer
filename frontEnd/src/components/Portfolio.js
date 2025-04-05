// src/components/Portfolio.js
import React from 'react';

const Portfolio = ({ portfolio }) => (
    <div className="portfolio">
        <h2>Portfolio</h2>
        {Object.entries(portfolio).length === 0 ? (
            <p>Your portfolio is empty.</p>
        ) : (
            <ul>
                {Object.entries(portfolio).map(([symbol, data]) => (
                    <li key={symbol}>
                        {symbol} - {data.shares} shares @ ${data.price}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default Portfolio;

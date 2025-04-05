// import { useEffect, useRef } from "react";

// function StockChart({ data, trend }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const dpr = window.devicePixelRatio || 1;
//     const rect = canvas.getBoundingClientRect();
//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;
//     ctx.scale(dpr, dpr);

//     ctx.clearRect(0, 0, rect.width, rect.height);

//     const color = trend >= 0 ? "#22c55e" : "#ef4444";
//     ctx.strokeStyle = color;
//     ctx.lineWidth = 2;

//     ctx.fillStyle = trend >= 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)";
//     ctx.fillRect(0, 0, rect.width, rect.height);

//     const padding = 5;
//     const chartWidth = rect.width - padding * 2;
//     const chartHeight = rect.height - padding * 2;

//     const minValue = Math.min(...data);
//     const maxValue = Math.max(...data);
//     const valueRange = maxValue - minValue;

//     ctx.beginPath();
//     ctx.moveTo(padding, chartHeight - ((data[0] - minValue) / valueRange) * chartHeight + padding);

//     for (let i = 1; i < data.length; i++) {
//       const x = (i / (data.length - 1)) * chartWidth + padding;
//       const y = chartHeight - ((data[i] - minValue) / valueRange) * chartHeight + padding;
//       ctx.lineTo(x, y);
//     }

//     ctx.stroke();
//   }, [data, trend]);

//   return <canvas ref={canvasRef} className="h-full w-full" />;
// }

// export default StockChart;



import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ data, trend }) {
  const chartData = {
    labels: data.map(d => new Date(d.time).toLocaleTimeString()),
    datasets: [{
      data: data.map(d => d.value),
      borderColor: trend > 0 ? '#16a34a' : '#dc2626',
      borderWidth: 1.5,
      tension: 0.4,
      pointRadius: 0,
    }]
  };

  return (
    <Line 
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }}
    />
  );
}
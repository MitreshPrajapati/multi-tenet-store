"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingProductsChart = () => {
  const data = {
    labels: ["Cabbage", "Watermelon", "Broccoli", "Maize"],
    datasets: [
      {
        label: "Products",
        data: [10, 50, 20, 20],
        backgroundColor: [
          "rgba(0, 0, 255, 0.7)",
          "rgba(255, 0, 221, 0.7)",
          "rgba(2, 139, 71, 0.7)",
          "rgba(0, 0, 0, 0.7)",
        ],
        borderColor: [
          "rgba(0, 0, 255, 0.9)",
          "rgba(255, 0, 221, 0.9)",
          "rgba(2, 139, 71, 0.9)",
          "rgba(0, 0, 0, 0.9)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-blue-100 dark:bg-slate-700 p-8 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Best Selling Charts</h2>
      {/* Chart */}

      <div className="p-4">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default BestSellingProductsChart;

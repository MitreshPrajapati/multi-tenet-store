"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeeklySalesCharts = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const tabs = [
    {
      title: "Sales",
      type: "sales",
      data: {
        labels,
        datasets: [
          {
            label: "Sales",
            data: labels.map(() =>
              faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(73, 235, 253)",
            backgroundColor: "rgba(73, 235, 253, 0.5)",
          },
        ],
      },
    },
    {
      title: "Orders",
      type: "orders",
      data: {
        labels,
        datasets: [
          {
            label: "Orders",
            data: labels.map(() =>
              faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(29, 230, 153)",
            backgroundColor: "rgba(29, 230, 153, 0.5)",
          },
        ],
      },
    },
  ];

  const [chartToDisplay, setChartToDisplay] = useState(tabs[0].type);

  return (
    <div className="bg-blue-100 dark:bg-slate-700 p-8 rounded-lg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white ">Weekly Selling Products</h2>

      <div className="p-4">
        {/* Tabs */}

        <div className="text-sm font-medium text-center text-gray-900 border-b border-gray-900 dark:text-gray-400 dark:border-gray-300">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab, i) => (
              <li className="me-2 list-none" key={i}>
                <button
                  className={
                    chartToDisplay === tab.type
                      ? "inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-orange-500 dark:border-orange-500"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-800 dark:hover:border-gray-300 dark:hover:text-gray-300"
                  }
                  onClick={() => setChartToDisplay(tab.type)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content to display */}
        {tabs.map((tab, i) => {
          if (chartToDisplay === tab.type) {
            return <Line options={options} data={tab.data} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WeeklySalesCharts;

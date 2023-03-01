import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ clicked }) => {
  useEffect(() => {}, [clicked]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "DayWise Scheduling Patterns",
        font: {
          size: 17,
          weight: "bold",
        },
      },
    },
  };

  const data = {
    labels: [
      "12am to 3am",
      "3am to 6am",
      "6am to 9am",
      "9am to 12pm",
      "12pm to 3pm",
      "3pm to 6pm",
      "6pm to 9pm",
      "9pm to 12am",
    ],
    datasets: [
      {
        label: "# of Orders",
        data: [12, 19, 3, 5, 4, 2, 6, 7],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>{clicked != null ? <Pie data={data} options={options} /> : <div></div>}</>
  );
};

export default PieChart;

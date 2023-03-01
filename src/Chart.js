import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ schedule, setClicked }) => {
  const chartRef = useRef();
  const [dates, setDates] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const keys = Object.keys(schedule);
    const values = Object.values(schedule);
    setDates(keys);
    setCount(values);
    setClicked(null);
  }, [schedule]);

  const onClick = (event) => {
    setClicked(dates[getElementAtEvent(chartRef.current, event)[0]["index"]]);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Customer Scheduling Patterns",
        font: {
          size: 17,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "No. of orders scheduled",
          font: {
            size: 17,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 17,
            weight: "bold",
          },
        },
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Orders Scheduled",
        data: count,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          // "rgba(255, 205, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          // "rgb(255, 159, 64)",
          // "rgb(255, 205, 86)",
          // "rgb(75, 192, 192)",
          // "rgb(54, 162, 235)",
          // "rgb(153, 102, 255)",
          // "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar ref={chartRef} data={data} options={options} onClick={onClick} />;
};

export default Chart;

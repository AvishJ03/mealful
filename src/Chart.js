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

const Chart = ({ date, schedule, setClicked }) => {
  const chartRef = useRef();
  const [dates, setDates] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const keys = Object.keys(schedule);
    const values = Object.values(schedule);
    setDates(keys);
    setCount(values);
    setClicked(null);
    // eslint-disable-next-line
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
        text: "Customer Scheduling Patterns for " + date,
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
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgba(53, 162, 235)",
        borderWidth: 2,
      },
    ],
  };

  return <Bar ref={chartRef} data={data} options={options} onClick={onClick} />;
};

export default Chart;

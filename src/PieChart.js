import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ clicked, daywise }) => {
  const [time, setTime] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const keys = Object.keys(daywise);
    const values = Object.values(daywise);
    setTime(keys);
    setCount(values);
  }, [clicked, daywise]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hour Wise Patterns for " + clicked,
        font: {
          size: 17,
          weight: "bold",
        },
      },
    },
  };

  const data = {
    labels: time,
    datasets: [
      {
        label: "No. of Orders",
        data: count,
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
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {clicked != null ? (
        <Pie className="pie" data={data} options={options} />
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
};

export default PieChart;

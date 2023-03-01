import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import data from "./data.json";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BonusChart = () => {
  const [startdate, setStartDate] = useState(
    moment("2021-05-19").format("YYYY-MM-DD")
  );
  const [enddate, setEndDate] = useState(
    moment("2021-05-19").format("YYYY-MM-DD")
  );
  const [obj, setObj] = useState({});

  useEffect(() => {
    const object = {};
    data.forEach((order) => {
      if (
        moment(order.item_date).isBetween(
          moment(startdate),
          moment(enddate),
          undefined,
          "[]"
        )
      ) {
        const diff = parseInt(
          moment(order.item_date).diff(
            moment(order.schedule_time).format("YYYY-MM-DD"),
            "days"
          )
        );
        object[`${diff} day${diff !== 1 ? "s" : ""} prior`] =
          (object[`${diff} day${diff !== 1 ? "s" : ""} prior`] ?? 0) + 1;
      }
    });
    setObj(object);
  }, [startdate, enddate]);

  function getStartDate(e) {
    // console.log(moment("2021-05-19").diff(moment("2021-05-18"), "days"));
    setStartDate(moment(e.target.value).format("YYYY-MM-DD"));
  }

  function getEndDate(e) {
    setEndDate(moment(e.target.value).format("YYYY-MM-DD"));
  }

  function getPercent(counts) {
    let sum = 0;
    const arr = [];

    counts.forEach((item) => {
      sum += item;
    });
    counts.map((count) => {
      arr.push((count * 100) / sum);
      return (count * 100) / sum;
    });
    return arr;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Prior Scheduling Time",
        font: {
          size: 17,
          weight: "bold",
        },
      },
    },
  };

  const data2 = {
    labels: Object.keys(obj),
    datasets: [
      {
        label: "Percent",
        data: getPercent(Object.values(obj)),
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
    <div>
      <h1>Bonus Chart</h1>
      <div className="bonusinp">
        <div>
          <label htmlFor="date" className="label">
            Pick a Start Date:
          </label>
          <input
            name="date"
            className="datepicker"
            type="date"
            value={startdate}
            placeholder="Enter Input-Date"
            onChange={getStartDate}
          />
        </div>
        <div>
          <label htmlFor="date" className="label">
            Pick an End Date:
          </label>
          <input
            name="date"
            className="datepicker"
            value={enddate}
            type="date"
            placeholder="Enter Input-Date"
            onChange={getEndDate}
          />
        </div>
      </div>
      <div className="pie2">
        <Pie data={data2} options={options} />
      </div>
    </div>
  );
};

export default BonusChart;

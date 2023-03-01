import Chart from "./Chart";
import data from "./data.json";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import PieChart from "./PieChart";
import BonusChart from "./BonusChart";

function App() {
  const [date, setDate] = useState(moment("2021-05-19").format("YYYY-MM-DD"));
  const [schedule, setSchedule] = useState({});
  const [clicked, setClicked] = useState(null);
  const [daywise, setdaywise] = useState({});

  useEffect(() => {
    setSchedule({});
    getScheduled();
    // eslint-disable-next-line
  }, [date]);

  useEffect(() => {
    const obj = {};
    data.forEach((order) => {
      if (
        order.item_date === date &&
        moment(order.schedule_time).format("YYYY-MM-DD") === clicked
      ) {
        const time = parseInt(order.schedule_time.split(" ")[1].split(":")[0]);
        // console.log(time);
        if (time >= 0 && time < 3) {
          obj["12am to 3am"] = (obj["12am to 3am"] ?? 0) + 1;
        } else if (time >= 3 && time < 6) {
          obj["3am to 6am"] = (obj["3am to 6am"] ?? 0) + 1;
        } else if (time >= 6 && time < 9) {
          obj["6am to 9am"] = (obj["6am to 9am"] ?? 0) + 1;
        } else if (time >= 9 && time < 12) {
          obj["9am to 12pm"] = (obj["9am to 12pm"] ?? 0) + 1;
        } else if (time >= 12 && time < 15) {
          obj["12pm to 3pm"] = (obj["12pm to 3pm"] ?? 0) + 1;
        } else if (time >= 15 && time < 18) {
          obj["3pm to 6pm"] = (obj["3pm to 6pm"] ?? 0) + 1;
        } else if (time >= 18 && time < 21) {
          obj["6pm to 9pm"] = (obj["6pm to 9pm"] ?? 0) + 1;
        } else if (time >= 21) {
          obj["9pm to 12am"] = (obj["9pm to 12am"] ?? 0) + 1;
        }
      }
    });
    // console.log(obj);
    setdaywise(obj);
  }, [clicked, date]);

  function getDate(e) {
    console.log(moment("2021-05-19").diff(moment("2021-05-18"), "days"));
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
  }

  function getScheduled() {
    const obj = {};
    data.forEach((order) => {
      if (order.item_date === date) {
        if (moment(order.schedule_time).format("YYYY-MM-DD") in obj) {
          obj[moment(order.schedule_time).format("YYYY-MM-DD")] += 1;
        } else {
          obj[moment(order.schedule_time).format("YYYY-MM-DD")] = 1;
        }
      }
    });
    setSchedule(obj);
  }

  return (
    <div className="App">
      <p>Pick a Date:</p>
      <input
        name="date"
        className="datepicker"
        type="date"
        value={date}
        placeholder="Enter Input-Date"
        onChange={getDate}
      />
      <div className="graphs">
        <div className="graph">
          <Chart date={date} schedule={schedule} setClicked={setClicked} />
        </div>
        <div className="">
          <PieChart daywise={daywise} clicked={clicked} />
        </div>
      </div>
      <BonusChart />
    </div>
  );
}

export default App;

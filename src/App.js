import Chart from "./Chart";
import data from "./data.json";
import { useEffect, useState } from "react";
import moment from "moment/moment";

function App() {
  const [date, setDate] = useState(moment("2021-05-19").format("YYYY-MM-DD"));
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    setSchedule({});
    getScheduled();
  }, [date]);

  function getDate(e) {
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
      <input
        type="date"
        value={date}
        placeholder="Enter Input-Date"
        onChange={getDate}
      />
      <div className="graph">
        <Chart schedule={schedule} />
      </div>
    </div>
  );
}

export default App;

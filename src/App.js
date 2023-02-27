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
    console.log(schedule);
  }, [date]);

  function getDate(e) {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    // console.log(moment("2021-05-18 12:39:29").format("YYYY-MM-DD"));
  }

  function getScheduled() {
    data.forEach((order) => {
      // console.log(order);
      if (order.item_date === date) {
        if (moment(order.schedule_time).format("YYYY-MM-DD") in schedule) {
          console.log(moment(order.schedule_time).format("YYYY-MM-DD"));
          // schedule[moment(order.schedule_time).format("YYYY-MM-DD")] += 1;
          setSchedule({
            ...schedule,
            [moment(order.schedule_time).format("YYYY-MM-DD")]:
              moment(order.schedule_time).format("YYYY-MM-DD") + 1,
          });
        } else {
          setSchedule({
            ...schedule,
            [moment(order.schedule_time).format("YYYY-MM-DD")]: 1,
          });
        }
      }
    });
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
        <Chart />
      </div>
    </div>
  );
}

export default App;

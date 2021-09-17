import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";

const TableData = () => {
  const [data, setdata] = useState([]);
  const [ids, setids] = useState([]);
  const [selectedRace, setselectedRace] = useState("");
  const [data3, setdata3] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10")
      .then((response) => {
        setids(response.data.data.next_to_go_ids.slice(0, 5));
        setdata(response.data.data.race_summaries);
      });
    clearData();
  }, []);

  useEffect(() => {
    let dummy =
      data4 &&
      data4.filter((val) => {
        return val.category == selectedRace;
      });

    setdata3(dummy);
  }, [selectedRace]);

  let data2 = [];
  ids.map((val) => {
    Object.keys(data).map((key) => {
      if (val == data[key].race_id) {
        return (data2 = [...data2, data[key]]);
      }
    });
  });

  let data4 = data2.map((val) => {
    if (val.category_id == "161d9be2-e909-4326-8c2c-35ed71fb460b") {
      return { ...val, category: "Harness racing" };
    } else if (val.category_id == "9daef0d7-bf3c-4f50-921d-8e818c60fe61") {
      return { ...val, category: "Greyhound racing" };
    } else if (val.category_id == "4a2788f8-e825-4d36-9894-efd4baf1cfae") {
      return { ...val, category: "Horse racing" };
    } else {
      return val;
    }
  });

  const clearData = () => {
    setTimeout(function () {
      setdata([]);
      setids([]);
      setdata3([]);
      data2 = [];
      data4 = [];
    }, 60000);
  };
  return (
    <div>
      <select
        id="cars"
        value={selectedRace}
        onChange={(e) => setselectedRace(e.target.value)}
      >
        <option value="Greyhound racing">Greyhound racing</option>
        <option value="Harness racing">Harness racing</option>
        <option value="Horse racing">Horse racing</option>
        <option value="" selected>
          All
        </option>
      </select>
      <table>
        <tr>
          <th>Meeting Name</th>
          <th>Race Number</th>
          <th>Countdown</th>
        </tr>
        {selectedRace
          ? data3.map((val) => {
              return (
                <tr>
                  <td>{val.meeting_name}</td>
                  <td>{val.race_number}</td>
                  <td>
                    <Countdown date={Date.now() + 59500} />
                  </td>
                </tr>
              );
            })
          : data2.map((val) => {
              return (
                <tr>
                  <td>{val.meeting_name}</td>
                  <td>{val.race_number}</td>
                  <td>
                    <Countdown date={Date.now() + 59500} />
                  </td>
                </tr>
              );
            })}
      </table>
    </div>
  );
};

export default TableData;

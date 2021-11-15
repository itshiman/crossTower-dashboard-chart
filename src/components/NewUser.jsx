import React, { useState,useEffect } from "react";
import Chart from "react-apexcharts";
import NewUserDataPreProcess from "../utilities/NewUserDataPreProcess";

const NewUser = () => {
  const [state, setstate] = useState({
    // data: {},
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
    chartData: {},
  });

  const fetchData = () => {
    const token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew"
     fetch("https://api.crosstower.in/admin/user-list?pagination_type=page&page=1&limit=11000", {
      headers: {
        Authorization: 'Bearer ' + token
      }
     }).then(response => response.json())
       .then(result => {
         const chart = NewUserDataPreProcess(result)
    
         setstate({
           options: {
             ...state.options,
             xaxis: {
               categories: Object.keys(chart).reverse()
             }
           },
           series: [
             {
               name: "No Of Transactions",
               data: Object.values(chart).reverse()
             }
           ]
         }, () => {
           console.log(this.state.options)
         })
       })
  }

  useEffect(() => {
      fetchData();
  }, []);

  console.log(state);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height="500px"
            width="100%"
          />
        </div>
      </div>
    </div>
  );

};

export default NewUser;

import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import dataPreprocess from '../utilities/dataPreprocess';

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  fetchBuySellDataWeekly = () => {
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew';
    fetch(
      'https://api.crosstower.in/transaction/admin/orders/list?pagination_type=page&page=1&limit=11000',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          ...this.state,
          buySellData: true,
        });
        const chartData = dataPreprocess(result);
        var categories = Object.keys(chartData[0]).slice(0, 7).reverse();
        var buyData = Object.values(chartData[0]).slice(0, 7).reverse();
        var sellData = Object.values(chartData[1]).slice(0, 7).reverse();

        this.setState({
          ...this.state,
          series: [
            {
              name: 'Buy',
              data: buyData,
            },
            {
              name: 'Sell',
              data: sellData,
            },
          ],
          options: {
            ...this.state.options,
            ...{
              xaxis: {
                categories: categories,
              },
            },
          },
        });
      });
  };

  componentDidMount() {
    this.fetchBuySellDataWeekly();
  }

  render() {
    return (
      <div id='chart'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='bar'
          height={350}
        />
      </div>
    );
  }
}

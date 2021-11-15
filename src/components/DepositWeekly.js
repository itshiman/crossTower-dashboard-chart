import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import dataPreprocess from '../utilities/dataPreprocessDepositWithDraw';

class DepositChart extends Component {
  state = {
    data: false,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
        type: 'bar',
        height: 350,
        stacked: true,

        zoom: {
          enabled: true,
          type: 'y',
          autoScaleXaxis: true,
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4,
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1,
            },
          },
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
        },
      },
      stroke: {
        width: 1,
      },
      title: {
        text: 'Deposit Withdraw Data for a Week',
      },
      xaxis: {
        type: 'datetime',
        categories: [],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
    series: [
      {
        name: 'series-1',
        data: [],
      },
    ],
    chartData: {},
  };

  fetchBuySellDataMonthly = () => {
    var depositData = {};
    var withDrawData = {};
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew';
    fetch(
      'https://api.crosstower.in/transaction/admin/fiat/list?pagination_type=page&pageSize=50&limit=5000&transaction_type=DEPOSIT',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        depositData = result;
        fetch(
          'https://api.crosstower.in/transaction/admin/fiat/list?pagination_type=page=1&pageSize=50&limit=5000&transaction_type=WITHDRAW',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            withDrawData = result;
            this.setState({
              ...this.state,
              data: true,
            });

            const chartData = dataPreprocess(depositData, withDrawData);
            var categories = Object.keys(chartData[0]).slice(0, 7).reverse();
            var depositDataChart = Object.values(chartData[0])
              .slice(0, 7)
              .reverse();
            var withdrawDataChart = Object.values(chartData[1])
              .slice(0, 7)
              .reverse();

            this.setState({
              ...this.state,
              options: {
                ...this.state.options,
                xaxis: {
                  categories: categories,
                },
              },
              series: [
                {
                  name: 'Deposit',
                  data: depositDataChart,
                },
                {
                  name: 'withdraw',
                  data: withdrawDataChart,
                },
              ],
            });
          });
      });
  };

  componentDidMount() {
    this.fetchBuySellDataMonthly();
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          <div className='row'>
            <div className='mixed-chart' style={{ content: 'overflow' }}>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type='bar'
                toolbar={{ show: true }}
                height='600px'
              />
            </div>
          </div>
        ) : (
          <h3>Loading Deposit Withdraw Chart for a Week...</h3>
        )}
      </div>
    );
  }
}

export default DepositChart;

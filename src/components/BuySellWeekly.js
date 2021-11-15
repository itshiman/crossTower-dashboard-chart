import React, { Component } from 'react';
import dataPreprocess from '../utilities/dataPreprocess';
import ReactApexChart from 'react-apexcharts';

class BuySellWeeklyChart extends Component {
  state = {
    buySellData: false,
    series: [
      {
        name: 'buy',
        data: [],
      },
      {
        name: 'sell',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: [],
          },
        },
        zoom: {
          enabled: true,
          type: 'y',
          autoScaleXaxis: false,
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
        width: 2,
      },
      title: {
        text: 'Buy Sell Chart for week',
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

    chartData: {},
  };

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
      <div>
        {this.state.buySellData ? (
          <div className='row'>
            <div className='mixed-chart' style={{ content: 'overflow' }}>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type='bar'
                toolbar={{ show: true }}
                height='400px'
              />
            </div>
          </div>
        ) : (
          <h3>Loading Buy Sell Chart for a Week...</h3>
        )}
      </div>
    );
  }
}

export default BuySellWeeklyChart;

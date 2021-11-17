import React, { Component } from 'react';
import dataPreprocess from '../utilities/dataPreprocess';
import Chart from 'react-apexcharts';
import DropDownMenu from './DropDownMenu';

class BuySellMonthlyChart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }
  state = {
    dropdownOpen: false,
    dropdownItem: 'This Week',
    buySellData: false,
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
        width: 1,
      },
      title: {
        text: 'Buy Sell Chart for Month',
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

  toggle(e) {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  selectItem(item) {
    if (item != this.state.dropdownItem) {
      this.setState({
        ...this.state,
        dropdownItem: item,
      });
    }
  }

  fetchBuySellDataMonthly = () => {
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew';
    fetch(
      'https://api.crosstower.in/transaction/admin/orders/list?pagination_type=page&page=1&limit=1100',
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
        var categories = Object.keys(chartData[0]).slice(0, 30).reverse();
        var buyData = Object.values(chartData[0]).slice(0, 30).reverse();
        var sellData = Object.values(chartData[1]).slice(0, 30).reverse();

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
              name: 'Buy',
              data: buyData,
            },
            {
              name: 'Sell',
              data: sellData,
            },
          ],
        });
      });
  };

  componentDidMount() {
    this.fetchBuySellDataMonthly();
  }

  render() {
    return (
      <div>
        {this.state.buySellData ? (
          <>
            <DropDownMenu
              dropdownOpen={this.state.dropdownOpen}
              dropdownItem={this.state.dropdownItem}
              toggle={this.toggle}
              selectItem={this.selectItem}
            />
            <div className='row'>
              <div className='mixed-chart' style={{ content: 'overflow' }}>
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type='line'
                  toolbar={{ show: true }}
                  height='600px'
                />
              </div>
            </div>
          </>
        ) : (
          <h3>Loading Buy Sell Chart for a Month...</h3>
        )}
      </div>
    );
  }
}

export default BuySellMonthlyChart;

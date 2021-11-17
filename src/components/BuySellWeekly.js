import React, { Component } from 'react';
import dataPreprocess from '../utilities/dataPreprocess';
import ReactApexChart from 'react-apexcharts';
import DropDownMenu from './DropDownMenu';
import dateConverter from '../utilities/dateConverter';
import { Spinner } from 'reactstrap';

class BuySellWeeklyChart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownItem: 'This Week',
      buySellData: false,
      data: [],
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
          type: 'line',
          height: 350,

          dropShadow: {
            enabled: true,
            color: '#77B6EA',
            top: 0,
            left: 0,
            blur: 10,
            opacity: 0.2,
          },

          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: [],
            },
          },

          stroke: {
            curve: 'smooth',
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
        stroke: {
          width: 3,
        },
        title: {
          text: 'Buy Sell Chart for Last Week',
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
  }

  toggle(e) {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  selectItem(item) {
    if (item != this.state.dropdownItem) {
      this.setState(
        {
          ...this.state,
          dropdownItem: item,
        },
        () => {
          if (item === 'Last Week') {
            this.setData();
          } else {
            var period = dateConverter(item);
            this.setData(period);
          }
        }
      );
    }
  }

  setData(period) {
    if (this.state.data[0]) {
      const chartData = this.state.data;
      var start = '';
      var end = '';

      if (period) {
        const dateArr = Object.keys(chartData[0]);
        end =
          dateArr.indexOf(period[0]) != -1
            ? dateArr.indexOf(period[0]) + 1
            : dateArr.indexOf(dateArr[dateArr.length - 1]) + 1;
        start =
          dateArr.indexOf(period[1]) != -1
            ? dateArr.indexOf(period[1])
            : dateArr.indexOf(dateArr[0]);
      } else {
        start = 0;
        end = 7;
      }

      var categories = Object.keys(chartData[0]).slice(start, end).reverse();
      var buyData = Object.values(chartData[0]).slice(start, end).reverse();
      var sellData = Object.values(chartData[1]).slice(start, end).reverse();

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
            title: {
              text: `Buy Sell Chart for ${this.state.dropdownItem}`,
            },
            xaxis: {
              type: 'datetime',
              categories: categories,
            },
          },
        },
      });
    } else {
      this.setState(
        {
          ...this.state,
          buySellData: false,
        },
        () => {
          this.fetchBuySellDataWeekly('', period);
        }
      );
    }
  }

  fetchBuySellDataWeekly = (limit = '', period) => {
    var url = '';
    if (limit) {
      url = `https://api.crosstower.in/transaction/admin/orders/list?pagination_type=page&page=1&limit=${limit}`;
    } else {
      url = `https://api.crosstower.in/transaction/admin/orders/list?pagination_type=page&page=1&limit=`;
    }
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew';
    fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          ...this.state,
          buySellData: true,
        });
        if (limit) {
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
                title: {
                  text: `Buy Sell Chart for ${this.state.dropdownItem}`,
                },
                xaxis: {
                  type: 'datetime',
                  categories: categories,
                },
              },
            },
          });
        } else {
          const chartData = dataPreprocess(result);
          const dateArr = Object.keys(chartData[0]);
          var end =
            dateArr.indexOf(period[0]) != -1
              ? dateArr.indexOf(period[0]) + 1
              : dateArr.indexOf(dateArr[dateArr.length - 1]) + 1;
          var start =
            dateArr.indexOf(period[1]) != -1
              ? dateArr.indexOf(period[1])
              : dateArr.indexOf(dateArr[0]);

          var categories = Object.keys(chartData[0])
            .slice(start, end)
            .reverse();
          var buyData = Object.values(chartData[0]).slice(start, end).reverse();
          var sellData = Object.values(chartData[1])
            .slice(start, end)
            .reverse();

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
                title: {
                  text: `Buy Sell Chart for ${this.state.dropdownItem}`,
                },
                xaxis: {
                  type: 'datetime',
                  categories: categories,
                },
              },
            },
            data: chartData,
          });
        }
      });
  };

  componentDidMount() {
    this.fetchBuySellDataWeekly(11000);
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
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type='line'
                  toolbar={{ show: true }}
                  height='400px'
                />
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: '400px', padding: '120px' }}>
            <div className=' d-flex justify-content-center'>
              <Spinner animation='border' role='status' aria-hidden='true' />
            </div>
            <div className=' d-flex justify-content-center'>
              <span>
                Loading Buy Sell Chart for {this.state.dropdownItem}...
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BuySellWeeklyChart;

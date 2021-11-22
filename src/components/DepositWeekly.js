import React, { Component } from 'react';
import dataPreprocess from '../utilities/dataPreprocessDepositWithDraw';
import ReactApexChart from 'react-apexcharts';
import DropDownMenu from './DropDownMenu';
import dateConverter from '../utilities/dateConverter';
import { Button, Spinner } from 'reactstrap';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

class DepositChart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.showCalender = this.showCalender.bind(this);

    this.setRange = this.setRange.bind(this);

    this.state = {
      dropdownOpen: false,
      dropdownItem: 'Past 7 Days',
      buySellData: false,
      data: [],

      showCalender: false,
      ranges: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ],
      series: [
        {
          name: 'deposit',
          data: [],
        },
        {
          name: 'Withdraw',
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
          text: 'Deposit Withdraw Chart for Last 7 Days',
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
    if (item !== this.state.dropdownItem) {
      this.setState(
        {
          ...this.state,
          dropdownItem: item,
        },
        () => {
          if (item === 'Past 7 Days') {
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
        period[0] = new Date(period[0]);
        period[1] = new Date(period[1]);

        period[0] = period[0].toISOString().split('T')[0];
        period[1] = period[1].toISOString().split('T')[0];

        const dateArr = Object.keys(chartData[0]);

        if (
          dateArr.indexOf(period[0]) === -1 &&
          dateArr.indexOf(period[1]) === -1
        ) {
          end = -1;
          start = -1;
        } else {
          end =
            dateArr.indexOf(period[0]) !== -1
              ? dateArr.indexOf(period[0]) + 1
              : dateArr.indexOf(dateArr[dateArr.length - 1]) + 1;
          start =
            dateArr.indexOf(period[1]) !== -1
              ? dateArr.indexOf(period[1])
              : dateArr.indexOf(dateArr[0]);
        }
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
            name: 'Deposit',
            data: buyData,
          },
          {
            name: 'Withdraw',
            data: sellData,
          },
        ],
        options: {
          ...this.state.options,
          ...{
            title: {
              text: `Deposit Withdraw Chart for ${this.state.dropdownItem}`,
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
    var depositData = {};
    var withDrawData = {};
    var url = '';
    if (limit) {
      url = `https://api.crosstower.in/transaction/admin/fiat/list?pagination_type=page&pageSize=50&limit=&transaction_type=DEPOSIT,`;
    } else {
      url =
        'https://api.crosstower.in/transaction/admin/fiat/list?pagination_type=page&pageSize=50&limit=&transaction_type=DEPOSIT';
    }
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew';
    fetch(
      'https://api.crosstower.in/transaction/admin/fiat/list?pagination_type=page&pageSize=50&limit=&transaction_type=DEPOSIT',
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
          'https://api.crosstower.in/transaction/admin/fiat/list?pagination_type=page=1&pageSize=50&limit=&transaction_type=WITHDRAW',
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
              buySellData: true,
            });
            var categories;
            if (limit) {
              const chartData = dataPreprocess(depositData, withDrawData);
              categories = Object.keys(chartData[0]).slice(0, 7).reverse();
              var buyData = Object.values(chartData[0]).slice(0, 7).reverse();
              var sellData = Object.values(chartData[1]).slice(0, 7).reverse();

              this.setState({
                ...this.state,
                series: [
                  {
                    name: 'Deposit',
                    data: buyData,
                  },
                  {
                    name: 'Withdraw',
                    data: sellData,
                  },
                ],
                options: {
                  ...this.state.options,
                  ...{
                    title: {
                      text: `Deposit Withdraw Chart for ${this.state.dropdownItem}`,
                    },
                    xaxis: {
                      type: 'datetime',
                      categories: categories,
                    },
                  },
                },
              });
            } else {
              const chartData = dataPreprocess(depositData, withDrawData);
              const dateArr = Object.keys(chartData[0]);

              if (
                dateArr.indexOf(period[0]) === -1 &&
                dateArr.indexOf(period[1]) === -1
              ) {
                end = -1;
                start = -1;
              } else {
                var end =
                  dateArr.indexOf(period[0]) !== -1
                    ? dateArr.indexOf(period[0]) + 1
                    : dateArr.indexOf(dateArr[dateArr.length - 1]) + 1;
                var start =
                  dateArr.indexOf(period[1]) !== -1
                    ? dateArr.indexOf(period[1])
                    : dateArr.indexOf(dateArr[0]);
              }

              categories = Object.keys(chartData[0])
                .slice(start, end)
                .reverse();
              var buyData = Object.values(chartData[0])
                .slice(start, end)
                .reverse();
              var sellData = Object.values(chartData[1])
                .slice(start, end)
                .reverse();

              this.setState({
                ...this.state,
                series: [
                  {
                    name: 'Deposit',
                    data: buyData,
                  },
                  {
                    name: 'Withdraw',
                    data: sellData,
                  },
                ],
                options: {
                  ...this.state.options,
                  ...{
                    title: {
                      text: `Deposit Withdraw Chart for ${this.state.dropdownItem}`,
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
      });
  };

  handleSelect(item) {
    this.setState({
      ...this.state,
      ranges: [item.selection],
    });
  }

  showCalender() {
    this.setState({
      ...this.state,
      showCalender: !this.state.showCalender,
    });
  }

  setRange() {
    var period = [];
    period[0] = addDays(this.state.ranges[0].startDate, 1);
    period[1] = addDays(this.state.ranges[0].endDate, 1);
    console.log(period);
    this.setState(
      {
        ...this.state,
        showCalender: false,
        dropdownItem: 'Select Month',
      },
      () => {
        this.setData(period);
      }
    );
  }

  componentDidMount() {
    this.fetchBuySellDataWeekly(11000);
  }

  render() {
    return (
      <div>
        {this.state.buySellData ? (
          <>
            <div>
              {this.state.data[0] ? (
                this.state.showCalender ? (
                  <Button onClick={this.setRange}>Set Range</Button>
                ) : (
                  <Button onClick={this.showCalender}>Select Range</Button>
                )
              ) : (
                <></>
              )}

              <DropDownMenu
                dropdownOpen={this.state.dropdownOpen}
                dropdownItem={this.state.dropdownItem}
                toggle={this.toggle}
                selectItem={this.selectItem}
              />
              {this.state.showCalender ? (
                <div style={{ zIndex: '1', position: 'absolute' }}>
                  <DateRangePicker
                    onChange={(item) => this.handleSelect(item)}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    ranges={this.state.ranges}
                    direction='horizontal'
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

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
                Loading Deposit Withdraw Chart for {this.state.dropdownItem}...
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DepositChart;

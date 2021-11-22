// import React, { useState, useEffect } from 'react';
// import Chart from 'react-apexcharts';
// import NewUserDataPreProcess from '../utilities/NewUserDataPreProcess';

// const NewUser = () => {
//   const [state, setstate] = useState({
//     dropdownOpen: false,
//     dropdownItem: 'Past 7 Days',
//     buySellData: false,
//     data: [],

//     showCalender: false,
//     ranges: [
//       {
//         startDate: new Date(),
//         endDate: new Date(),
//         key: 'selection',
//       },
//     ],
//     series: [
//       {
//         name: 'buy',
//         data: [],
//       },
//       {
//         name: 'sell',
//         data: [],
//       },
//     ],
//     options: {
//       chart: {
//         type: 'line',
//         height: 350,

//         dropShadow: {
//           enabled: true,
//           color: '#77B6EA',
//           top: 0,
//           left: 0,
//           blur: 10,
//           opacity: 0.2,
//         },

//         toolbar: {
//           show: true,
//           offsetX: 0,
//           offsetY: 0,
//           tools: {
//             download: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//             reset: true | '<img src="/static/icons/reset.png" width="20">',
//             customIcons: [],
//           },
//         },

//         stroke: {
//           curve: 'smooth',
//         },
//         zoom: {
//           enabled: true,
//           type: 'y',
//           autoScaleXaxis: false,
//           zoomedArea: {
//             fill: {
//               color: '#90CAF9',
//               opacity: 0.4,
//             },
//             stroke: {
//               color: '#0D47A1',
//               opacity: 0.4,
//               width: 1,
//             },
//           },
//         },
//       },

//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             legend: {
//               position: 'bottom',
//               offsetX: -10,
//               offsetY: 0,
//             },
//           },
//         },
//       ],
//       stroke: {
//         width: 3,
//       },
//       title: {
//         text: 'Buy Sell Chart for Last 7 Days',
//       },
//       xaxis: {
//         type: 'datetime',
//         categories: [],
//       },
//       fill: {
//         opacity: 1,
//       },
//       legend: {
//         position: 'top',
//         horizontalAlign: 'left',
//         offsetX: 40,
//       },
//     },

//     chartData: {},
//   });

//   const toggle = (e) => {
//     setState({
//       ...state,
//       dropdownOpen: !state.dropdownOpen,
//     });
//   };

//   const selectItem = (item) => {
//     if (item !== state.dropdownItem) {
//       setState(
//         {
//           ...state,
//           dropdownItem: item,
//         },
//         () => {
//           if (item === 'Past 7 Days') {
//             this.setData();
//           } else {
//             var period = dateConverter(item);
//             this.setData(period);
//           }
//         }
//       );
//     }
//   };

//   const fetchData = () => {
//     const token =
//       'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdG8rcmVwb3J0QGNyb3NzdG93ZXIuaW4iLCJBdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTYzMzk3NzUxNywiZXhwIjoxNzYwMjE5OTgxfQ.WpF1uV7dBHQRdz0z2B5i60-4zwWuX7Ezo7H-tcR3wIl7A8czZv0sm3aubpX3PIuFzb3w5Opc75x0FKI9jL0Gew';
//     fetch(
//       'https://api.crosstower.in/admin/user-list?pagination_type=page&page=1&limit=11000',
//       {
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         const chart = NewUserDataPreProcess(result);

//         setstate(
//           {
//             options: {
//               ...state.options,
//               xaxis: {
//                 categories: Object.keys(chart).reverse(),
//               },
//             },
//             series: [
//               {
//                 name: 'No Of Transactions',
//                 data: Object.values(chart).reverse(),
//               },
//             ],
//           },
//           () => {
//             console.log(this.state.options);
//           }
//         );
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log(state);

//   return (
//     <div className='app'>
//       <div className='row'>
//         <div className='mixed-chart'>
//           <Chart
//             options={state.options}
//             series={state.series}
//             type='bar'
//             height='500px'
//             width='100%'
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewUser;

const split = (date) => {
  return date.split('T')[0];
};

const dataPreprocess = (depositData, withdrawData) => {
  if (depositData.data && withdrawData.data) {
    var depositDataArr = depositData.data.data;
    var withdrawDataArr = withdrawData.data.data;
    // console.log(depositDataArr);
    // console.log(withdrawDataArr);
    var res = [{}, {}];
    depositDataArr.forEach((item) => {
      var key = '';
      key = split(item.transaction_time);
      res[0][key] ? (res[0][key] = res[0][key] + 1) : (res[0][key] = 1);
      res[1][key] ? (res[1][key] = res[1][key]) : (res[1][key] = 0);
    });

    withdrawDataArr.forEach((item) => {
      var key = '';
      key = split(item.transaction_time);
      res[1][key] ? (res[1][key] = res[1][key] + 1) : (res[1][key] = 1);
      res[0][key] ? (res[0][key] = res[0][key]) : (res[0][key] = 0);
    });

    return res;
  } else {
    return [];
  }
};

export default dataPreprocess;

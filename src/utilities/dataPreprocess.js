const split = (date) => {
  return date.split('T')[0];
};

const dataPreprocess = (data) => {
  if (data.data) {
    var dataArr = data.data.data;
    var res = [{}, {}];

    dataArr.forEach((item) => {
      var key = '';
      key = split(item.order_time);
      res[0][key] ? (res[0][key] = res[0][key]) : (res[0][key] = 0);
      res[1][key] ? (res[1][key] = res[1][key]) : (res[1][key] = 0);

      if (item.side === 'buy') {
        key = split(item.order_time);
        res[0][key] ? (res[0][key] = res[0][key] + 1) : (res[0][key] = 1);
      } else {
        key = split(item.order_time);
        res[1][key] ? (res[1][key] = res[1][key] + 1) : (res[1][key] = 1);
      }
    });

    return res;
  } else {
    return [];
  }
};

export default dataPreprocess;

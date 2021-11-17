const split = (date) => {
  return date.split('T')[0];
};

const dataPreprocess = (data) => {
  if (data.data) {
    var dataArr = data.data.data;
    var tempRes = [{}, {}];

    dataArr.forEach((item) => {
      var key = '';
      if (item.side === 'buy') {
        key = split(item.order_time);
        tempRes[0][key]
          ? (tempRes[0][key] = tempRes[0][key] + 1)
          : (tempRes[0][key] = 1);
      } else {
        key = split(item.order_time);
        tempRes[1][key]
          ? (tempRes[1][key] = tempRes[1][key] + 1)
          : (tempRes[1][key] = 1);
      }
    });

    var res = [[], []];
    var i = 0;
    tempRes.forEach((item) => {
      var j = 0;
      for (const property in item) {
        console.log(item[property]);
        res[i][j] = [property, item[property]];
        j++;
      }
      i++;
    });
    console.log(res);
    return res;
  } else {
    return [];
  }
};

export default dataPreprocess;

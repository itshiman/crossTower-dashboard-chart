const split = (date) => {
  return date.split('T')[0];
};

const DataPreprocessNewUsers = (data) => {
  if (data.data) {
    var dataArr = data.data.data;
    var res = [{}, {}];

    dataArr.forEach((item) => {
      var key = '';
      key = split(item.registeredDate);
      res[0][key] ? (res[0][key] = res[0][key]) : (res[0][key] = 0);
      res[1][key] ? (res[1][key] = res[1][key]) : (res[1][key] = 0);
      if (item.kycStatus === 'APPROVED') {
        key = split(item.registeredDate);
        res[0][key] ? (res[0][key] = res[0][key] + 1) : (res[0][key] = 1);
      } else if (item.kycStatus === 'LIMITED_KYC') {
        key = split(item.registeredDate);
        res[1][key] ? (res[1][key] = res[1][key] + 1) : (res[1][key] = 1);
      }
    });
    return res;
  } else {
    return [];
  }
};

export default DataPreprocessNewUsers;

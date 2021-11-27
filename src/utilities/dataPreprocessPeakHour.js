const split = (date) => {
  return date.split('T')[0];
};

const getHour = (date) => {
  return date.split(':')[0];
};

const DataPreprocessNewUsers = (data) => {
  if (data.data) {
    var dataArr = data.data.data;
    var res = [{}, {}];

    dataArr.forEach((item) => {
      var date = split(item.registeredDate);
      var hour = getHour(item.registeredDate) + ':00:00.00';

      if (res[0][date]) {
        res[0][date][hour]
          ? (res[0][date][hour] = res[0][date][hour])
          : (res[0][date][hour] = 0);
      } else {
        res[0][date] = [];
      }

      if (res[1][date]) {
        res[1][date][hour]
          ? (res[1][date][hour] = res[1][date][hour])
          : (res[1][date][hour] = 0);
      } else {
        res[1][date] = [];
      }

      if (item.kycStatus === 'APPROVED') {
        res[0][date][hour] = res[0][date][hour] + 1;
      } else if (item.kycStatus === 'LIMITED_KYC') {
        res[1][date][hour] = res[1][date][hour] + 1;
      }
    });
    return res;
  } else {
    return [];
  }
};

export default DataPreprocessNewUsers;

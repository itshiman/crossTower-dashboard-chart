const split = (date) => {
    return date.split('T')[0];
  };
  
  const NewUserDataPreProcess = (data) => {
    if (data.data) {
      var dataArr = data.data.data;
      var res = {};
      dataArr.forEach((item) => {
        var key = split(item.registeredDate);
        res[key] ? (res[key] = res[key] + 1) : (res[key] = 1);
      });
  
      return res;
    } else {
      console.log(false);
    }
  };
  
  export default NewUserDataPreProcess;
  
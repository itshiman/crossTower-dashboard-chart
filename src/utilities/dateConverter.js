const dateConverter = (month) => {
  switch (month) {
    case 'January':
      return ['2021-01-01', '2021-01-31'];
    case 'February':
      return ['2021-02-01', '2021-2-28'];
    case 'March':
      return ['2021-03-01', '2021-03-30'];
    case 'April':
      return ['2021-04-01', '2021-04-30'];
    case 'May':
      return ['2021-05-01', '2021-05-30'];
    case 'June':
      return ['2021-06-01', '2021-06-30'];
    case 'July':
      return ['2021-07-01', '2021-07-30'];
    case 'August':
      return ['2021-08-01', '2021-08-30'];
    case 'September':
      return ['2021-09-01', '2021-09-30'];
    case 'October':
      return ['2021-10-01', '2021-10-30'];
    case 'November':
      return ['2021-11-01', '2021-11-30'];
    case 'December':
      return ['2021-12-01', '2021-12-30'];
    default:
      return;
  }
};

export default dateConverter;

const shortMonthName = (month) => {
  const shortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return shortNames[month];
};
export default (value) => {
  if (value) {
    const date = new Date(value);
    const isDate = date instanceof Date;
    if (!date || !isDate) {
      return '';
    }
    const year = date.getFullYear();
    const month = shortMonthName(date.getMonth());
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  }
  return '';
};

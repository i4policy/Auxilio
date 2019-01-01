export default (value) => {
  if (value) {
    return value > 999 ? `${(value / 1000).toFixed(1)}k` : value;
  }
  return 0;
};
